<script setup>
import searchBar from "../../../shared/presentation/components/search-bar.vue";

const roles = [
  { id: 1, name: 'Super Admin' },
  { id: 2, name: 'Admin' },
  { id: 3, name: 'Manager' },
  { id: 4, name: 'Operator' },
]
</script>

<template>
  <div class="roles-view">
    <h1>Roles</h1>
    <div class="filter-bar">
      <search-bar/>
    </div>
    <pv-data-table :value="roles" stripedRows style="width: 100%">
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
.roles-view {
  padding: 0.5rem 3rem;
}
.filter-bar {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1rem;
}
.roles-view :deep(.p-datatable) {
  width: 100%;
  margin-top: 1rem;
}
</style>
