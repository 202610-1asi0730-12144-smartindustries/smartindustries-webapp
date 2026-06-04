<script setup>
import Button from 'primevue/button'
</script>

<template>
  <div class="topbar flex align-items-center justify-content-between px-3">
    <span class="text-xl font-bold">SmartLock</span>
    <Button icon="pi pi-user" rounded text />
  </div>
</template>

<style scoped>
.topbar {
  height: 4rem;
  background: #3893DD;
}

.topbar .p-button {
  color: #ffffff;
}
</style>