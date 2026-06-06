<script setup>
  import useSpaceManagementStore from "../../../space-management/application/space-management.store.js";
  import {onMounted, toRefs} from "vue";

  const spaceManagementStore = useSpaceManagementStore();
  const {organizations, organizationsLoaded} = toRefs(spaceManagementStore);
  const {fetchOrganizations} = spaceManagementStore;

  onMounted(() => {
    if(!spaceManagementStore.organizationsLoaded) {
      fetchOrganizations();
      organizationsLoaded.value = spaceManagementStore.organizationsLoaded;
    }
  })
</script>

<template>
  <div class="home-header">
    <h1>Home</h1>
    <pv-button icon="pi pi-plus" label="Create organization" outlined plain />
  </div>
  <div class="org-grid">
    <pv-card v-for="org in organizations" :key="org.name">
      <template #title>
        <div class="card-title-row">
          <span>{{ org.name }}</span>
          <pv-button icon="pi pi-ellipsis-v" rounded text plain />
        </div>
      </template>
      <template #subtitle>Owner: {{ org.owner }}</template>
      <template #content>{{ org.description }}</template>
    </pv-card>
  </div>
</template>

<style scoped>
.home-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1.5rem;
}
.card-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.org-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 0 1.5rem;
}
</style>