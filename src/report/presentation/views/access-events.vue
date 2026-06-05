<script setup>
import searchBar from "../../../shared/presentation/components/search-bar.vue";
import { ref } from "vue"

const site = ref('All')
const status = ref('All')
const siteOptions = ['All', 'Building A', 'Building B', 'Warehouse', 'Remote']
const statusOptions = ['All', 'Accepted', 'Rejected']
const events = [
  { id: 1, location: 'Building A', person: 'Alice Johnson', status: 'Accepted', date: '2026-06-05 08:30' },
  { id: 2, location: 'Warehouse', person: 'Bob Chen', status: 'Rejected', date: '2026-06-05 09:15' },
  { id: 3, location: 'Building B', person: 'Carol Martinez', status: 'Accepted', date: '2026-06-05 10:00' },
  { id: 4, location: 'Building A', person: 'Dave Kim', status: 'Accepted', date: '2026-06-05 10:45' },
  { id: 5, location: 'Remote', person: 'Eve Davis', status: 'Rejected', date: '2026-06-05 11:20' },
  { id: 6, location: 'Building B', person: 'Frank Torres', status: 'Accepted', date: '2026-06-05 12:00' },
]
</script>

<template>
  <div class="events-view">
    <h1>Events</h1>
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
    <pv-data-table :value="events" stripedRows style="width: 100%">
      <pv-column field="id" header="ID" />
      <pv-column field="location" header="Location" />
      <pv-column field="person" header="Person" />
      <pv-column field="status" header="Status">
        <template #body="{ data }">
          <pv-tag :value="data.status" />
        </template>
      </pv-column>
      <pv-column field="date" header="Date" />
      <pv-column header="" style="width: 4rem">
        <template #body>
          <pv-button icon="pi pi-ellipsis-v" rounded text plain />
        </template>
      </pv-column>
    </pv-data-table>
  </div>
</template>

<style scoped>
.events-view {
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
.events-view :deep(.p-datatable) {
  width: 100%;
  margin-top: 1rem;
}
</style>
