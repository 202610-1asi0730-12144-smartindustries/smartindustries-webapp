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
const {fetchDevices, deleteDevice} = spaceManagementStore;

const dialogVisible = ref(false);
const editDialogVisible = ref(false);
const selectedDevice = ref(null);
const deleteDialogVisible = ref(false);
const deviceToDelete = ref(null);
const deleting = ref(false);

const menu = ref(null);
const menuTarget = ref(null);

const menuItems = ref([
  {
    label: 'Edit',
    icon: 'pi pi-pencil',
    command: () => {
      selectedDevice.value = menuTarget.value;
      editDialogVisible.value = true;
    }
  },
  {
    label: 'Delete',
    icon: 'pi pi-trash',
    command: () => {
      deviceToDelete.value = menuTarget.value;
      deleteDialogVisible.value = true;
    }
  }
]);

function toggleMenu(event, device) {
  menuTarget.value = device;
  menu.value.toggle(event);
}

async function confirmDelete() {
  deleting.value = true;
  const ok = await deleteDevice(deviceToDelete.value.siteId, deviceToDelete.value.id);
  deleting.value = false;
  if (ok) {
    deleteDialogVisible.value = false;
    deviceToDelete.value = null;
  }
}

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
      <pv-column field="siteName" header="Site" />
      <pv-column header="" style="width: 4rem">
        <template #body="slotProps">
          <pv-button icon="pi pi-ellipsis-v" rounded text plain @click="toggleMenu($event, slotProps.data)" />
        </template>
      </pv-column>
    </pv-data-table>
  </div>

  <pv-menu ref="menu" :model="menuItems" :popup="true" />

  <AddDeviceForm v-model:visible="dialogVisible" :organization-id="orgStore.selectedOrganizationId" @created="refreshDevices" />

  <AddDeviceForm v-model:visible="editDialogVisible" :organization-id="orgStore.selectedOrganizationId" :device="selectedDevice" @created="refreshDevices" />

  <pv-dialog :visible="deleteDialogVisible" @update:visible="deleteDialogVisible = $event"
    header="Delete Device" :modal="true" :closable="true" :style="{ width: '400px' }">
    <p v-if="deviceToDelete">Are you sure you want to delete <strong>{{ deviceToDelete.name }}</strong>?</p>
    <template #footer>
      <pv-button label="Cancel" severity="secondary" @click="deleteDialogVisible = false" :disabled="deleting" />
      <pv-button label="Delete" severity="danger" :loading="deleting" @click="confirmDelete" />
    </template>
  </pv-dialog>
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
