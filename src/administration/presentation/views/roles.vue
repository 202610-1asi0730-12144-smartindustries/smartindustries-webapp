<script setup>
import useAdministrationStore from "../../../administration/application/administration.store.js";
import {onMounted, toRefs} from "vue"
import searchBar from "../../../shared/presentation/components/search-bar.vue";

  const administrationStore = useAdministrationStore();
  const {roles, rolesLoaded} = toRefs(administrationStore);
  const {fetchRoles} = administrationStore;

  onMounted(() => {
    if(!administrationStore.rolesLoaded) {
      fetchRoles();
    }
  })
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
