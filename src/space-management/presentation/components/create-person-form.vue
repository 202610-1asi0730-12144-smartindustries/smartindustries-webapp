<script setup>
import { ref, watch } from 'vue'
import useSpaceManagementStore from '../../application/space-management.store.js'

const props = defineProps({
  visible: Boolean,
  organizationId: Number,
  person: { type: Object, default: null }
})
const emit = defineEmits(['update:visible', 'created'])

const spaceManagementStore = useSpaceManagementStore()
const firstName = ref('')
const lastName = ref('')
const identityDocument = ref('')
const loading = ref(false)
const isEditing = ref(false)

watch(() => props.person, (p) => {
  if (p) {
    isEditing.value = true
    firstName.value = p.firstName
    lastName.value = p.lastName
    identityDocument.value = p.identityDocument
  } else {
    isEditing.value = false
    firstName.value = ''
    lastName.value = ''
    identityDocument.value = ''
  }
})

async function onSubmit() {
  loading.value = true
  let result
  if (isEditing.value) {
    result = await spaceManagementStore.updatePerson(
      props.organizationId,
      props.person.id,
      firstName.value,
      lastName.value,
      identityDocument.value
    )
  } else {
    result = await spaceManagementStore.createPerson(
      props.organizationId,
      firstName.value,
      lastName.value,
      identityDocument.value
    )
  }
  loading.value = false
  if (result) {
    firstName.value = ''
    lastName.value = ''
    identityDocument.value = ''
    isEditing.value = false
    emit('created', result)
    emit('update:visible', false)
  }
}

function onCancel() {
  firstName.value = ''
  lastName.value = ''
  identityDocument.value = ''
  isEditing.value = false
  emit('update:visible', false)
}
</script>

<template>
  <pv-dialog :visible="visible" @update:visible="emit('update:visible', $event)"
    :header="isEditing ? 'Edit Person' : 'Add Person'" :modal="true" :closable="true" :style="{ width: '480px' }">
    <div class="form-fields">
      <div class="field-row">
        <div class="field">
          <label>First Name</label>
          <pv-input-text v-model="firstName" placeholder="First name" fluid />
        </div>
        <div class="field">
          <label>Last Name</label>
          <pv-input-text v-model="lastName" placeholder="Last name" fluid />
        </div>
      </div>
      <div class="field">
        <label>Identity Document</label>
        <pv-input-text v-model="identityDocument" placeholder="8-digit identity document" fluid />
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
.field-row {
  display: flex;
  gap: 1rem;
}
.field-row .field {
  flex: 1;
}
</style>
