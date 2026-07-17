import { authFetch } from "./apiClient";

export function createOrder(orderData) {
  return authFetch("/api/orders", {
    method: "POST",
    body: JSON.stringify(orderData),
  });
}

export function getMyOrders() {
  return authFetch("/api/orders/mine");
}

export function getAllOrders() {
  return authFetch("/api/orders");
}

export function updateOrderStatus(orderId, status) {
  return authFetch(`/api/orders/${orderId}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
}

export const SERVICE_TYPES = [
  { value: "Wash & Fold", label: "Wash & Fold — \u20b1150" },
  { value: "Wash Only", label: "Wash Only — \u20b1100" },
  { value: "Dry Clean", label: "Dry Clean — \u20b1250" },
  { value: "Iron Only", label: "Iron Only — \u20b180" },
  { value: "Express", label: "Express — \u20b1300" },
];

export const STATUS_LABELS = {
  PENDING: "Pending",
  IN_PROGRESS: "In progress",
  READY: "Ready for pickup",
  COMPLETED: "Completed",
};
