<script setup>
import { useRouter } from 'vue-router'
import { useIamStore } from '../../../iam/application/iam.store.js'
import LanguageSwitcher from "./language-switcher.vue";

const router = useRouter()
const iamStore = useIamStore()

function signOut() {
  iamStore.signOut()
  router.push('/auth/sign-in')
}
</script>

<template>
  <pv-menubar>
    <template #start>
      <span class="text-2xl font-bold mx-3" style="color: #fff">SmartLock</span>
    </template>
    <template #end>
      <language-switcher class="mr-3"/>
      <span v-if="iamStore.currentUser" class="text-white mr-2 text-sm">
        {{ iamStore.currentUser.fullName }}
      </span>
      <pv-button v-if="iamStore.currentUser" icon="pi pi-sign-out" rounded text @click="signOut" title="Sign Out" />
      <pv-button v-else icon="pi pi-user" rounded text />
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