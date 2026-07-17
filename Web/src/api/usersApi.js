import { authFetch } from "./apiClient";

export function getMyProfile() {
  return authFetch("/api/users/me");
}

export function updateMyProfile(name) {
  return authFetch("/api/users/me", {
    method: "PUT",
    body: JSON.stringify({ name }),
  });
}

export function changeMyPassword(currentPassword, newPassword) {
  return authFetch("/api/users/me/password", {
    method: "PUT",
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}
