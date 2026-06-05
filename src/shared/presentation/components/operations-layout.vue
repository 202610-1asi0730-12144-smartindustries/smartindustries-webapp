<script setup>
const menuItems = [
  { label: 'Dashboard',     icon: 'pi pi-chart-pie',   to: '/operations/dashboard' },
  { label: 'People',        icon: 'pi pi-users',       to: '/operations/people' },
  { label: 'Devices',       icon: 'pi pi-desktop',     to: '/operations/devices' },
  { label: 'Sites',         icon: 'pi pi-building',       to: '/operations/sites' },
  { label: 'Groups',        icon: 'pi pi-folder',      to: '/operations/access-groups' },
  { label: 'Events',        icon: 'pi pi-history',    to: '/operations/access-events' },
  { label: 'Alerts',        icon: 'pi pi-bell',        to: '/operations/alerts' },
  { label: 'Administrators', icon: 'pi pi-shield',     to: '/operations/administrators' },
  { label: 'Roles',          icon: 'pi pi-tag',        to: '/operations/roles' },
]
</script>

<template>
  <div class="operations-layout">
    <aside class="sidebar">
      <nav class="sidebar-nav">
        <router-link
          v-for="item in menuItems"
          :key="item.label"
          :to="item.to"
          class="menu-item"
          active-class="menu-item-active"
        >
          <i :class="item.icon" />
          <span>{{ item.label }}</span>
        </router-link>
      </nav>
    </aside>
    <main class="content">
      <router-view/>
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
  border-right: 1px solid #d0d0d0;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0.5rem 0;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  color: var(--p-text-muted-color);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
}


.menu-item i {
  font-size: 1.25rem;
}

.content {
  flex: 1;
  min-width: 0;
}

.menu-item-active,
.menu-item-active:hover {
  background: #f0f0f0;
  color: inherit;
  font-weight: 600;
}
</style>