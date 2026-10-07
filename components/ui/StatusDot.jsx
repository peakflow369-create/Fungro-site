export default function StatusDot({ className = '' }) {
  return (
    <span className={`relative inline-flex h-2 w-2 ${className}`} aria-hidden>
      <span className="absolute inset-0 animate-ping-soft rounded-full bg-mint" />
      <span className="relative h-2 w-2 rounded-full bg-mint" />
    </span>
  );
}
