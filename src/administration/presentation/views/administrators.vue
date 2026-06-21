<script setup>
import { useRouter } from "vue-router";
import useOrganizationStore from "../../../shared/application/organization.store.js";
import useAdministrationStore from "../../../administration/application/administration.store.js";
import {onMounted, toRefs} from "vue"
import { ref } from "vue"
import searchBar from "../../../shared/presentation/components/search-bar.vue";

const router = useRouter();
const orgStore = useOrganizationStore();
const administrationStore = useAdministrationStore();
const {administrators, administratorsLoaded} = toRefs(administrationStore);
const {fetchAdministrators} = administrationStore;

onMounted(() => {
  if (!orgStore.selectedOrganizationId) {
    router.push('/home');
    return;
  }
  if(!administrationStore.administratorsLoaded) {
    fetchAdministrators(orgStore.selectedOrganizationId);
  }
})

const role = ref('All')
const status = ref('All')
const roleOptions = ['All', 'Super Admin', 'Admin', 'Manager']
const statusOptions = ['All', 'Accepted', 'Pending']
</script>

<template>
  <div class="admins-view">
    <h1>Administrators</h1>
    <div class="filter-bar">
      <search-bar/>
      <div class="filter-group">
        <label for="role-select">Role</label>
        <pv-select v-model="role" :options="roleOptions" placeholder="Role" inputId="role-select" />
      </div>
      <div class="filter-group">
        <label for="status-select">Status</label>
        <pv-select v-model="status" :options="statusOptions" placeholder="Status" inputId="status-select" />
      </div>
    </div>
    <pv-data-table :value="administrators" stripedRows style="width: 100%">
      <pv-column field="userId" header="ID" />
      <pv-column field="email" header="Email" />
      <pv-column field="firstName" header="First Name" />
      <pv-column field="lastName" header="Last Name" />
      <pv-column field="roleName" header="Role" />
      <pv-column header="" style="width: 4rem">
        <template #body>
          <pv-button icon="pi pi-ellipsis-v" rounded text plain />
        </template>
      </pv-column>
    </pv-data-table>
  </div>
</template>

<style scoped>
.admins-view {
  padding: 0.5rem 3rem;
}
.filter-bar {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1rem;
}
.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.admins-view :deep(.p-datatable) {
  width: 100%;
  margin-top: 1rem;
}
</style>
