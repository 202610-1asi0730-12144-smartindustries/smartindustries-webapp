<script setup>
import searchBar from "../../../shared/presentation/components/search-bar.vue";
import { ref } from "vue"

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
</style>
