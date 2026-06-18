export default function TrustBar() {
  const items = [
    "Trusted by 5,000+ founders",
    "All 50 states + DC",
    "EIN included",
    "Money-back guarantee",
  ];

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-500">
      {items.map((t, i) => (
        <span key={t} className="inline-flex items-center gap-2">
          {i > 0 && <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-ink-300" aria-hidden />}
          <CheckIcon />
          <span className="font-medium text-ink-700">{t}</span>
        </span>
      ))}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-crimson-600"
      aria-hidden
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
