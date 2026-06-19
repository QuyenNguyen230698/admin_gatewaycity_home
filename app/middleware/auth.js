// middleware/auth.js
export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/login') return

  // Sử dụng useCookie của Nuxt (tự động hoạt động cả SSR và Client)
  const session = useCookie('loginSession')

  if (!session.value) {
    console.warn("Auth: No session found. Redirecting to login.")
    return navigateTo('/login')
  }

  // Nếu session là Object (đã parse), kiểm tra expiry
  try {
    const data = session.value
    if (data.expiry && Date.now() >= data.expiry) {
      session.value = null // Xóa cookie
      return navigateTo('/login')
    }
  } catch (error) {
    session.value = null
    return navigateTo('/login')
  }
})