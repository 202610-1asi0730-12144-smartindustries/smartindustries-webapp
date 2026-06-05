<script setup>
import { ref } from "vue"

const site = ref('All')
const siteOptions = ['All', 'Building A', 'Building B', 'Warehouse', 'Remote']
const attempts = [
  { person: 'Alice Johnson', deviceId: 'LOCK-001', status: 'Granted' },
  { person: 'Bob Chen', deviceId: 'LOCK-003', status: 'Denied' },
  { person: 'Carol Martinez', deviceId: 'LOCK-002', status: 'Granted' },
  { person: 'Dave Kim', deviceId: 'LOCK-005', status: 'Granted' },
  { person: 'Eve Davis', deviceId: 'LOCK-004', status: 'Pending' },
  { person: 'Frank Torres', deviceId: 'LOCK-006', status: 'Denied' },
  { person: 'Grace Lee', deviceId: 'LOCK-001', status: 'Granted' },
  { person: 'Henry Wu', deviceId: 'LOCK-002', status: 'Granted' },
  { person: 'Ivy Park', deviceId: 'LOCK-004', status: 'Denied' },
  { person: 'Jack Smith', deviceId: 'LOCK-003', status: 'Pending' },
]
const alerts = [
  { person: 'Alice Johnson', location: 'Building A', status: 'New' },
  { person: 'Bob Chen', location: 'Warehouse', status: 'Acknowledged' },
  { person: 'Carol Martinez', location: 'Building B', status: 'Resolved' },
  { person: 'Dave Kim', location: 'Building A', status: 'New' },
  { person: 'Eve Davis', location: 'Remote', status: 'New' },
  { person: 'Frank Torres', location: 'Building B', status: 'Acknowledged' },
  { person: 'Grace Lee', location: 'Building A', status: 'Resolved' },
]
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
        <h3>Recent access events</h3>
        <pv-data-table :value="attempts" scrollable scrollHeight="720px" style="width: 100%">
          <pv-column field="person" header="Person" />
          <pv-column field="deviceId" header="Device ID" />
          <pv-column field="status" header="Status">
            <template #body="{ data }">
              <pv-tag :value="data.status" />
            </template>
          </pv-column>
        </pv-data-table>
      </div>
      <div class="right-panel">
        <div class="right-row">
          <h3>Recent alerts</h3>
          <pv-data-table :value="alerts" scrollable scrollHeight="180px" style="width: 100%">
            <pv-column field="person" header="Person" />
            <pv-column field="location" header="Location" />
            <pv-column field="status" header="Status">
              <template #body="{ data }">
                <pv-tag :value="data.status" />
              </template>
            </pv-column>
          </pv-data-table>
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
