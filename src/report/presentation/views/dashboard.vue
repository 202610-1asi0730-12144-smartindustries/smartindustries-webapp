<script setup>

</script>

<template>
  <div class="dashboard-grid">
    <div class="left-panel">
      <h3>Recent access attempts</h3>
    </div>
    <div class="right-panel">
      <div class="right-row">
        <h3>Recent alerts</h3>
      </div>
      <div class="right-row">
        <h3>Offline devices</h3>
      </div>
      <div class="right-row">
        <h3>More information (Today)</h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  overflow: hidden;
  padding: 1rem;
  gap: 1rem;
}
.left-panel {
  padding: 0.1rem 1.5rem;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
}
.right-panel {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  gap: 1rem;
}
.right-row {
  padding: 0.1rem 1.5rem;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
}
</style>