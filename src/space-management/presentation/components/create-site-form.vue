<script setup>
import { ref, watch } from 'vue'
import useSpaceManagementStore from '../../application/space-management.store.js'

const props = defineProps({
  visible: Boolean,
  organizationId: Number,
  site: { type: Object, default: null }
})
const emit = defineEmits(['update:visible', 'created'])

const spaceManagementStore = useSpaceManagementStore()
const name = ref('')
const description = ref('')
const loading = ref(false)
const isEditing = ref(false)

watch(() => props.site, (s) => {
  if (s) {
    isEditing.value = true
    name.value = s.name
    description.value = s.description
  } else {
    isEditing.value = false
    name.value = ''
    description.value = ''
  }
})

async function onSubmit() {
  loading.value = true
  let result
  if (isEditing.value) {
    result = await spaceManagementStore.updateSite(
      props.organizationId,
      props.site.id,
      name.value,
      description.value
    )
  } else {
    result = await spaceManagementStore.createSite(
      props.organizationId,
      name.value,
      description.value
    )
  }
  loading.value = false
  if (result) {
    name.value = ''
    description.value = ''
    isEditing.value = false
    emit('created', result)
    emit('update:visible', false)
  }
}

function onCancel() {
  name.value = ''
  description.value = ''
  isEditing.value = false
  emit('update:visible', false)
}
</script>

<template>
  <pv-dialog :visible="visible" @update:visible="emit('update:visible', $event)"
    :header="isEditing ? 'Edit Site' : 'Create Site'" :modal="true" :closable="true" :style="{ width: '480px' }">
    <div class="form-fields">
      <div class="field">
        <label>Name</label>
        <pv-input-text v-model="name" placeholder="Site name" fluid />
      </div>
      <div class="field">
        <label>Description</label>
        <pv-textarea v-model="description" placeholder="Description (optional)" rows="3" fluid />
      </div>
    </div>
    <template #footer>
      <pv-button label="Cancel" severity="secondary" @click="onCancel" />
      <pv-button :label="isEditing ? 'Save' : 'Create'" :loading="loading" @click="onSubmit" />
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
