// middleware/auth.js

export default defineNuxtRouteMiddleware((to) => {
  // Bỏ qua kiểm tra nếu đang vào trang login
  if (to.path === '/login') {
    return
  }

  // Chỉ chạy ở client (tránh lỗi SSR)
  if (process.client) {
    const session = localStorage.getItem('loginSession')

    if (!session) {
      return navigateTo('/login')
    }

    try {
      const data = JSON.parse(session)

      // Kiểm tra expiry đúng như bạn đã lưu: new Date().getTime()
      if (Date.now() >= data.expiry) {
        localStorage.removeItem('loginSession') // hết hạn → xóa luôn
        return navigateTo('/login')
      }

      // Còn hợp lệ → cho qua
      return
    } catch (error) {
      // JSON hỏng → xóa và đá về login
      localStorage.removeItem('loginSession')
      return navigateTo('/login')
    }
  }

  // Nếu đang ở server → tạm cho qua (sẽ kiểm tra lại ở client)
  // Hoặc có thể chặn luôn nếu muốn bảo mật cao hơn
  return
})