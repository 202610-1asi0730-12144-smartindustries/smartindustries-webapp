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
const {fetchSites, deleteSite} = spaceManagementStore;

const dialogVisible = ref(false);
const editDialogVisible = ref(false);
const selectedSite = ref(null);
const deleteDialogVisible = ref(false);
const siteToDelete = ref(null);
const deleting = ref(false);

const menu = ref(null);
const menuTarget = ref(null);

const menuItems = ref([
  {
    label: 'Edit',
    icon: 'pi pi-pencil',
    command: () => {
      selectedSite.value = menuTarget.value;
      editDialogVisible.value = true;
    }
  },
  {
    label: 'Delete',
    icon: 'pi pi-trash',
    command: () => {
      siteToDelete.value = menuTarget.value;
      deleteDialogVisible.value = true;
    }
  }
]);

function toggleMenu(event, site) {
  menuTarget.value = site;
  menu.value.toggle(event);
}

async function confirmDelete() {
  deleting.value = true;
  const ok = await deleteSite(orgStore.selectedOrganizationId, siteToDelete.value.id);
  deleting.value = false;
  if (ok) {
    deleteDialogVisible.value = false;
    siteToDelete.value = null;
  }
}

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
        <template #body="slotProps">
          <pv-button icon="pi pi-ellipsis-v" rounded text plain @click="toggleMenu($event, slotProps.data)" />
        </template>
      </pv-column>
    </pv-data-table>
  </div>

  <pv-menu ref="menu" :model="menuItems" :popup="true" />

  <CreateSiteForm v-model:visible="dialogVisible" :organization-id="orgStore.selectedOrganizationId" @created="refreshSites" />

  <CreateSiteForm v-model:visible="editDialogVisible" :organization-id="orgStore.selectedOrganizationId" :site="selectedSite" @created="refreshSites" />

  <pv-dialog :visible="deleteDialogVisible" @update:visible="deleteDialogVisible = $event"
    header="Delete Site" :modal="true" :closable="true" :style="{ width: '400px' }">
    <p v-if="siteToDelete">Are you sure you want to delete <strong>{{ siteToDelete.name }}</strong>?</p>
    <template #footer>
      <pv-button label="Cancel" severity="secondary" @click="deleteDialogVisible = false" :disabled="deleting" />
      <pv-button label="Delete" severity="danger" :loading="deleting" @click="confirmDelete" />
    </template>
  </pv-dialog>
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
