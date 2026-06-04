<script setup>
import {useI18n} from "vue-i18n";
const { locale, availableLocales } = useI18n();

</script>

<template>
  <pv-select-button v-model="locale" :options="availableLocales">
    <template #option="slotProps">
      <span>{{ slotProps.option.toUpperCase() }}</span>
    </template>
  </pv-select-button>
</template>

<style scoped>
.p-selectbutton {
  background: transparent;
  border: none;
  gap: 0.25rem;
}

.p-selectbutton :deep(.p-togglebutton) {
  background: transparent;
  color: rgba(255,255,255,0.7);
  border: 1px solid rgba(255,255,255,0.3);
}

.p-selectbutton :deep(.p-togglebutton:hover) {
  background: rgba(255,255,255,0.1);
  color: #ffffff;
}

.p-selectbutton :deep(.p-togglebutton.p-togglebutton-checked) {
  background: rgba(255,255,255,0.2);
  color: #ffffff;
  border-color: rgba(255,255,255,0.5);
}

.p-selectbutton :deep(.p-togglebutton.p-togglebutton-checked:hover) {
  background: rgba(255,255,255,0.3);
}
</style>