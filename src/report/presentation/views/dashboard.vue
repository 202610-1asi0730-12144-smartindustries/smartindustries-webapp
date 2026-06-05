<script setup>
import { ref } from "vue"

const site = ref('All')
const siteOptions = ['All', 'Building A', 'Building B', 'Warehouse', 'Remote']
</script>

<template>
  <div class="dashboard-view">
    <div class="dashboard-header">
      <div class="filter-group">
        <label for="site-select">Site</label>
        <pv-select v-model="site" :options="siteOptions" placeholder="Site" inputId="site-select" />
      </div>
    </div>
    <div class="dashboard-grid">
      <div class="left-panel">
        <h3>Recent access attempts</h3>
      </div>
      <div class="right-panel">
        <div class="right-row">
          <h3>Recent alerts</h3>
        </div>
        <div class="right-row">
          <h3>Offline devices</h3>
        </div>
        <div class="right-row">
          <h3>More information (Today)</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-view {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.dashboard-header {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
}
.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex: 1;
  overflow: hidden;
  padding: 0 1rem 1rem 1rem;
  gap: 1rem;
}
.left-panel {
  padding: 0.1rem 1.5rem;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
}
.right-panel {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  gap: 1rem;
}
.right-row {
  padding: 0.1rem 1.5rem;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
}
</style>
