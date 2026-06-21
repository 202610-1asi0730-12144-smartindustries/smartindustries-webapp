<script setup>
import { ref, onMounted, toRefs } from "vue"
import { useRouter } from "vue-router";
import useOrganizationStore from "../../../shared/application/organization.store.js";
import useSpaceManagementStore from "../../../space-management/application/space-management.store.js";
import CreatePersonForm from "../../../space-management/presentation/components/create-person-form.vue";

  const router = useRouter();
  const orgStore = useOrganizationStore();
  const spaceManagementStore = useSpaceManagementStore();
  const {people, peopleLoaded} = toRefs(spaceManagementStore);
  const {fetchPeople} = spaceManagementStore;
  const dialogVisible = ref(false);

  function refreshPeople() {
    fetchPeople(orgStore.selectedOrganizationId);
  }

  onMounted(() => {
    if (!orgStore.selectedOrganizationId) {
      router.push('/home');
      return;
    }
    if(!spaceManagementStore.peopleLoaded) {
      fetchPeople(orgStore.selectedOrganizationId);
    }
  })
</script>

<template>
  <div class="people-view">
    <div class="people-header">
      <h1>People</h1>
      <pv-button icon="pi pi-plus" label="Add Person" @click="dialogVisible = true" />
    </div>
    <pv-data-table :value="people" stripedRows>
      <pv-column field="id" header="ID" />
      <pv-column field="firstName" header="First Name" />
      <pv-column field="lastName" header="Last Name" />
      <pv-column field="identityDocument" header="Identity Document" />
      <pv-column header="" style="width: 4rem">
        <template #body>
          <pv-button icon="pi pi-ellipsis-v" rounded text plain />
        </template>
      </pv-column>
    </pv-data-table>
  </div>
  <CreatePersonForm v-model:visible="dialogVisible" :organization-id="orgStore.selectedOrganizationId" @created="refreshPeople" />
</template>

<style scoped>
.people-view {
  padding: 0.5rem 3rem;
}
.people-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.people-view :deep(.p-datatable) {
  width: 100%;
  margin-top: 1rem;
}
</style>