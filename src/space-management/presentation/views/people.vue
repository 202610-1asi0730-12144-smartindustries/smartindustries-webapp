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
const {fetchPeople, deletePerson} = spaceManagementStore;

const dialogVisible = ref(false);
const editDialogVisible = ref(false);
const selectedPerson = ref(null);
const deleteDialogVisible = ref(false);
const personToDelete = ref(null);
const deleting = ref(false);

const menu = ref(null);
const menuTarget = ref(null);

const menuItems = ref([
  {
    label: 'Edit',
    icon: 'pi pi-pencil',
    command: () => {
      selectedPerson.value = menuTarget.value;
      editDialogVisible.value = true;
    }
  },
  {
    label: 'Delete',
    icon: 'pi pi-trash',
    command: () => {
      personToDelete.value = menuTarget.value;
      deleteDialogVisible.value = true;
    }
  }
]);

function toggleMenu(event, person) {
  menuTarget.value = person;
  menu.value.toggle(event);
}

async function confirmDelete() {
  deleting.value = true;
  const ok = await deletePerson(orgStore.selectedOrganizationId, personToDelete.value.id);
  deleting.value = false;
  if (ok) {
    deleteDialogVisible.value = false;
    personToDelete.value = null;
  }
}

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
        <template #body="slotProps">
          <pv-button icon="pi pi-ellipsis-v" rounded text plain @click="toggleMenu($event, slotProps.data)" />
        </template>
      </pv-column>
    </pv-data-table>
  </div>

  <pv-menu ref="menu" :model="menuItems" :popup="true" />

  <CreatePersonForm v-model:visible="dialogVisible" :organization-id="orgStore.selectedOrganizationId" @created="refreshPeople" />

  <CreatePersonForm v-model:visible="editDialogVisible" :organization-id="orgStore.selectedOrganizationId" :person="selectedPerson" @created="refreshPeople" />

  <pv-dialog :visible="deleteDialogVisible" @update:visible="deleteDialogVisible = $event"
    header="Delete Person" :modal="true" :closable="true" :style="{ width: '400px' }">
    <p v-if="personToDelete">Are you sure you want to delete <strong>{{ personToDelete.firstName }} {{ personToDelete.lastName }}</strong>?</p>
    <template #footer>
      <pv-button label="Cancel" severity="secondary" @click="deleteDialogVisible = false" :disabled="deleting" />
      <pv-button label="Delete" severity="danger" :loading="deleting" @click="confirmDelete" />
    </template>
  </pv-dialog>
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