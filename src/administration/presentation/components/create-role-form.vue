<script setup>
import { ref, watch } from 'vue'
import useAdministrationStore from '../../application/administration.store.js'

const props = defineProps({
  visible: Boolean,
  organizationId: Number,
  role: { type: Object, default: null }
})
const emit = defineEmits(['update:visible', 'created'])

const administrationStore = useAdministrationStore()
const name = ref('')
const canCreateSites = ref(false)
const canCreatePeople = ref(false)
const canConnectDevices = ref(false)
const loading = ref(false)
const isEditing = ref(false)

watch(() => props.role, (r) => {
  if (r) {
    isEditing.value = true
    name.value = r.name
    canCreateSites.value = r.canCreateSites
    canCreatePeople.value = r.canCreatePeople
    canConnectDevices.value = r.canConnectDevices
  } else {
    isEditing.value = false
    name.value = ''
    canCreateSites.value = false
    canCreatePeople.value = false
    canConnectDevices.value = false
  }
})

async function onSubmit() {
  loading.value = true
  let result
  if (isEditing.value) {
    result = await administrationStore.updateRole(
      props.organizationId,
      props.role.id,
      name.value,
      canCreateSites.value,
      canCreatePeople.value,
      canConnectDevices.value
    )
  } else {
    result = await administrationStore.createRole(
      props.organizationId,
      name.value,
      canCreateSites.value,
      canCreatePeople.value,
      canConnectDevices.value
    )
  }
  loading.value = false
  if (result) {
    name.value = ''
    canCreateSites.value = false
    canCreatePeople.value = false
    canConnectDevices.value = false
    isEditing.value = false
    emit('created', result)
    emit('update:visible', false)
  }
}

function onCancel() {
  name.value = ''
  canCreateSites.value = false
  canCreatePeople.value = false
  canConnectDevices.value = false
  isEditing.value = false
  emit('update:visible', false)
}
</script>

<template>
  <pv-dialog :visible="visible" @update:visible="emit('update:visible', $event)"
    :header="isEditing ? 'Edit Role' : 'Create Role'" :modal="true" :closable="true" :style="{ width: '480px' }">
    <div class="form-fields">
      <div class="field">
        <label>Role Name</label>
        <pv-input-text v-model="name" placeholder="Role name" fluid />
      </div>
      <div class="field">
        <label>Permissions</label>
        <div class="permissions">
          <pv-checkbox v-model="canCreateSites" :binary="true" inputId="canCreateSites" />
          <label for="canCreateSites">Can create sites</label>
        </div>
        <div class="permissions">
          <pv-checkbox v-model="canCreatePeople" :binary="true" inputId="canCreatePeople" />
          <label for="canCreatePeople">Can create people</label>
        </div>
        <div class="permissions">
          <pv-checkbox v-model="canConnectDevices" :binary="true" inputId="canConnectDevices" />
          <label for="canConnectDevices">Can connect devices</label>
        </div>
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
.permissions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.permissions label {
  font-weight: 400;
  font-size: 0.875rem;
}
</style>
