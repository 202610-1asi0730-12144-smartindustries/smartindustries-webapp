<script setup>
import { useRouter } from "vue-router";
import useOrganizationStore from "../../../shared/application/organization.store.js";
import useSpaceManagementStore from "../../../space-management/application/space-management.store.js";
import { onMounted, toRefs } from "vue"
import { ref } from "vue"
import searchBar from "../../../shared/presentation/components/search-bar.vue";

  const router = useRouter();
  const orgStore = useOrganizationStore();
  const spaceManagementStore = useSpaceManagementStore();
  const {people, peopleLoaded} = toRefs(spaceManagementStore);
  const {fetchPeople} = spaceManagementStore;

  onMounted(() => {
    if (!orgStore.selectedOrganizationId) {
      router.push('/home');
      return;
    }
    if(!spaceManagementStore.peopleLoaded) {
      fetchPeople(orgStore.selectedOrganizationId);
    }
  })

  const status = ref('All')
  const location = ref('All')
  const statusOptions = ['All', 'Active', 'Inactive', 'Pending']
  const locationOptions = ['All', 'Building A', 'Building B', 'Warehouse', 'Remote']
</script>

<template>
  <div class="people-view">
    <h1>People</h1>
    <div class="filter-bar">
      <search-bar/>
      <div class="filter-group">
        <label for="status-select">Status</label>
        <pv-select v-model="status" :options="statusOptions" placeholder="Status" inputId="status-select" />
      </div>
      <div class="filter-group">
        <label for="location-select">Location</label>
        <pv-select v-model="location" :options="locationOptions" placeholder="Current location" inputId="location-select" />
      </div>
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
</template>

<style scoped>
.people-view {
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
.people-view :deep(.p-datatable) {
  width: 100%;
  margin-top: 1rem;
}
</style>