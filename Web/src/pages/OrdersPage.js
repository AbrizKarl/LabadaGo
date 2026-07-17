import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../layout/AppShell";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";
import EmptyState from "../components/ui/EmptyState";
import Modal from "../components/ui/Modal";
import NewOrderForm from "../components/NewOrderForm";
import { InboxIcon } from "../components/icons/Icon";
import { getMyOrders, getAllOrders, updateOrderStatus, STATUS_LABELS } from "../api/ordersApi";
import styles from "./OrdersPage.module.css";

const TABS = [
  { key: "ALL", label: "All" },
  { key: "PENDING", label: "Pending" },
  { key: "IN_PROGRESS", label: "In progress" },
  { key: "READY", label: "Ready" },
  { key: "COMPLETED", label: "Completed" },
];

const STATUS_BADGE_VARIANT = {
  PENDING: "neutral",
  IN_PROGRESS: "brand",
  READY: "warning",
  COMPLETED: "success",
};

function formatDate(dateStr) {
  if (!dateStr) return "\u2014";
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

/**
 * This is the real Orders page — genuinely fetches from the backend,
 * genuinely persists to the database. The role split mirrors the backend:
 * customers only ever see their own orders (GET /api/orders/mine), staff
 * see everyone's (GET /api/orders) and can move status forward.
 */
function OrdersPage() {
  const role = localStorage.getItem("role");
  const isStaff = role === "STAFF";
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [activeTab, setActiveTab] = useState("ALL");
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    setLoadError("");
    try {
      const data = isStaff ? await getAllOrders() : await getMyOrders();
      setOrders(data);
    } catch (err) {
      setLoadError(err.message || "Couldn't load orders.");
    } finally {
      setIsLoading(false);
    }
  }, [isStaff]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleCreated = (order) => {
    setOrders((prev) => [order, ...prev]);
    setShowNewOrder(false);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const updated = await updateOrderStatus(orderId, newStatus);
      setOrders((prev) => prev.map((o) => (o.orderId === updated.orderId ? updated : o)));
    } catch (err) {
      setLoadError(err.message || "Couldn't update that order.");
    } finally {
      setUpdatingId(null);
    }
  };

  const visibleOrders =
    activeTab === "ALL" ? orders : orders.filter((o) => o.status === activeTab);

  return (
    <AppShell pageTitle="Orders">
      <div className={styles.header}>
        <div className={styles.titleWrap}>
          <div className={styles.title}>{isStaff ? "All orders" : "Your orders"}</div>
          <div className={styles.subtitle}>
            {isStaff
              ? "Every order placed across LabadaGo, most recent first."
              : "Track every order you've placed, from drop-off to pickup."}
          </div>
        </div>
        {!isStaff && <Button variant="primary" onClick={() => setShowNewOrder(true)}>New order</Button>}
      </div>

      {loadError && (
        <div style={{ marginBottom: 16 }}>
          <Alert variant="error">{loadError}</Alert>
        </div>
      )}

      <Card padding="none">
        <div className={styles.tabs} role="tablist">
          {TABS.map((tab) => (
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

        {isLoading ? (
          <div className={styles.loadingWrap}>Loading orders...</div>
        ) : visibleOrders.length === 0 ? (
          <EmptyState
            icon={<InboxIcon size={20} />}
            title="No orders yet"
            description={
              isStaff
                ? "Orders will show up here as soon as customers start dropping off laundry."
                : "Once you place an order, it'll appear here with live status."
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
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order</th>
                {isStaff && <th>Customer</th>}
                <th>Service</th>
                <th>Pickup date</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {visibleOrders.map((order) => (
                <tr key={order.orderId}>
                  <td className={styles.orderIdCell}>#{order.orderId}</td>
                  {isStaff && <td>{order.customerName}</td>}
                  <td>{order.serviceType}</td>
                  <td>{formatDate(order.pickupDate)}</td>
                  <td className={styles.priceCell}>{"\u20b1" + order.estimatedPrice}</td>
                  <td>
                    {isStaff ? (
                      <select
                        className={styles.statusSelect}
                        value={order.status}
                        disabled={updatingId === order.orderId}
                        onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                      >
                        {Object.keys(STATUS_LABELS).map((s) => (
                          <option key={s} value={s}>
                            {STATUS_LABELS[s]}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <Badge variant={STATUS_BADGE_VARIANT[order.status]}>
                        {STATUS_LABELS[order.status]}
                      </Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {showNewOrder && (
        <Modal title="Place a new order" onClose={() => setShowNewOrder(false)}>
          <NewOrderForm onCreated={handleCreated} onCancel={() => setShowNewOrder(false)} />
        </Modal>
      )}
    </AppShell>
  );
}

export default OrdersPage;
