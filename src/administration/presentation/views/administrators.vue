<script setup>
import searchBar from "../../../shared/presentation/components/search-bar.vue";
import { ref } from "vue"

const role = ref('All')
const status = ref('All')
const roleOptions = ['All', 'Super Admin', 'Admin', 'Manager']
const statusOptions = ['All', 'Accepted', 'Pending']
const admins = [
  { id: 1, name: 'Alice Johnson', role: 'Super Admin', status: 'Accepted' },
  { id: 2, name: 'Bob Chen', role: 'Admin', status: 'Accepted' },
  { id: 3, name: 'Carol Martinez', role: 'Manager', status: 'Pending' },
  { id: 4, name: 'Dave Kim', role: 'Admin', status: 'Accepted' },
  { id: 5, name: 'Eve Davis', role: 'Manager', status: 'Pending' },
  { id: 6, name: 'Frank Torres', role: 'Super Admin', status: 'Accepted' },
]
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
    <pv-data-table :value="admins" stripedRows style="width: 100%">
      <pv-column field="id" header="ID" />
      <pv-column field="name" header="Name" />
      <pv-column field="role" header="Role" />
      <pv-column field="status" header="Status">
        <template #body="{ data }">
          <pv-tag :value="data.status" />
        </template>
      </pv-column>
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
