<script setup>
import searchBar from "../../../shared/presentation/components/search-bar.vue";
import { ref } from "vue"

const sites = [
  { id: 1, name: 'Building A' },
  { id: 2, name: 'Building B' },
  { id: 3, name: 'Warehouse' },
  { id: 4, name: 'Remote' },
]
</script>

<template>
  <div class="sites-view">
    <h1>Sites</h1>
    <div class="filter-bar">
      <search-bar/>
    </div>
    <pv-data-table :value="sites" stripedRows style="width: 100%">
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
.sites-view {
  padding: 0.5rem 3rem;
}
.filter-bar {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1rem;
}
.sites-view :deep(.p-datatable) {
  width: 100%;
  margin-top: 1rem;
}
</style>
