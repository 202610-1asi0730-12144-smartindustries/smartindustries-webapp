<script setup>
import searchBar from "../../../shared/presentation/components/search-bar.vue";
import { ref } from "vue"

const site = ref('All')
const status = ref('All')
const siteOptions = ['All', 'Building A', 'Building B', 'Warehouse', 'Remote']
const statusOptions = ['All', 'New', 'Acknowledged', 'Resolved']
</script>

<template>
  <div class="alerts-view">
    <h1>Alerts</h1>
    <div class="filter-bar">
      <search-bar/>
      <div class="filter-group">
        <label for="site-select">Site</label>
        <pv-select v-model="site" :options="siteOptions" placeholder="Site" inputId="site-select" />
      </div>
      <div class="filter-group">
        <label for="status-select">Status</label>
        <pv-select v-model="status" :options="statusOptions" placeholder="Status" inputId="status-select" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.alerts-view {
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
