"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import BlogStatusBadge from "./BlogStatusBadge";

type Row = {
  id: number;
  title: string;
  slug: string;
  region: "global" | "us" | "both";
  status: "draft" | "published";
  seo_score: number | null;
  updated_at: string | Date;
  published_at?: string | Date | null;
  category: string | null;
};

type ListResponse = { data: Row[] };

export default function BlogListClient({ initial }: { initial: Row[] }) {
  const [rows, setRows] = useState<Row[]>(initial);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"all" | "draft" | "published">("all");
  const [region, setRegion] = useState<"all" | "global" | "us" | "both">("all");
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importMsg, setImportMsg] = useState<string | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (status !== "all") params.set("status", status);
    if (region !== "all") params.set("region", region);
    setLoading(true);
    fetch(`/api/admin/blogs?${params.toString()}`, { signal: ctrl.signal })
      .then((r) => (r.ok ? (r.json() as Promise<ListResponse>) : Promise.reject(r)))
      .then((d) => setRows(d.data))
      .catch((err) => {
        if ((err as { name?: string })?.name !== "AbortError") {
          console.error(err);
        }
      })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, [q, status, region]);

  async function runImport() {
    if (!window.confirm("Import all JSON blogs into the database? Existing rows are kept; pass overwrite=true to replace.")) return;
    setImporting(true);
    setImportMsg(null);
    try {
      const res = await fetch("/api/admin/blogs/import-json", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ overwrite: false, publish: true }),
      });
      const data = await res.json();
      if (!res.ok) {
        setImportMsg(data?.error ?? "Import failed");
      } else {
        const s = data.summary;
        setImportMsg(`Imported ${s.created} new, updated ${s.updated}, skipped ${s.skipped} of ${s.total}.`);
        // refresh list
        const refresh = await fetch("/api/admin/blogs");
        if (refresh.ok) setRows(((await refresh.json()) as ListResponse).data);
      }
    } finally {
      setImporting(false);
    }
  }

  const visible = useMemo(() => rows, [rows]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-ink-900 tracking-tight">Blogs</h1>
          <p className="text-sm text-ink-600 mt-1">{visible.length} entries</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={runImport}
            disabled={importing}
            className="btn-secondary btn-md"
          >
            {importing ? "Importing…" : "Import JSON blogs"}
          </button>
          <Link href="/admin/blogs/new" className="btn-primary btn-md">
            New blog
          </Link>
        </div>
      </div>

      {importMsg && (
        <div className="rounded-2xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-700">
          {importMsg}
        </div>
      )}

      <div className="card p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-3">
        <input
          type="search"
          placeholder="Search by title or slug…"
          className="input flex-1"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="select w-full md:w-44"
          value={status}
          onChange={(e) => setStatus(e.target.value as typeof status)}
        >
          <option value="all">All statuses</option>
          <option value="draft">Drafts</option>
          <option value="published">Published</option>
        </select>
        <select
          className="select w-full md:w-44"
          value={region}
          onChange={(e) => setRegion(e.target.value as typeof region)}
        >
          <option value="all">All regions</option>
          <option value="global">Global</option>
          <option value="us">U.S.</option>
          <option value="both">Both</option>
        </select>
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-cream-50 text-left">
              <tr className="text-xs font-semibold uppercase tracking-wider text-ink-500">
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Slug</th>
                <th className="px-5 py-3">Region</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">SEO</th>
                <th className="px-5 py-3">Updated</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-ink-500">
                    {loading ? "Loading…" : "No blogs match your filters."}
                  </td>
                </tr>
              ) : (
                visible.map((row) => (
                  <tr key={row.id} className="border-t border-ink-100">
                    <td className="px-5 py-3">
                      <Link href={`/admin/blogs/${row.id}/edit`} className="font-semibold text-ink-900 hover:text-crimson-700">
                        {row.title}
                      </Link>
                      {row.category && (
                        <span className="ml-2 text-xs text-ink-500">{row.category}</span>
                      )}
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-ink-600">{row.slug}</td>
                    <td className="px-5 py-3 capitalize text-ink-700">{row.region}</td>
                    <td className="px-5 py-3">
                      <BlogStatusBadge status={row.status} />
                    </td>
                    <td className="px-5 py-3">
                      {row.seo_score == null ? (
                        <span className="text-ink-400">—</span>
                      ) : (
                        <span
                          className={`font-bold ${
                            row.seo_score >= 85
                              ? "text-emerald-700"
                              : row.seo_score >= 65
                                ? "text-amber-700"
                                : "text-rose-700"
                          }`}
                        >
                          {row.seo_score}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-ink-600">
                      {new Date(row.updated_at).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Link
                        href={`/admin/blogs/${row.id}/edit`}
                        className="text-xs font-semibold text-crimson-700 hover:text-crimson-600 mr-3"
                      >
                        Edit
                      </Link>
                      <a
                        href={`/blogs/${row.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-ink-500 hover:text-ink-800"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
