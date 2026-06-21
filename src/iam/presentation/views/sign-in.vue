<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2 class="auth-title">SmartLock</h2>
      <p class="auth-subtitle">Sign in to your account</p>

      <pv-message v-if="iamStore.error" severity="error" class="auth-error">
        {{ iamStore.error }}
      </pv-message>

      <form @submit.prevent="onSubmit" class="auth-form">
        <div class="field">
          <label for="email">Email</label>
          <pv-input-text id="email" v-model="email" type="email" placeholder="Enter your email" fluid />
        </div>
        <div class="field">
          <label for="password">Password</label>
          <pv-password id="password" v-model="password" placeholder="Enter your password" toggleMask :feedback="false" fluid />
        </div>
        <pv-button type="submit" label="Sign In" :loading="loading" fluid raised />
      </form>

      <p class="auth-link">
        Don't have an account?
        <router-link to="/auth/sign-up">Sign up</router-link>
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

const email = ref('')
const password = ref('')
const loading = ref(false)

async function onSubmit() {
  loading.value = true
  const success = await iamStore.signIn(email.value, password.value)
  loading.value = false
  if (success) {
    router.push('/home')
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
  max-width: 420px;
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
</style>
