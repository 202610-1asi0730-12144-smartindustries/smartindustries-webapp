<script setup>
import searchBar from "../../../shared/presentation/components/search-bar.vue";

const groups = [
  { id: 1, name: 'Administrators' },
  { id: 2, name: 'Security Personnel' },
  { id: 3, name: 'Maintenance Staff' },
  { id: 4, name: 'Executive Floor' },
]
</script>

<template>
  <div class="groups-view">
    <h1>Groups</h1>
    <div class="filter-bar">
      <search-bar/>
    </div>
    <pv-data-table :value="groups" stripedRows style="width: 100%">
      <pv-column field="id" header="ID" />
      <pv-column field="name" header="Name" />
      <pv-column header="" style="width: 4rem">
        <template #body>
          <pv-button icon="pi pi-ellipsis-v" rounded text plain />
        </template>
      </pv-column>
    </pv-data-table>
  </div>
</template>

<style scoped>
.groups-view {
  padding: 0.5rem 3rem;
}
.filter-bar {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1rem;
}
.groups-view :deep(.p-datatable) {
  width: 100%;
  margin-top: 1rem;
}
</style>
