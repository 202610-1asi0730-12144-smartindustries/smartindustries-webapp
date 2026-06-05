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
      <pv-select v-model="status" :options="statusOptions" placeholder="Status" />
      <pv-select v-model="location" :options="locationOptions" placeholder="Current location" />
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
  gap: 1rem;
  margin-bottom: 1rem;
}
</style>