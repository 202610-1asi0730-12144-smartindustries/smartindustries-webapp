<script setup>
import LanguageSwitcher from "./language-switcher.vue";
</script>

<template>
  <pv-menubar>
    <template #start>
      <span class="text-2xl font-bold mx-3" style="color: #fff">SmartLock</span>
    </template>
    <template #end>
      <language-switcher class="mr-3"/>
      <pv-button icon="pi pi-user" rounded text />
    </template>
  </pv-menubar>
  <router-view/>
</template>

<style scoped>
.p-menubar {
  background: #3893DD;
  height: 4rem;
  padding: 0 1rem;
  border: none;
  border-radius: 0;
}

.p-menubar :deep(.p-button) {
  color: #ffffff;
}
</style>