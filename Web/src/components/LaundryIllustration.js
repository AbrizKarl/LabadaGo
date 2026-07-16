import React from "react";

/**
 * Original flat illustration for the dashboard hero banner — a washing
 * machine, a basket of folded clothes, and a few soap bubbles. Built from
 * plain shapes using only colors that already exist in tokens.css, not
 * copied or adapted from any existing artwork.
 */
function LaundryIllustration({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* floor shadow */}
      <ellipse cx="190" cy="178" rx="110" ry="12" style={{ fill: "var(--brand-100)" }} />

      {/* washing machine body */}
      <rect
        x="140"
        y="40"
        width="120"
        height="130"
        rx="14"
        style={{ fill: "var(--white)" }}
        stroke="var(--brand-100)"
        strokeWidth="2"
      />
      <rect x="140" y="40" width="120" height="28" rx="14" style={{ fill: "var(--brand-600)" }} />
      <circle cx="156" cy="54" r="4" style={{ fill: "var(--brand-100)" }} />
      <circle cx="172" cy="54" r="4" style={{ fill: "var(--brand-100)" }} />

      {/* drum */}
      <circle cx="200" cy="115" r="42" style={{ fill: "var(--brand-50)" }} stroke="var(--brand-500)" strokeWidth="3" />
      <circle cx="200" cy="115" r="30" style={{ fill: "var(--white)" }} stroke="var(--brand-100)" strokeWidth="2" />
      <path
        d="M182 108c4 10 12 16 18 16s14-6 18-16"
        stroke="var(--brand-500)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="188" cy="104" r="5" style={{ fill: "var(--warning-600)" }} />

      {/* control dial */}
      <circle cx="244" cy="80" r="7" style={{ fill: "var(--brand-100)" }} stroke="var(--brand-500)" strokeWidth="2" />

      {/* basket */}
      <path
        d="M46 150l8 34h56l8-34Z"
        style={{ fill: "var(--warning-50)" }}
        stroke="var(--warning-600)"
        strokeWidth="2"
      />
      <path d="M42 150h80" stroke="var(--warning-600)" strokeWidth="2" />
      <path d="M52 150v-8M72 150v-10M92 150v-8M112 150v-10" stroke="var(--warning-600)" strokeWidth="2" />

      {/* folded clothes in basket */}
      <rect x="50" y="126" width="30" height="16" rx="3" style={{ fill: "var(--brand-500)" }} />
      <rect x="78" y="120" width="28" height="20" rx="3" style={{ fill: "var(--success-600)" }} />

      {/* bubbles */}
      <circle cx="120" cy="60" r="5" style={{ fill: "var(--brand-100)" }} />
      <circle cx="132" cy="44" r="3" style={{ fill: "var(--brand-100)" }} />
      <circle cx="106" cy="40" r="3.5" style={{ fill: "var(--brand-100)" }} />
    </svg>
  );
}

export default LaundryIllustration;
