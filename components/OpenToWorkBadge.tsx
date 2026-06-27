export default function OpenToWorkBadge() {
  return (
    <div
      className="inline-flex items-center rounded-full border border-[#e75e50]/40 bg-[rgba(191,24,24,0.15)] px-4 py-1 text-sm font-medium text-[#f97869] shadow-md backdrop-blur-[8px]"
      aria-label="Open to work"
    >
      <span
        className="open-to-work-dot relative mr-2 h-2 w-2 rounded-full bg-[#e75e50]"
        aria-hidden="true"
      />
      Open to Work
    </div>
  );
}
