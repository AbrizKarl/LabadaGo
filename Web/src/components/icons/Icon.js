import React from "react";

/**
 * Small hand-authored icon set. Every icon shares the same 24px grid,
 * 1.75 stroke weight, and round joins so the whole app reads as one
 * consistent system instead of mixed emoji/glyphs.
 */
const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function Icon({ children, size, ...rest }) {
  return (
    <svg {...base} width={size || base.width} height={size || base.height} aria-hidden="true" {...rest}>
      {children}
    </svg>
  );
}

export function EyeIcon(props) {
  return (
    <Icon {...props}>
      <path d="M2.5 12s3.4-6.5 9.5-6.5S21.5 12 21.5 12s-3.4 6.5-9.5 6.5S2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.75" />
    </Icon>
  );
}

export function EyeOffIcon(props) {
  return (
    <Icon {...props}>
      <path d="M2.5 12s3.4-6.5 9.5-6.5S21.5 12 21.5 12s-3.4 6.5-9.5 6.5S2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.75" />
      <line x1="3.5" y1="20.5" x2="20.5" y2="3.5" />
    </Icon>
  );
}

export function CheckCircleIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.2 11 14.7l4.5-5.4" />
    </Icon>
  );
}

export function AlertCircleIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="7.5" x2="12" y2="13" />
      <circle cx="12" cy="16.3" r="0.15" fill="currentColor" stroke="none" />
      <line x1="12" y1="16" x2="12" y2="16.3" />
    </Icon>
  );
}

export function GridIcon(props) {
  return (
    <Icon {...props}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.2" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.2" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.2" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.2" />
    </Icon>
  );
}

export function PackageIcon(props) {
  return (
    <Icon {...props}>
      <path d="M3.5 8.2 12 3.5l8.5 4.7v8.6L12 21.5l-8.5-4.7Z" />
      <path d="M3.5 8.2 12 12.9l8.5-4.7" />
      <line x1="12" y1="12.9" x2="12" y2="21.5" />
    </Icon>
  );
}

export function UsersIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M3.3 19c0-3 2.6-5.2 5.7-5.2s5.7 2.2 5.7 5.2" />
      <path d="M16 8.6a2.9 2.9 0 1 1 0 5.8" />
      <path d="M15.5 13.9c2.6.3 4.5 2.3 4.5 5" />
    </Icon>
  );
}

export function SettingsIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="2.9" />
      <path d="M12 3.5v2.3M12 18.2v2.3M4.9 6.9l1.9 1.4M17.2 15.7l1.9 1.4M3.5 12h2.3M18.2 12h2.3M4.9 17.1l1.9-1.4M17.2 8.3l1.9-1.4" />
    </Icon>
  );
}

export function LogOutIcon(props) {
  return (
    <Icon {...props}>
      <path d="M9 20.5H5.8A1.8 1.8 0 0 1 4 18.7V5.3A1.8 1.8 0 0 1 5.8 3.5H9" />
      <path d="M15.5 16.5 20 12l-4.5-4.5" />
      <line x1="20" y1="12" x2="9" y2="12" />
    </Icon>
  );
}

export function ChevronDownIcon(props) {
  return (
    <Icon {...props}>
      <path d="M5.5 8.5 12 15l6.5-6.5" />
    </Icon>
  );
}

export function MenuIcon(props) {
  return (
    <Icon {...props}>
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </Icon>
  );
}

export function XIcon(props) {
  return (
    <Icon {...props}>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </Icon>
  );
}

export function InboxIcon(props) {
  return (
    <Icon {...props}>
      <path d="M3.5 13 6 5.5h12L20.5 13" />
      <path d="M3.5 13v5.7c0 1 .8 1.8 1.8 1.8h13.4c1 0 1.8-.8 1.8-1.8V13" />
      <path d="M3.5 13h5l1 2.3h5l1-2.3h5" />
    </Icon>
  );
}

export function MailIcon(props) {
  return (
    <Icon {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.8" />
      <path d="M4.2 6.5 12 12.7l7.8-6.2" />
    </Icon>
  );
}

export function LockIcon(props) {
  return (
    <Icon {...props}>
      <rect x="5" y="11" width="14" height="9.5" rx="1.8" />
      <path d="M7.5 11V8a4.5 4.5 0 0 1 9 0v3" />
    </Icon>
  );
}

export function UserIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="8.3" r="3.4" />
      <path d="M4.8 19.5c0-3.4 3.2-6 7.2-6s7.2 2.6 7.2 6" />
    </Icon>
  );
}

export function SearchIcon(props) {
  return (
    <Icon {...props}>
      <circle cx="10.8" cy="10.8" r="6.8" />
      <line x1="20.5" y1="20.5" x2="15.7" y2="15.7" />
    </Icon>
  );
}

export function ChevronRightIcon(props) {
  return (
    <Icon {...props}>
      <path d="M8.5 5.5 15 12l-6.5 6.5" />
    </Icon>
  );
}

export function PanelLeftIcon(props) {
  return (
    <Icon {...props}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="1.8" />
      <line x1="9.3" y1="4.5" x2="9.3" y2="19.5" />
    </Icon>
  );
}

export function ClipboardCheckIcon(props) {
  return (
    <Icon {...props}>
      <rect x="5" y="4.5" width="14" height="16" rx="1.8" />
      <path d="M9 4.5h6a.7.7 0 0 1 .7.7v1.6a.7.7 0 0 1-.7.7H9a.7.7 0 0 1-.7-.7V5.2a.7.7 0 0 1 .7-.7Z" />
      <path d="M9 13.3l2 2 4-4.3" />
    </Icon>
  );
}

export function WalletIcon(props) {
  return (
    <Icon {...props}>
      <path d="M4 7.3A1.8 1.8 0 0 1 5.8 5.5h12.4A1.8 1.8 0 0 1 20 7.3v9.4a1.8 1.8 0 0 1-1.8 1.8H5.8A1.8 1.8 0 0 1 4 16.7Z" />
      <path d="M15 12.2a1.5 1.5 0 1 0 0-3h4.5v3Z" />
    </Icon>
  );
}
