// middleware/admin.js
import { jwtDecode } from "jwt-decode";

export default defineNuxtRouteMiddleware((to) => {
  const session = useCookie('loginSession')
  
  // Nếu không có session (đã bị auth chặn hoặc thiếu), đá về login
  if (!session.value || !session.value.token) {
    return navigateTo('/login')
  }

  try {
    const token = session.value.token
    const decoded = jwtDecode(token)

    // Kiểm tra quyền ADMIN
    // Lưu ý: decoded.roles có thể là mảng hoặc chuỗi tùy Server của bạn
    const isAdmin = Array.isArray(decoded.roles) 
      ? decoded.roles.includes('ADMIN') 
      : decoded.roles === 'ADMIN'

    if (!isAdmin) {
      console.error("Admin: Access denied. Missing ADMIN role.")
      return navigateTo('/') // Không có quyền Admin thì về trang chủ, đừng đá về Login liên tục
    }
  } catch (error) {
    console.error("Admin: Token decode failed.")
    return navigateTo('/login')
  }
})