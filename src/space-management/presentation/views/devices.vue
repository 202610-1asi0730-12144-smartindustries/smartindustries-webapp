<script setup>
import { ref, onMounted, toRefs } from "vue"
import { useRouter } from "vue-router";
import useOrganizationStore from "../../../shared/application/organization.store.js";
import useSpaceManagementStore from "../../../space-management/application/space-management.store.js";
import AddDeviceForm from "../../../space-management/presentation/components/add-device-form.vue";

const router = useRouter();
const orgStore = useOrganizationStore();
const spaceManagementStore = useSpaceManagementStore();
const {devices, devicesLoaded} = toRefs(spaceManagementStore);
const {fetchDevices} = spaceManagementStore;
const dialogVisible = ref(false);

function refreshDevices() {
  fetchDevices(orgStore.selectedOrganizationId);
}

onMounted(() => {
  if (!orgStore.selectedOrganizationId) {
    router.push('/home');
    return;
  }
  if(!spaceManagementStore.devicesLoaded) {
    fetchDevices(orgStore.selectedOrganizationId);
  }
})
</script>

<template>
  <div class="devices-view">
    <div class="devices-header">
      <h1>Devices</h1>
      <pv-button icon="pi pi-plus" label="Add Device" @click="dialogVisible = true" />
    </div>
    <pv-data-table :value="devices" stripedRows style="width: 100%">
      <pv-column field="id" header="ID" />
      <pv-column field="name" header="Name" />
      <pv-column field="mode" header="Mode" />
      <pv-column field="status" header="Status">
        <template #body="{ data }">
          <pv-tag :value="data.status" />
        </template>
      </pv-column>
      <pv-column field="siteId" header="Site" />
      <pv-column header="" style="width: 4rem">
        <template #body>
          <pv-button icon="pi pi-ellipsis-v" rounded text plain />
        </template>
      </pv-column>
    </pv-data-table>
  </div>
  <AddDeviceForm v-model:visible="dialogVisible" :organization-id="orgStore.selectedOrganizationId" @created="refreshDevices" />
</template>

<style scoped>
.devices-view {
  padding: 0.5rem 3rem;
}
.devices-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.devices-view :deep(.p-datatable) {
  width: 100%;
  margin-top: 1rem;
}
</style>
