"use client";

import { useMemo, useState } from "react";
import type { BlogIndexEntry } from "@/lib/blog";
import BlogCard from "./BlogCard";

const POSTS_PER_PAGE = 12;

export default function BlogIndex({
  posts,
  region = "global",
}: {
  posts: BlogIndexEntry[];
  region?: "global" | "us";
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [page, setPage] = useState(1);

  const categories = useMemo(() => {
    const categorySet = new Set<string>();

    posts.forEach((post) => {
      if (post.category) {
        categorySet.add(post.category);
      }
    });

    return ["All", ...Array.from(categorySet).sort((a, b) => a.localeCompare(b))];
  }, [posts]);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts.filter((post) => {
      if (category !== "All" && post.category !== category) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const searchableText = [
        post.title,
        post.description,
        post.category,
        post.state,
        post.slug,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [posts, query, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filtered.slice(start, start + POSTS_PER_PAGE);
  }, [filtered, currentPage]);

  function changeCategory(nextCategory: string) {
    setCategory(nextCategory);
    setPage(1);
  }

  function changeQuery(nextQuery: string) {
    setQuery(nextQuery);
    setPage(1);
  }

  function resetFilters() {
    setQuery("");
    setCategory("All");
    setPage(1);
  }

  return (
    <div>
      <div className="card p-4 md:p-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="relative">
            <label htmlFor="blog-search" className="sr-only">
              Search articles
            </label>

            <input
              id="blog-search"
              className="input !h-12 rounded-full px-5 pl-12 text-sm font-semibold"
              placeholder="Search by state, topic, filing, tax, or keyword..."
              value={query}
              onChange={(event) => changeQuery(event.target.value)}
              type="search"
            />

            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
            </svg>
          </div>

          <div className="text-sm font-semibold text-ink-500">
            Showing{" "}
            <span className="font-extrabold text-ink-950">
              {filtered.length}
            </span>{" "}
            of{" "}
            <span className="font-extrabold text-ink-950">
              {posts.length}
            </span>{" "}
            articles
          </div>
        </div>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          {categories.map((item) => {
            const active = category === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => changeCategory(item)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition ${
                  active
                    ? "border-crimson-700 bg-crimson-700 text-white shadow-soft"
                    : "border-ink-200 bg-white text-ink-600 hover:border-crimson-300 hover:text-crimson-700"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card mt-10 p-8 text-center">
          <h3 className="text-xl font-bold text-ink-950">
            No articles found.
          </h3>

          <p className="mt-2 text-sm leading-6 text-ink-600">
            Try another keyword or select a different category.
          </p>

          <button
            type="button"
            onClick={resetFilters}
            className="btn btn-ghost mt-5 h-11 rounded-full px-5 text-sm"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {paginatedPosts.map((post) => (
              <BlogCard key={post.slug} post={post} region={region} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <nav
      className="card mt-12 flex flex-col items-center justify-between gap-4 p-4 sm:flex-row"
      aria-label="Blog pagination"
    >
      <p className="text-sm font-semibold text-ink-500">
        Page{" "}
        <span className="font-extrabold text-ink-950">{currentPage}</span> of{" "}
        <span className="font-extrabold text-ink-950">{totalPages}</span>
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="btn btn-ghost h-10 rounded-full px-4 text-sm disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        {pages.map((item, index) =>
          item === "..." ? (
            <span
              key={`${item}-${index}`}
              className="inline-flex h-10 w-10 items-center justify-center text-sm font-extrabold text-ink-400"
            >
              ...
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              aria-current={currentPage === item ? "page" : undefined}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border text-sm font-extrabold transition ${
                currentPage === item
                  ? "border-crimson-700 bg-crimson-700 text-white shadow-soft"
                  : "border-ink-200 bg-white text-ink-600 hover:border-crimson-300 hover:text-crimson-700"
              }`}
            >
              {item}
            </button>
          )
        )}

        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="btn btn-ghost h-10 rounded-full px-4 text-sm disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </nav>
  );
}

function getVisiblePages(
  currentPage: number,
  totalPages: number
): Array<number | "..."> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
}
