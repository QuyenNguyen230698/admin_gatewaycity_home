export const usePermission = () => {
  const user = ref({ roles: [], permissions: [] })
  
  // Load user data from session (mocking actual sync with store)
  const loadUser = () => {
    if (process.client) {
      const session = localStorage.getItem('loginSession')
      if (session) {
        const data = JSON.parse(session)
        user.value = {
          roles: data.user?.roles || [],
          // Permissions can be granular strings or objects
          // Assuming user.permissions is an array like ['news.create', 'product.edit']
          permissions: data.user?.permissions || []
        }
      }
    }
  }

  // RBAC + ABAC Logic
  // usage: can('update', 'posts', { departmentId: 'MARKETING_01' })
  const can = (action, resource, attributes = null) => {
    // Admin bypass
    if (user.value.roles.includes('ADMIN')) return true
    
    // Find permission for the resource
    // user.permissions = [{ resource: 'posts', action: ['create', 'view'], condition: {...} }]
    const perm = user.value.permissions.find(p => p.resource === resource)
    
    if (!perm) return false
    
    // Check if high-level role allow all on resource
    const hasAction = perm.action.includes(action) || perm.action.includes('*')
    if (!hasAction) return false

    // ABAC: Check conditions if they exist
    if (perm.condition && attributes) {
      return Object.entries(perm.condition).every(([key, value]) => {
        return attributes[key] === value
      })
    }

    return true
  }

  // Reactive role check
  const hasRole = (role) => user.value.roles.includes(role)

  onMounted(loadUser)

  return {
    user,
    can,
    hasRole,
    loadUser
  }
}
