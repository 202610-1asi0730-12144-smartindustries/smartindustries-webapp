<script setup>
  import { ref, onMounted, toRefs } from "vue";
  import { useRouter } from "vue-router";
  import useSpaceManagementStore from "../../../space-management/application/space-management.store.js";
  import useOrganizationStore from "../../application/organization.store.js";
  import CreateOrganizationForm from "../../../space-management/presentation/components/create-organization-form.vue";

  const router = useRouter();
  const orgStore = useOrganizationStore();
  const spaceManagementStore = useSpaceManagementStore();
  const { organizations, organizationsLoaded } = toRefs(spaceManagementStore);
  const { fetchOrganizations } = spaceManagementStore;
  const dialogVisible = ref(false);

  function onOrgClick(org) {
    orgStore.selectOrganization(org.id);
    router.push('/operations');
  }

  onMounted(() => {
    if (!spaceManagementStore.organizationsLoaded) {
      fetchOrganizations();
    }
  })
</script>

<template>
  <div class="home-header">
    <h1>Home</h1>
    <pv-button icon="pi pi-plus" label="Create organization" outlined plain @click="dialogVisible = true" />
  </div>
  <div class="org-grid">
    <pv-card v-for="org in organizations" :key="org.id" @click="onOrgClick(org)" style="cursor: pointer">
      <template #title>
        <div class="card-title-row">
          <span>{{ org.name }}</span>
          <pv-button icon="pi pi-ellipsis-v" rounded text plain />
        </div>
      </template>
      <template #content>{{ org.description }}</template>
    </pv-card>
  </div>
  <CreateOrganizationForm v-model:visible="dialogVisible" @created="fetchOrganizations" />
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