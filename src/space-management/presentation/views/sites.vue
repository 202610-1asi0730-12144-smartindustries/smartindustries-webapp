<script setup>
import { ref, onMounted, toRefs } from "vue"
import { useRouter } from "vue-router";
import useOrganizationStore from "../../../shared/application/organization.store.js";
import useSpaceManagementStore from "../../../space-management/application/space-management.store.js";
import CreateSiteForm from "../../../space-management/presentation/components/create-site-form.vue";

const router = useRouter();
const orgStore = useOrganizationStore();
const spaceManagementStore = useSpaceManagementStore();
const {sites, sitesLoaded} = toRefs(spaceManagementStore);
const {fetchSites} = spaceManagementStore;
const dialogVisible = ref(false);

function refreshSites() {
  fetchSites(orgStore.selectedOrganizationId);
}

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
    <div class="sites-header">
      <h1>Sites</h1>
      <pv-button icon="pi pi-plus" label="Create Site" @click="dialogVisible = true" />
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
  <CreateSiteForm v-model:visible="dialogVisible" :organization-id="orgStore.selectedOrganizationId" @created="refreshSites" />
</template>

<style scoped>
.sites-view {
  padding: 0.5rem 3rem;
}
.sites-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.sites-view :deep(.p-datatable) {
  width: 100%;
  margin-top: 1rem;
}
</style>
