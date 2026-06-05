<script setup>
import searchBar from "../../../shared/presentation/components/search-bar.vue";
import { ref } from "vue"

const mode = ref('All')
const status = ref('All')
const site = ref('All')
const modeOptions = ['All', 'Blocked', 'Free', 'Security']
const statusOptions = ['All', 'Online', 'Offline']
const siteOptions = ['All', 'Building A', 'Building B', 'Warehouse', 'Remote']
</script>

<template>
  <div class="devices-view">
    <h1>Devices</h1>
    <div class="filter-bar">
      <search-bar/>
      <div class="filter-group">
        <label for="mode-select">Mode</label>
        <pv-select v-model="mode" :options="modeOptions" placeholder="Mode" inputId="mode-select" />
      </div>
      <div class="filter-group">
        <label for="status-select">Status</label>
        <pv-select v-model="status" :options="statusOptions" placeholder="Status" inputId="status-select" />
      </div>
      <div class="filter-group">
        <label for="site-select">Site</label>
        <pv-select v-model="site" :options="siteOptions" placeholder="Site" inputId="site-select" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.devices-view {
  padding: 0.5rem 3rem;
}
.filter-bar {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1rem;
}
.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
