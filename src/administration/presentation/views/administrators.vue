<script setup>
import { useRouter } from "vue-router";
import useOrganizationStore from "../../../shared/application/organization.store.js";
import useAdministrationStore from "../../../administration/application/administration.store.js";
import {onMounted, toRefs} from "vue"

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

</script>

<template>
  <div class="admins-view">
    <h1>Administrators</h1>

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
.admins-view :deep(.p-datatable) {
  width: 100%;
  margin-top: 1rem;
}
</style>
