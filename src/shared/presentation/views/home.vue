<script setup>
const organizations = [
  { name: 'Acme Corp', owner: 'Alice Johnson', description: 'Main office building with 24/7 access control' },
  { name: 'Beta Labs', owner: 'Bob Chen', description: 'Research facility with restricted zone access' },
  { name: 'Gamma Inc', owner: 'Carol Martinez', description: 'Warehouse and logistics center' },
  { name: 'Delta Systems', owner: 'Dave Kim', description: 'Data center with multi-factor authentication' },
  { name: 'Eagle Solutions', owner: 'Eve Davis', description: 'Co-working space with shared amenities' },
  { name: 'Phoenix Tech', owner: 'Frank Torres', description: 'Headquarters with executive floor security' },
]
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