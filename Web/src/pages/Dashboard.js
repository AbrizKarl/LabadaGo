import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../layout/AppShell";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import { InboxIcon } from "../components/icons/Icon";

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
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <h1 style={{ fontSize: "var(--text-xl)", fontWeight: 700, color: "var(--gray-900)" }}>
            Welcome back{firstName ? `, ${firstName}` : ""}
          </h1>
          <Badge variant="brand">{isStaff ? "Shop staff" : "Customer"}</Badge>
        </div>
        <p style={{ color: "var(--gray-500)", fontSize: "var(--text-sm)" }}>
          {isStaff
            ? "Here's what's happening with your laundry shop today."
            : "Track your laundry orders from drop-off to pickup."}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {stats.map((stat) => (
          <Card key={stat.label} padding="sm">
            <div style={{ fontSize: "var(--text-sm)", color: "var(--gray-500)", marginBottom: 8 }}>
              {stat.label}
            </div>
            <div style={{ fontSize: "var(--text-2xl)", fontWeight: 700, color: "var(--gray-900)" }}>
              {stat.value}
            </div>
          </Card>
        ))}
      </div>

      <Card padding="none">
        <div
          style={{
            padding: "16px 24px",
            borderBottom: "1px solid var(--border)",
            fontSize: "var(--text-base)",
            fontWeight: 600,
            color: "var(--gray-900)",
          }}
        >
          {isStaff ? "Recent orders" : "Your orders"}
        </div>
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
