// /middleware/admin.js
import { jwtDecode } from "jwt-decode";

export default defineNuxtRouteMiddleware((to) => {
  if (process.server) return;

  const token = localStorage.getItem("token");
  if (!token) return navigateTo("/login");

  try {
    const decoded = jwtDecode(token);

    if (decoded.roles !== "ADMIN") {
      return navigateTo("/login", { replace: true });
    }

  } catch {
    return navigateTo("/login");
  }
});
