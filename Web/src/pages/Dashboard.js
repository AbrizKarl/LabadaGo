import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../layout/AppShell";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import { InboxIcon } from "../components/icons/Icon";
import styles from "./Dashboard.module.css";

/**
 * Real dashboards lead with state, not decoration. Until order management
 * ships (Part 2), the honest state is "zero orders" — so this shows a
 * proper empty state and zeroed stat row instead of four clickable-looking
 * cards that don't go anywhere.
 */
function Dashboard() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
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
        { label: "Active orders", value: "0" },
        { label: "Completed today", value: "0" },
        { label: "Revenue today", value: "\u20b10" },
      ]
    : [
        { label: "Orders in progress", value: "0" },
        { label: "Ready for pickup", value: "0" },
        { label: "Completed orders", value: "0" },
      ];

  return (
    <AppShell pageTitle="Dashboard">
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={styles.title}>Welcome back{firstName ? `, ${firstName}` : ""}</h1>
          <Badge variant="brand">{isStaff ? "Shop staff" : "Customer"}</Badge>
        </div>
        <p className={styles.subtitle}>
          {isStaff
            ? "Here's what's happening with your laundry shop today."
            : "Track your laundry orders from drop-off to pickup."}
        </p>
      </div>

      <div className={styles.statGrid}>
        {stats.map((stat) => (
          <Card key={stat.label} padding="sm">
            <div className={styles.statLabel}>{stat.label}</div>
            <div className={styles.statValue}>{stat.value}</div>
          </Card>
        ))}
      </div>

      <Card padding="none">
        <div className={styles.sectionHeader}>{isStaff ? "Recent orders" : "Your orders"}</div>
        <EmptyState
          icon={<InboxIcon size={20} />}
          title="No orders yet"
          description={
            isStaff
              ? "Orders will show up here as soon as customers start dropping off laundry."
              : "Once you drop off laundry at LabadaGo, your orders will appear here with live status."
          }
          action={
            <Button variant="secondary" disabled>
              {isStaff ? "Log a new order — coming soon" : "Start a new order — coming soon"}
            </Button>
          }
        />
      </Card>
    </AppShell>
  );
}

export default Dashboard;

