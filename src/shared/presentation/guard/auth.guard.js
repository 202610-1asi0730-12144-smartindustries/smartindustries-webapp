export function authGuard(to) {
  const token = localStorage.getItem("smartlock-token")
  if (!token && to.path !== '/auth/sign-in' && to.path !== '/auth/sign-up') {
    return '/auth/sign-in'
  }
}
