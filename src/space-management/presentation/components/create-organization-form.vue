<script setup>
import { ref } from 'vue'
import useSpaceManagementStore from '../../../space-management/application/space-management.store.js'

const props = defineProps({ visible: Boolean })
const emit = defineEmits(['update:visible', 'created'])

const spaceManagementStore = useSpaceManagementStore()
const name = ref('')
const description = ref('')
const loading = ref(false)

async function onSubmit() {
  loading.value = true
  const org = await spaceManagementStore.createOrganization(name.value, description.value)
  loading.value = false
  if (org) {
    name.value = ''
    description.value = ''
    emit('created', org)
    emit('update:visible', false)
  }
}

function onCancel() {
  name.value = ''
  description.value = ''
  emit('update:visible', false)
}
</script>

<template>
  <pv-dialog :visible="visible" @update:visible="emit('update:visible', $event)"
    header="Create Organization" :modal="true" :closable="true" :style="{ width: '480px' }">
    <div class="form-fields">
      <div class="field">
        <label>Name</label>
        <pv-input-text v-model="name" placeholder="Organization name" fluid />
      </div>
      <div class="field">
        <label>Description</label>
        <pv-textarea v-model="description" placeholder="Description (optional)" rows="3" fluid />
      </div>
    </div>
    <template #footer>
      <pv-button label="Cancel" severity="secondary" @click="onCancel" />
      <pv-button label="Create" :loading="loading" @click="onSubmit" />
    </template>
  </pv-dialog>
</template>

<style scoped>
.form-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.field label {
  font-weight: 500;
  font-size: 0.875rem;
}
</style>
