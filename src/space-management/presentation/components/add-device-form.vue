<script setup>
import { ref, watch } from 'vue'
import useSpaceManagementStore from '../../application/space-management.store.js'

const props = defineProps({
  visible: Boolean,
  organizationId: Number
})
const emit = defineEmits(['update:visible', 'created'])

const spaceManagementStore = useSpaceManagementStore()

const siteId = ref(null)
const name = ref('')
const mode = ref('')
const loading = ref(false)
const modeOptions = ['Free', 'Blocked', 'Security']

watch(() => props.visible, (newVal) => {
  if (newVal && spaceManagementStore.sites.length === 0 && props.organizationId) {
    spaceManagementStore.fetchSites(props.organizationId)
  }
})

async function onSubmit() {
  loading.value = true
  const device = await spaceManagementStore.createDevice(
    siteId.value,
    name.value,
    mode.value
  )
  loading.value = false
  if (device) {
    siteId.value = null
    name.value = ''
    mode.value = ''
    emit('created', device)
    emit('update:visible', false)
  }
}

function onCancel() {
  siteId.value = null
  name.value = ''
  mode.value = ''
  emit('update:visible', false)
}
</script>

<template>
  <pv-dialog :visible="visible" @update:visible="emit('update:visible', $event)"
    header="Add Device" :modal="true" :closable="true" :style="{ width: '480px' }">
    <div class="form-fields">
      <div class="field">
        <label>Site</label>
        <pv-select v-model="siteId" :options="spaceManagementStore.sites" optionLabel="name" optionValue="id" placeholder="Select a site" fluid />
      </div>
      <div class="field">
        <label>Name</label>
        <pv-input-text v-model="name" placeholder="Device name" fluid />
      </div>
      <div class="field">
        <label>Mode</label>
        <pv-select v-model="mode" :options="modeOptions" placeholder="Select mode" fluid />
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
