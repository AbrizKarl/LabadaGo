import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppShell from "../layout/AppShell";
import Card from "../components/ui/Card";
import Alert from "../components/ui/Alert";
import EmptyState from "../components/ui/EmptyState";
import { UsersIcon } from "../components/icons/Icon";
import { getAllCustomers } from "../api/customersApi";
import styles from "./CustomersPage.module.css";

function getInitials(name) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  return parts.slice(0, 2).map((p) => p[0]?.toUpperCase() || "").join("") || "?";
}

/**
 * Staff-only. The backend already rejects non-staff callers with a 403
 * (that's the real security boundary) — this client-side redirect just
 * avoids a customer briefly seeing an error page before being sent back.
 */
function CustomersPage() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) {
      navigate("/login");
      return;
    }
    if (role !== "STAFF") {
      navigate("/dashboard");
      return;
    }

    getAllCustomers()
      .then(setCustomers)
      .catch((err) => setError(err.message || "Couldn't load customers."))
      .finally(() => setIsLoading(false));
  }, [navigate]);

  return (
    <AppShell pageTitle="Customers">
      <div className={styles.header}>
        <div className={styles.title}>Customers</div>
        <div className={styles.subtitle}>Everyone who has registered a customer account.</div>
      </div>

      {error && (
        <div style={{ marginBottom: 16 }}>
          <Alert variant="error">{error}</Alert>
        </div>
      )}

      <Card padding="none">
        {isLoading ? (
          <div className={styles.loadingWrap}>Loading customers...</div>
        ) : customers.length === 0 ? (
          <EmptyState
            icon={<UsersIcon size={20} />}
            title="No customers yet"
            description="Customer accounts will appear here as people register."
          />
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Total orders</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.userId}>
                  <td>
                    <div className={styles.nameCell}>
                      <div className={styles.avatar} aria-hidden="true">
                        {getInitials(customer.name)}
                      </div>
                      {customer.name}
                    </div>
                  </td>
                  <td>{customer.email}</td>
                  <td className={styles.orderCountCell}>{customer.totalOrders}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </AppShell>
  );
}

export default CustomersPage;
