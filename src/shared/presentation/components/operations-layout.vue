<script setup>
const menuItems = [
  { label: 'Dashboard',     icon: 'pi pi-chart-pie',   to: '/operations/dashboard' },
  { label: 'People',        icon: 'pi pi-users',       to: '/operations/users' },
  { label: 'Devices',       icon: 'pi pi-desktop',     to: '/operations/devices' },
  { label: 'Sites',         icon: 'pi pi-building',       to: '/operations/sites' },
  { label: 'Groups',        icon: 'pi pi-folder',      to: '/operations/groups' },
  { label: 'Events',        icon: 'pi pi-calendar',    to: '/operations/events' },
  { label: 'Alerts',        icon: 'pi pi-bell',        to: '/operations/alerts' },
  { label: 'Administrators', icon: 'pi pi-shield',     to: '/operations/administrators' },
  { label: 'Roles',          icon: 'pi pi-tag',        to: '/operations/roles' },
]
</script>

<template>
  <div class="operations-layout">
    <aside class="sidebar">
      <pv-menu :model="menuItems" />
    </aside>
    <main class="content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.operations-layout {
  display: flex;
  min-height: calc(100vh - 4rem);
}

.sidebar {
  display: flex;
  flex-direction: column;
  width: 250px;
  overflow-y: auto;
}

.sidebar :deep(.p-menu) {
  flex: 1;
}

.content {
  flex: 1;
  padding: 1.5rem;
}
</style>