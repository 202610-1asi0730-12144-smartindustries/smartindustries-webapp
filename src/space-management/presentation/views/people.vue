<script setup>
import { ref } from "vue"
import searchBar from "../../../shared/presentation/components/search-bar.vue";

const status = ref('All')
const location = ref('All')
const statusOptions = ['All', 'Active', 'Inactive', 'Pending']
const locationOptions = ['All', 'Building A', 'Building B', 'Warehouse', 'Remote']
</script>

<template>
  <div class="people-view">
    <h1>People</h1>
    <div class="filter-bar">
      <search-bar/>
      <div class="filter-group">
        <label for="status-select">Status</label>
        <pv-select v-model="status" :options="statusOptions" placeholder="Status" inputId="status-select" />
      </div>
      <div class="filter-group">
        <label for="location-select">Location</label>
        <pv-select v-model="location" :options="locationOptions" placeholder="Current location" inputId="location-select" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.people-view {
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