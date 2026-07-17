import { authFetch } from "./apiClient";

export function getAllCustomers() {
  return authFetch("/api/customers");
}
