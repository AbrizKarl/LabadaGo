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
  PanelLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  SearchIcon,
  BellIcon,
} from "../components/icons/Icon";
import styles from "./AppShell.module.css";

function getInitials(name) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  return parts.slice(0, 2).map((p) => p[0]?.toUpperCase() || "").join("") || "?";
}

const COLLAPSE_KEY = "labadago:sidebar-collapsed";

/**
 * Persistent sidebar + topbar shell for every authenticated screen.
 *
 * Nav items for pages that don't exist yet (Orders, Customers, Settings)
 * are shown disabled with a "Soon" badge instead of being omitted or
 * linking to a dead route — keeps the information architecture visible
 * from day one. The topbar's search box follows the same rule: it's
 * shown because a real product would have one, but disabled rather than
 * wired to nothing, since there's no searchable data yet.
 */
function AppShell({ pageTitle, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem(COLLAPSE_KEY) === "1";
    } catch {
      return false;
    }
  });
  const navigate = useNavigate();

  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const closeMobile = () => setMobileOpen(false);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(COLLAPSE_KEY, next ? "1" : "0");
      } catch {
        /* private browsing / storage disabled — collapse still works this session */
      }
      return next;
    });
  };

  return (
    <div className={styles.shell}>
      <div
        className={`${styles.backdrop} ${mobileOpen ? styles.backdropOpen : ""}`}
        onClick={closeMobile}
      />

      <aside
        className={`${styles.sidebar} ${mobileOpen ? styles.sidebarOpen : ""} ${
          collapsed ? styles.sidebarCollapsed : ""
        }`}
      >
        <div className={styles.sidebarTop}>
          <Link to="/dashboard" className={styles.sidebarBrand} onClick={closeMobile}>
            <Logo size={26} />
            {!collapsed && <span className={styles.sidebarBrandName}>LabadaGo</span>}
          </Link>
          <button
            className={styles.collapseButton}
            onClick={toggleCollapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <PanelLeftIcon size={16} />
          </button>
        </div>

        <nav className={styles.navSection} aria-label="Primary">
          {!collapsed && <div className={styles.navLabel}>Workspace</div>}
          <Link
            to="/dashboard"
            className={`${styles.navLink} ${styles.navLinkActive}`}
            title={collapsed ? "Dashboard" : undefined}
          >
            <GridIcon size={17} />
            {!collapsed && "Dashboard"}
          </Link>
          <span
            className={`${styles.navLink} ${styles.navLinkDisabled}`}
            aria-disabled="true"
            title={collapsed ? "Orders — coming soon" : undefined}
          >
            <PackageIcon size={17} />
            {!collapsed && (
              <>
                <span className={styles.navLinkLabel}>Orders</span>
                <Badge variant="neutral">Soon</Badge>
              </>
            )}
          </span>
          <span
            className={`${styles.navLink} ${styles.navLinkDisabled}`}
            aria-disabled="true"
            title={collapsed ? "Customers — coming soon" : undefined}
          >
            <UsersIcon size={17} />
            {!collapsed && (
              <>
                <span className={styles.navLinkLabel}>Customers</span>
                <Badge variant="neutral">Soon</Badge>
              </>
            )}
          </span>
          <span
            className={`${styles.navLink} ${styles.navLinkDisabled}`}
            aria-disabled="true"
            title={collapsed ? "Settings — coming soon" : undefined}
          >
            <SettingsIcon size={17} />
            {!collapsed && (
              <>
                <span className={styles.navLinkLabel}>Settings</span>
                <Badge variant="neutral">Soon</Badge>
              </>
            )}
          </span>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userRow} title={collapsed ? name : undefined}>
            <div className={styles.avatar} aria-hidden="true">
              {getInitials(name)}
            </div>
            {!collapsed && (
              <div className={styles.userMeta}>
                <div className={styles.userName}>{name}</div>
                <div className={styles.userRole}>{role === "STAFF" ? "Shop Staff" : "Customer"}</div>
              </div>
            )}
          </div>
          <button
            className={styles.logoutRow}
            onClick={handleLogout}
            title={collapsed ? "Log out" : undefined}
          >
            <LogOutIcon size={17} />
            {!collapsed && "Log out"}
          </button>
        </div>
      </aside>

      <div className={`${styles.main} ${collapsed ? styles.mainExpanded : ""}`}>
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <button
              className={styles.menuButton}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
            </button>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <span className={styles.breadcrumbRoot}>Workspace</span>
              <ChevronRightIcon size={14} />
              <span className={styles.breadcrumbCurrent}>{pageTitle}</span>
            </nav>
          </div>

          <div className={styles.topbarRight}>
            <div className={styles.searchBox} title="Search — coming soon">
              <SearchIcon size={16} />
              <input
                className={styles.searchInput}
                placeholder="Search..."
                disabled
                aria-label="Search (coming soon)"
              />
            </div>
            <button
              className={styles.iconButton}
              title="Notifications — coming soon"
              aria-label="Notifications (coming soon)"
              disabled
            >
              <BellIcon size={18} />
            </button>
            <div className={styles.userMenuWrap}>
              <button
                className={styles.userMenuTrigger}
                onClick={() => setUserMenuOpen((v) => !v)}
                aria-haspopup="true"
                aria-expanded={userMenuOpen}
              >
                <div className={styles.topbarAvatar} aria-hidden="true">
                  {getInitials(name)}
                </div>
                <ChevronDownIcon size={14} />
              </button>
              {userMenuOpen && (
                <>
                  <div className={styles.userMenuBackdrop} onClick={() => setUserMenuOpen(false)} />
                  <div className={styles.userMenu} role="menu">
                    <div className={styles.userMenuHeader}>
                      <div className={styles.userMenuName}>{name}</div>
                      <div className={styles.userMenuRole}>
                        {role === "STAFF" ? "Shop Staff" : "Customer"}
                      </div>
                    </div>
                    <button className={styles.userMenuItem} onClick={handleLogout} role="menuitem">
                      <LogOutIcon size={16} />
                      Log out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}

export default AppShell;
