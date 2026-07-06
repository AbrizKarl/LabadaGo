import React from "react";

/**
 * Minimal monogram mark: a rounded-square tile with an abstract fold/wave
 * motif (two offset arcs, evoking fabric without being a literal
 * illustration). Reads as a brand tile, not a mascot.
 */
function Logo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
      <rect width="28" height="28" rx="7" fill="var(--brand-600, #3a4eb0)" />
      <path
        d="M7 17c1.6 1.4 3.2 1.4 4.8 0s3.2-1.4 4.8 0 3.2 1.4 4.8 0"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M7 12.4c1.6 1.4 3.2 1.4 4.8 0s3.2-1.4 4.8 0 3.2 1.4 4.8 0"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
    </svg>
  );
}

export default Logo;
