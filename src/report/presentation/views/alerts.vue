<script setup>
import useReportStore from "../../../report/application/report.store.js";
import {onMounted, toRefs} from "vue"

const reportStore = useReportStore();
const {alerts, alertsLoaded} = toRefs(reportStore);
const {fetchAlerts} = reportStore;

onMounted(() => {
  if(!reportStore.alertsLoaded) {
    fetchAlerts();
  }
})

</script>

<template>
  <div class="alerts-view">
    <h1>Alerts</h1>

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
.alerts-view :deep(.p-datatable) {
  width: 100%;
  margin-top: 1rem;
}
</style>
