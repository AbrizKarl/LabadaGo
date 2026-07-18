import React from "react";
import styles from "./Skeleton.module.css";

/**
 * Shimmer placeholder shown only while real data is loading. This is not
 * fake content — it deliberately looks like *loading*, never like data,
 * which keeps it inside the "no fabricated functionality" rule.
 *
 * Note on the style attribute below: width/height are *data* (per-usage
 * dimensions), not styling decisions — all actual styling (color, shimmer
 * animation) lives in Skeleton.module.css. This is the one sanctioned
 * exception to the no-inline-styles rule, same as an SVG's size prop.
 */
function Skeleton({ width = "100%", height = 12, radius = "var(--radius-sm)", className = "" }) {
  return (
    <span
      className={[styles.skeleton, className].filter(Boolean).join(" ")}
      style={{ width, height, borderRadius: radius }}
      aria-hidden="true"
    />
  );
}

export default Skeleton;
