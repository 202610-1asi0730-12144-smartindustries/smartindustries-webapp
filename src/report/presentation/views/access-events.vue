<script setup>
import useReportStore from "../../../report/application/report.store.js";
import {onMounted, toRefs} from "vue"

const reportStore = useReportStore();
const {accessEvents, accessEventsLoaded} = toRefs(reportStore);
const {fetchAccessEvents} = reportStore;

onMounted(() => {
  if(!reportStore.accessEventsLoaded) {
    fetchAccessEvents();
  }
})

</script>

<template>
  <div class="events-view">
    <h1>Events</h1>

    <pv-data-table :value="accessEvents" stripedRows style="width: 100%">
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
.events-view :deep(.p-datatable) {
  width: 100%;
  margin-top: 1rem;
}
</style>
