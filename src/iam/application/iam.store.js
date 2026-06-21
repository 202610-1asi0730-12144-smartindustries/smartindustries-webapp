import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { IamApi } from "../infrastructure/iam-api.js"
import { AuthenticatedUser } from "../domain/model/authenticated-user.entity.js"

const TOKEN_KEY = "smartlock-token"
const USER_KEY = "smartlock-user"

export const useIamStore = defineStore('iam', () => {
  const currentUser = ref(restoreUser())
  const error = ref(null)

  const isAuthenticated = computed(() => currentUser.value !== null)

  function restoreUser() {
    const token = localStorage.getItem(TOKEN_KEY)
    const user = localStorage.getItem(USER_KEY)
    if (!token || !user) return null
    try {
      return new AuthenticatedUser({ ...JSON.parse(user), token })
    } catch {
      return null
    }
  }

  async function signIn(email, password) {
    try {
      const api = new IamApi()
      const response = await api.signIn({ email, password })
      const user = new AuthenticatedUser(response.data)
      persistSession(user)
      currentUser.value = user
      error.value = null
      return true
    } catch (e) {
      error.value = e.response?.data?.title || "Invalid credentials"
      return false
    }
  }

  async function signUp(firstName, lastName, email, password) {
    try {
      const api = new IamApi()
      await api.signUp({ firstName, lastName, email, password })
      error.value = null
      return true
    } catch (e) {
      error.value = e.response?.data?.title || "Registration failed"
      return false
    }
  }

  function signOut() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem("smartlock-selected-org")
    currentUser.value = null
  }

  function persistSession(user) {
    localStorage.setItem(TOKEN_KEY, user.token)
    localStorage.setItem(USER_KEY, JSON.stringify({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }))
  }

  return { currentUser, isAuthenticated, error, signIn, signUp, signOut }
})
