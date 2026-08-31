"use client";

export function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: -1 }}
    >
      <div className="iirc-blob iirc-blob-1" />
      <div className="iirc-blob iirc-blob-2" />
      <div className="iirc-blob iirc-blob-3" />
      <div className="iirc-blob iirc-blob-4" />
    </div>
  );
}
