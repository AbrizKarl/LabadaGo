import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Badge from "../components/ui/Badge";
import {
  GridIcon,
  PackageIcon,
  UsersIcon,
  SettingsIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
} from "../components/icons/Icon";
import styles from "./AppShell.module.css";

function getInitials(name) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  return parts.slice(0, 2).map((p) => p[0]?.toUpperCase() || "").join("") || "?";
}

/**
 * Persistent sidebar + topbar shell for every authenticated screen.
 *
 * This is deliberately built to scale: nav items for pages that don't
 * exist yet (Orders, Customers, Settings) are shown disabled with a
 * "Soon" badge instead of being omitted or linking to a dead route —
 * that keeps the information architecture visible from day one instead
 * of requiring a nav redesign every time a new page ships.
 */
function AppShell({ pageTitle, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <div className={styles.shell}>
      <div
        className={`${styles.backdrop} ${mobileOpen ? styles.backdropOpen : ""}`}
        onClick={closeMobile}
      />

      <aside className={`${styles.sidebar} ${mobileOpen ? styles.sidebarOpen : ""}`}>
        <Link to="/dashboard" className={styles.sidebarBrand} onClick={closeMobile}>
          <Logo size={26} />
          <span className={styles.sidebarBrandName}>LabadaGo</span>
        </Link>

        <nav className={styles.navSection} aria-label="Primary">
          <div className={styles.navLabel}>Workspace</div>
          <Link to="/dashboard" className={`${styles.navLink} ${styles.navLinkActive}`}>
            <GridIcon size={17} />
            Dashboard
          </Link>
          <span className={styles.navLink} aria-disabled="true" style={{ opacity: 0.5, cursor: "default" }}>
            <PackageIcon size={17} />
            <span style={{ flex: 1 }}>Orders</span>
            <Badge variant="neutral">Soon</Badge>
          </span>
          <span className={styles.navLink} aria-disabled="true" style={{ opacity: 0.5, cursor: "default" }}>
            <UsersIcon size={17} />
            <span style={{ flex: 1 }}>Customers</span>
            <Badge variant="neutral">Soon</Badge>
          </span>
          <span className={styles.navLink} aria-disabled="true" style={{ opacity: 0.5, cursor: "default" }}>
            <SettingsIcon size={17} />
            <span style={{ flex: 1 }}>Settings</span>
            <Badge variant="neutral">Soon</Badge>
          </span>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userRow}>
            <div className={styles.avatar} aria-hidden="true">
              {getInitials(name)}
            </div>
            <div className={styles.userMeta}>
              <div className={styles.userName}>{name}</div>
              <div className={styles.userRole}>{role === "STAFF" ? "Shop Staff" : "Customer"}</div>
            </div>
          </div>
          <button className={styles.logoutRow} onClick={handleLogout}>
            <LogOutIcon size={17} />
            Log out
          </button>
        </div>
      </aside>

      <div className={styles.main}>
        <header className={styles.topbar}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              className={styles.menuButton}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
            </button>
            <span className={styles.pageTitle}>{pageTitle}</span>
          </div>
        </header>
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}

export default AppShell;
