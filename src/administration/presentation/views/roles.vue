<script setup>
import { useRouter } from "vue-router";
import useOrganizationStore from "../../../shared/application/organization.store.js";
import useAdministrationStore from "../../../administration/application/administration.store.js";
import {onMounted, toRefs, ref} from "vue"
import CreateRoleForm from "../components/create-role-form.vue";

const router = useRouter();
const orgStore = useOrganizationStore();
const administrationStore = useAdministrationStore();
const {roles, rolesLoaded} = toRefs(administrationStore);
const {fetchRoles} = administrationStore;
const showCreateDialog = ref(false);

onMounted(() => {
  if (!orgStore.selectedOrganizationId) {
    router.push('/home');
    return;
  }
  if(!administrationStore.rolesLoaded) {
    fetchRoles(orgStore.selectedOrganizationId);
  }
})
</script>

<template>
  <div class="roles-view">
    <div class="header-bar">
      <h1>Roles</h1>
      <pv-button label="Create Role" icon="pi pi-plus" @click="showCreateDialog = true" />
    </div>
    <pv-data-table :value="roles" stripedRows style="width: 100%">
      <pv-column field="id" header="ID" />
      <pv-column field="name" header="Name" />
      <pv-column field="canCreateSites" header="Can Create Sites" />
      <pv-column field="canCreatePeople" header="Can Create People" />
      <pv-column field="canConnectDevices" header="Can Connect Devices" />
      <pv-column header="" style="width: 4rem">
        <template #body>
          <pv-button icon="pi pi-ellipsis-v" rounded text plain />
        </template>
      </pv-column>
    </pv-data-table>
    <CreateRoleForm
      :visible="showCreateDialog"
      :organizationId="orgStore.selectedOrganizationId"
      @update:visible="showCreateDialog = $event" />
  </div>
</template>

<style scoped>
.roles-view {
  padding: 0.5rem 3rem;
}
.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.roles-view :deep(.p-datatable) {
  width: 100%;
  margin-top: 1rem;
}
</style>
