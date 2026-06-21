export function authInterceptor(config) {
  const token = localStorage.getItem("smartlock-token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}
