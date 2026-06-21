<script setup>
import { useRouter } from "vue-router";
import useOrganizationStore from "../../../shared/application/organization.store.js";
import useSpaceManagementStore from "../../../space-management/application/space-management.store.js";
import {onMounted, toRefs} from "vue"
import searchBar from "../../../shared/presentation/components/search-bar.vue";

const router = useRouter();
const orgStore = useOrganizationStore();
const spaceManagementStore = useSpaceManagementStore();
const {sites, sitesLoaded} = toRefs(spaceManagementStore);
const {fetchSites} = spaceManagementStore;

onMounted(() => {
  if (!orgStore.selectedOrganizationId) {
    router.push('/home');
    return;
  }
  if(!spaceManagementStore.sitesLoaded) {
    fetchSites(orgStore.selectedOrganizationId);
  }
})
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
      <pv-column field="description" header="Description" />
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
