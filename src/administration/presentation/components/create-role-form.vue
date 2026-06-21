<script setup>
import { ref } from 'vue'
import useAdministrationStore from '../../application/administration.store.js'

const props = defineProps({ visible: Boolean, organizationId: Number })
const emit = defineEmits(['update:visible', 'created'])

const administrationStore = useAdministrationStore()
const name = ref('')
const canCreateSites = ref(false)
const canCreatePeople = ref(false)
const canConnectDevices = ref(false)
const loading = ref(false)

async function onSubmit() {
  loading.value = true
  const role = await administrationStore.createRole(
    props.organizationId,
    name.value,
    canCreateSites.value,
    canCreatePeople.value,
    canConnectDevices.value
  )
  loading.value = false
  if (role) {
    name.value = ''
    canCreateSites.value = false
    canCreatePeople.value = false
    canConnectDevices.value = false
    emit('created', role)
    emit('update:visible', false)
  }
}

function onCancel() {
  name.value = ''
  canCreateSites.value = false
  canCreatePeople.value = false
  canConnectDevices.value = false
  emit('update:visible', false)
}
</script>

<template>
  <pv-dialog :visible="visible" @update:visible="emit('update:visible', $event)"
    header="Create Role" :modal="true" :closable="true" :style="{ width: '480px' }">
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
