<script setup>
import searchBar from "../../../shared/presentation/components/search-bar.vue";
</script>

<template>
  <div class="roles-view">
    <h1>Roles</h1>
    <div class="filter-bar">
      <search-bar/>
    </div>
  </div>
</template>

<style scoped>
.roles-view {
  padding: 0.5rem 3rem;
}
.filter-bar {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1rem;
}
</style>
