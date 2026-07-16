import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../layout/AppShell";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import LaundryIllustration from "../components/LaundryIllustration";
import {
  InboxIcon,
  PackageIcon,
  ClipboardCheckIcon,
  WalletIcon,
  ChevronRightIcon,
  BellIcon,
} from "../components/icons/Icon";
import styles from "./Dashboard.module.css";

const CUSTOMER_TABS = [
  { key: "all", label: "All" },
  { key: "inProgress", label: "In progress" },
  { key: "ready", label: "Ready" },
  { key: "completed", label: "Completed" },
];

const CUSTOMER_TIPS = [
  {
    icon: PackageIcon,
    title: "Drop off your laundry",
    description: "Bring your clothes to any LabadaGo partner shop.",
  },
  {
    icon: ClipboardCheckIcon,
    title: "We process your order",
    description: "Our team will wash, dry, and fold with care.",
  },
  {
    icon: BellIcon,
    title: "Get notified",
    description: "We'll notify you once your order is ready!",
  },
  {
    icon: InboxIcon,
    title: "Pick up & enjoy",
    description: "Claim your fresh, clean laundry.",
  },
];

/**
 * Real dashboards lead with state, not decoration. There are genuinely
 * zero orders right now, so the stat numbers are honestly zero and the
 * order list's empty state is real — but the hero banner and "Quick
 * tips" panel are legitimate static content that doesn't require any
 * order data to be true, so they're safe to build out now rather than
 * waiting on the Orders feature.
 */
function Dashboard() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    setName(localStorage.getItem("name"));
    setRole(localStorage.getItem("role"));
  }, [navigate]);

  const isStaff = role === "STAFF";
  const firstName = name ? name.trim().split(/\s+/)[0] : "";

  const stats = isStaff
    ? [
        { label: "Active orders", value: "0", sub: "Currently being processed", icon: PackageIcon, tone: "brand" },
        { label: "Completed today", value: "0", sub: "Finished and picked up", icon: ClipboardCheckIcon, tone: "success" },
        { label: "Revenue today", value: "\u20b10", sub: "From completed orders", icon: WalletIcon, tone: "warning" },
      ]
    : [
        { label: "Orders in progress", value: "0", sub: "Currently being processed", icon: PackageIcon, tone: "brand" },
        { label: "Ready for pickup", value: "0", sub: "Waiting to be claimed", icon: ClipboardCheckIcon, tone: "success" },
        { label: "Completed orders", value: "0", sub: "Successfully completed", icon: WalletIcon, tone: "warning" },
      ];

  const activeTabLabel = CUSTOMER_TABS.find((t) => t.key === activeTab)?.label.toLowerCase();

  return (
    <AppShell pageTitle="Dashboard">
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <div className={styles.heroTop}>
            <h1 className={styles.title}>Welcome back{firstName ? `, ${firstName}` : ""}!</h1>
            <Badge variant="brand">{isStaff ? "Shop staff" : "Customer"}</Badge>
          </div>
          <p className={styles.subtitle}>
            {isStaff
              ? "Here's what's happening with your laundry shop today."
              : "Track your laundry orders from drop-off to pickup."}
          </p>
        </div>
        <LaundryIllustration className={styles.heroArt} />
      </div>

      <div className={styles.statGrid}>
        {stats.map((stat) => {
          const StatIcon = stat.icon;
          return (
            <Card key={stat.label} padding="sm">
              <div className={styles.statTop}>
                <div className={`${styles.statIcon} ${styles[`statIcon-${stat.tone}`]}`}>
                  <StatIcon size={18} />
                </div>
                <div className={styles.statText}>
                  <div className={styles.statLabel}>{stat.label}</div>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statSub}>{stat.sub}</div>
                </div>
                <button
                  className={styles.statArrow}
                  aria-disabled="true"
                  title="Orders — coming soon"
                  tabIndex={-1}
                >
                  <ChevronRightIcon size={16} />
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      <div className={styles.bodyGrid}>
        <Card padding="none">
          <div className={styles.ordersHeader}>
            <span className={styles.sectionHeader}>{isStaff ? "Recent orders" : "Your orders"}</span>
            <div className={styles.tabs} role="tablist">
              {CUSTOMER_TABS.map((tab) => (
                <button
                  key={tab.key}
                  role="tab"
                  aria-selected={activeTab === tab.key}
                  className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ""}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <EmptyState
            icon={<InboxIcon size={20} />}
            title="No orders yet"
            description={
              isStaff
                ? "Orders will show up here as soon as customers start dropping off laundry."
                : `You don't have any ${
                    activeTab === "all" ? "" : activeTabLabel + " "
                  }orders yet. Once you drop off laundry at LabadaGo, they'll appear here with live status.`
            }
            action={
              <Button variant="secondary" disabled>
                {isStaff ? "Log a new order — coming soon" : "Start a new order — coming soon"}
              </Button>
            }
          />
        </Card>

        {!isStaff && (
          <Card padding="sm">
            <div className={styles.tipsHeader}>Quick tips</div>
            <div className={styles.tipsList}>
              {CUSTOMER_TIPS.map((tip) => {
                const TipIcon = tip.icon;
                return (
                  <div className={styles.tipRow} key={tip.title}>
                    <div className={styles.tipIcon}>
                      <TipIcon size={16} />
                    </div>
                    <div>
                      <div className={styles.tipTitle}>{tip.title}</div>
                      <div className={styles.tipDescription}>{tip.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}
      </div>
    </AppShell>
  );
}

export default Dashboard;
