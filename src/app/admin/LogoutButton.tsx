"use client";

export default function LogoutButton() {
  return (
    <button
      type="button"
      className="text-sm font-semibold text-ink-500 hover:text-rose-700"
      onClick={async () => {
        await fetch("/api/admin/login", { method: "DELETE" });
        window.location.href = "/admin/blogs";
      }}
    >
      Sign out
    </button>
  );
}
