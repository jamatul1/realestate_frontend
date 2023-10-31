import React from "react";

export default function MenuIcon({ width = 40, height = 40 }) {
  return (
    <svg viewBox="0 0 40 40" width={width} height={height}>
      <rect width="100" height="10" rx="10"></rect>
      <rect y="30" width="100" height="10" rx="10"></rect>
      <rect y="60" width="100" height="10" rx="10"></rect>
    </svg>
  );
}
