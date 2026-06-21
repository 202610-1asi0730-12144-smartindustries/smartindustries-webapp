<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2 class="auth-title">Create Account</h2>
      <p class="auth-subtitle">Register for a new SmartLock account</p>

      <pv-message v-if="iamStore.error" severity="error" class="auth-error">
        {{ iamStore.error }}
      </pv-message>

      <pv-message v-if="successMessage" severity="success" class="auth-error">
        {{ successMessage }}
      </pv-message>

      <form @submit.prevent="onSubmit" class="auth-form">
        <div class="field-row">
          <div class="field">
            <label for="firstName">First Name</label>
            <pv-input-text id="firstName" v-model="firstName" placeholder="First name" fluid />
          </div>
          <div class="field">
            <label for="lastName">Last Name</label>
            <pv-input-text id="lastName" v-model="lastName" placeholder="Last name" fluid />
          </div>
        </div>
        <div class="field">
          <label for="email">Email</label>
          <pv-input-text id="email" v-model="email" type="email" placeholder="Enter your email" fluid />
        </div>
        <div class="field">
          <label for="password">Password</label>
          <pv-password id="password" v-model="password" placeholder="Enter your password" toggleMask :feedback="false" fluid />
        </div>
        <pv-button type="submit" label="Sign Up" :loading="loading" fluid raised />
      </form>

      <p class="auth-link">
        Already have an account?
        <router-link to="/auth/sign-in">Sign in</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useIamStore } from '../../application/iam.store.js'

const router = useRouter()
const iamStore = useIamStore()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const successMessage = ref('')

async function onSubmit() {
  loading.value = true
  const success = await iamStore.signUp(firstName.value, lastName.value, email.value, password.value)
  loading.value = false
  if (success) {
    successMessage.value = 'Account created successfully. Please sign in.'
    setTimeout(() => {
      router.push('/auth/sign-in')
    }, 1500)
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: var(--surface-ground);
  padding: 1rem;
}
.auth-card {
  background: var(--surface-card);
  border-radius: 12px;
  padding: 2.5rem;
  width: 100%;
  max-width: 460px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}
.auth-title {
  text-align: center;
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
  color: var(--primary-color);
}
.auth-subtitle {
  text-align: center;
  color: var(--text-color-secondary);
  margin-bottom: 1.5rem;
}
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.auth-error {
  margin-bottom: 1rem;
}
.auth-link {
  text-align: center;
  margin-top: 1.5rem;
  color: var(--text-color-secondary);
}
.field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.field label {
  font-weight: 500;
  font-size: 0.875rem;
}
.field-row {
  display: flex;
  gap: 1rem;
}
.field-row .field {
  flex: 1;
}
</style>
