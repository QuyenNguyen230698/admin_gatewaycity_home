import { reactive } from 'vue'

const toasts = reactive([])

const addToast = (message, type = 'success', duration = 4000) => {
  const id = Date.now() + Math.random()
  toasts.push({ id, message, type })
  
  setTimeout(() => {
    const index = toasts.findIndex(t => t.id === id)
    if (index !== -1) toasts.splice(index, 1)
  }, duration)
}

export const toast = {
  success: (msg, dur) => addToast(msg, 'success', dur),
  error: (msg, dur) => addToast(msg, 'error', dur),
  info: (msg, dur) => addToast(msg, 'info', dur),
  remove: (id) => {
    const index = toasts.findIndex(t => t.id === id)
    if (index !== -1) toasts.splice(index, 1)
  }
}

export const useToast = () => {
  return { toasts, ...toast }
}
