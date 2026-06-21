import { defineStore } from "pinia";
import { ref } from "vue";

const SELECTED_ORG_KEY = "smartlock-selected-org";

const useOrganizationStore = defineStore('organization', () => {
    const selectedOrganizationId = ref(loadSelectedOrganizationId());

    function loadSelectedOrganizationId() {
        const stored = localStorage.getItem(SELECTED_ORG_KEY);
        return stored ? Number(stored) : null;
    }

    function selectOrganization(organizationId) {
        selectedOrganizationId.value = organizationId;
        localStorage.setItem(SELECTED_ORG_KEY, String(organizationId));
    }

    function clearSelection() {
        selectedOrganizationId.value = null;
        localStorage.removeItem(SELECTED_ORG_KEY);
    }

    return {
        selectedOrganizationId,
        selectOrganization,
        clearSelection,
    }
})

export default useOrganizationStore;
