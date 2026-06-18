"use client";

import { useMemo, useState } from "react";

export default function ShareLinks({
  slug,
  title,
  region = "global",
  compact = false,
}: {
  slug: string;
  title: string;
  region?: "global" | "us";
  compact?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const path = `${region === "us" ? "/us" : ""}/blogs/${slug}`;

  const url = useMemo(() => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}${path}`;
    }

    return `https://formllc.us${path}`;
  }, [path]);

  const links = [
    {
      label: "Twitter",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`,
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.27zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zm1.78 13.02h-3.55V9h3.55v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.27h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
        </svg>
      ),
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={`flex flex-wrap items-center ${compact ? "gap-2" : "gap-2.5"}`}>
      {!compact && (
        <span className="mr-1 text-xs font-extrabold uppercase tracking-[0.18em] text-ink-500">
          Share
        </span>
      )}

      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${link.label}`}
          className={`inline-flex items-center justify-center rounded-full border border-ink-200 bg-white text-ink-500 shadow-soft transition hover:-translate-y-0.5 hover:border-crimson-300 hover:text-crimson-700 ${
            compact ? "h-9 w-9" : "h-10 w-10"
          }`}
        >
          {link.icon}
        </a>
      ))}

      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy link"
        className={`inline-flex items-center justify-center rounded-full border border-ink-200 bg-white text-xs font-bold text-ink-500 shadow-soft transition hover:-translate-y-0.5 hover:border-crimson-300 hover:text-crimson-700 ${
          compact ? "h-9 px-3" : "h-10 px-4"
        }`}
      >
        {copied ? "Copied!" : compact ? "Copy" : "Copy link"}
      </button>
    </div>
  );
}
