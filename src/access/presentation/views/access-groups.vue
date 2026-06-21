<script setup>
import { useRouter } from "vue-router";
import useOrganizationStore from "../../../shared/application/organization.store.js";
import useAccessStore from "../../../access/application/access.store.js";
import {onMounted, toRefs} from "vue"
import searchBar from "../../../shared/presentation/components/search-bar.vue";

const router = useRouter();
const orgStore = useOrganizationStore();
const accessStore = useAccessStore();
const {accessGroups, accessGroupsLoaded} = toRefs(accessStore);
const {fetchAccessGroups} = accessStore;

onMounted(() => {
  if (!orgStore.selectedOrganizationId) {
    router.push('/home');
    return;
  }
  if(!accessStore.accessGroupsLoaded) {
    fetchAccessGroups(orgStore.selectedOrganizationId);
  }
})
</script>

<template>
  <div class="groups-view">
    <h1>Groups</h1>
    <div class="filter-bar">
      <search-bar/>
    </div>
    <pv-data-table :value="accessGroups" stripedRows style="width: 100%">
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
