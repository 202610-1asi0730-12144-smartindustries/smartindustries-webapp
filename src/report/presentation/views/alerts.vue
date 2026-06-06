<script setup>
import useReportStore from "../../../report/application/report.store.js";
import {onMounted, toRefs} from "vue"
import { ref } from "vue"
import searchBar from "../../../shared/presentation/components/search-bar.vue";

const reportStore = useReportStore();
const {alerts, alertsLoaded} = toRefs(reportStore);
const {fetchAlerts} = reportStore;

onMounted(() => {
  if(!reportStore.alertsLoaded) {
    fetchAlerts();
  }
})

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
    <pv-data-table :value="alerts" stripedRows style="width: 100%">
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
.alerts-view :deep(.p-datatable) {
  width: 100%;
  margin-top: 1rem;
}
</style>
