import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../layout/AppShell";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import Modal from "../components/ui/Modal";
import NewOrderForm from "../components/NewOrderForm";
import LaundryIllustration from "../components/LaundryIllustration";
import {
  InboxIcon,
  PackageIcon,
  ClipboardCheckIcon,
  WalletIcon,
  ChevronRightIcon,
  BellIcon,
} from "../components/icons/Icon";
import { getMyOrders, getAllOrders, STATUS_LABELS } from "../api/ordersApi";
import styles from "./Dashboard.module.css";

const CUSTOMER_TABS = [
  { key: "all", label: "All" },
  { key: "IN_PROGRESS", label: "In progress" },
  { key: "READY", label: "Ready" },
  { key: "COMPLETED", label: "Completed" },
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

function formatDate(dateStr) {
  if (!dateStr) return "\u2014";
  return new Date(dateStr).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

/**
 * Orders are real now — fetched from the backend, not fabricated. Stat
 * counts are derived from whatever actually comes back, so if the API
 * call fails, we show zeros rather than pretending to have data.
 */
function Dashboard() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showNewOrder, setShowNewOrder] = useState(false);
  const navigate = useNavigate();

  const isStaff = role === "STAFF";

  const loadOrders = useCallback(async (currentRole) => {
    setIsLoading(true);
    try {
      const data = currentRole === "STAFF" ? await getAllOrders() : await getMyOrders();
      setOrders(data);
    } catch {
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const savedRole = localStorage.getItem("role");
    setName(localStorage.getItem("name"));
    setRole(savedRole);
    loadOrders(savedRole);
  }, [navigate, loadOrders]);

  const firstName = name ? name.trim().split(/\s+/)[0] : "";

  const inProgressCount = orders.filter((o) => o.status === "IN_PROGRESS" || o.status === "PENDING").length;
  const readyCount = orders.filter((o) => o.status === "READY").length;
  const completedCount = orders.filter((o) => o.status === "COMPLETED").length;
  const todayRevenue = orders
    .filter((o) => o.status === "COMPLETED")
    .reduce((sum, o) => sum + (o.estimatedPrice || 0), 0);

  const stats = isStaff
    ? [
        { label: "Active orders", value: String(inProgressCount), sub: "Currently being processed", icon: PackageIcon, tone: "brand" },
        { label: "Ready for pickup", value: String(readyCount), sub: "Waiting to be claimed", icon: ClipboardCheckIcon, tone: "success" },
        { label: "Total revenue", value: "\u20b1" + todayRevenue, sub: "From completed orders", icon: WalletIcon, tone: "warning" },
      ]
    : [
        { label: "Orders in progress", value: String(inProgressCount), sub: "Currently being processed", icon: PackageIcon, tone: "brand" },
        { label: "Ready for pickup", value: String(readyCount), sub: "Waiting to be claimed", icon: ClipboardCheckIcon, tone: "success" },
        { label: "Completed orders", value: String(completedCount), sub: "Successfully completed", icon: WalletIcon, tone: "warning" },
      ];

  const recentOrders =
    activeTab === "all" ? orders.slice(0, 5) : orders.filter((o) => o.status === activeTab).slice(0, 5);

  const handleCreated = (order) => {
    setOrders((prev) => [order, ...prev]);
    setShowNewOrder(false);
  };

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
                  <div className={styles.statValue}>{isLoading ? "\u2013" : stat.value}</div>
                  <div className={styles.statSub}>{stat.sub}</div>
                </div>
                <button
                  className={styles.statArrow}
                  onClick={() => navigate("/orders")}
                  title="View orders"
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

          {isLoading ? (
            <div className={styles.loadingRow}>Loading orders...</div>
          ) : recentOrders.length === 0 ? (
            <EmptyState
              icon={<InboxIcon size={20} />}
              title="No orders yet"
              description={
                isStaff
                  ? "Orders will show up here as soon as customers start dropping off laundry."
                  : "Once you drop off laundry at LabadaGo, they'll appear here with live status."
              }
              action={
                !isStaff && (
                  <Button variant="secondary" onClick={() => setShowNewOrder(true)}>
                    Start a new order
                  </Button>
                )
              }
            />
          ) : (
            <div className={styles.recentList}>
              {recentOrders.map((order) => (
                <div className={styles.recentRow} key={order.orderId}>
                  <div className={styles.recentMain}>
                    <div className={styles.recentService}>{order.serviceType}</div>
                    <div className={styles.recentMeta}>
                      {isStaff ? order.customerName + " \u00b7 " : ""}
                      {formatDate(order.pickupDate)}
                    </div>
                  </div>
                  <Badge
                    variant={
                      order.status === "COMPLETED"
                        ? "success"
                        : order.status === "READY"
                        ? "warning"
                        : order.status === "IN_PROGRESS"
                        ? "brand"
                        : "neutral"
                    }
                  >
                    {STATUS_LABELS[order.status]}
                  </Badge>
                </div>
              ))}
            </div>
          )}
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

      {showNewOrder && (
        <Modal title="Place a new order" onClose={() => setShowNewOrder(false)}>
          <NewOrderForm onCreated={handleCreated} onCancel={() => setShowNewOrder(false)} />
        </Modal>
      )}
    </AppShell>
  );
}

export default Dashboard;
