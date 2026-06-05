<script setup>
import searchBar from "../../../shared/presentation/components/search-bar.vue";
import { ref } from "vue"

const mode = ref('All')
const status = ref('All')
const site = ref('All')
const modeOptions = ['All', 'Blocked', 'Free', 'Security']
const statusOptions = ['All', 'Online', 'Offline']
const siteOptions = ['All', 'Building A', 'Building B', 'Warehouse', 'Remote']
const devices = [
  { id: 1, name: 'Lock-001', mode: 'Free', status: 'Online', site: 'Building A' },
  { id: 2, name: 'Lock-002', mode: 'Blocked', status: 'Offline', site: 'Warehouse' },
  { id: 3, name: 'Lock-003', mode: 'Security', status: 'Online', site: 'Building B' },
  { id: 4, name: 'Lock-004', mode: 'Free', status: 'Online', site: 'Building A' },
  { id: 5, name: 'Lock-005', mode: 'Blocked', status: 'Offline', site: 'Remote' },
  { id: 6, name: 'Lock-006', mode: 'Security', status: 'Online', site: 'Building B' },
]
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
    <pv-data-table :value="devices" stripedRows style="width: 100%">
      <pv-column field="id" header="ID" />
      <pv-column field="name" header="Name" />
      <pv-column field="mode" header="Mode" />
      <pv-column field="status" header="Status">
        <template #body="{ data }">
          <pv-tag :value="data.status" />
        </template>
      </pv-column>
      <pv-column field="site" header="Site" />
      <pv-column header="" style="width: 4rem">
        <template #body>
          <pv-button icon="pi pi-ellipsis-v" rounded text plain />
        </template>
      </pv-column>
    </pv-data-table>
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
.devices-view :deep(.p-datatable) {
  width: 100%;
  margin-top: 1rem;
}
</style>
