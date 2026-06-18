type Props = { status: "draft" | "published" };

export default function BlogStatusBadge({ status }: Props) {
  const isPublished = status === "published";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold border ${
        isPublished
          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
          : "bg-ink-50 text-ink-600 border-ink-200"
      }`}
    >
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full ${isPublished ? "bg-emerald-500" : "bg-ink-400"}`}
      />
      {isPublished ? "Published" : "Draft"}
    </span>
  );
}
