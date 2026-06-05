<template>
  <div class="search-bar">
    <pv-icon-field icon-position="left">
      <pv-input-icon>
        <i class="pi pi-search" />
      </pv-input-icon>
      <pv-input-text placeholder="Search..." />
    </pv-icon-field>
  </div>
</template>

<style scoped>
.search-bar :deep(.p-inputtext) {
  border-radius: 999px;
  background: #f5f5f5;
}
</style>
