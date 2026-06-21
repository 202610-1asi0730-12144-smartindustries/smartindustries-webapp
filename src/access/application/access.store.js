import { defineStore } from "pinia";
import { AccessApi } from "../infrastructure/access-api.js";
import { ref } from "vue";
import { AccessGroupAssembler } from "../infrastructure/access-group.assembler.js";

const accessApi = new AccessApi();

const useAccessStore = defineStore('access', () => {
    const accessGroups = ref([]);
    const accessGroupsLoaded = ref(false);

    const errors = ref([]);

    async function fetchAccessGroups(organizationId) {
        try {
            const response = await accessApi.getAccessGroups(organizationId);
            accessGroups.value = AccessGroupAssembler.toEntitiesFromResponse(response);
            accessGroupsLoaded.value = true;
        } catch (error) {
            errors.value.push(error);
        }
    }

    async function createAccessGroup(organizationId, name, description) {
        try {
            const response = await accessApi.createAccessGroup(organizationId, { name, description });
            const group = AccessGroupAssembler.toEntityFromResource(response.data);
            accessGroups.value.unshift(group);
            return group;
        } catch (error) {
            errors.value.push(error);
            return null;
        }
    }

    return {
        accessGroups,
        accessGroupsLoaded,
        errors,
        fetchAccessGroups,
        createAccessGroup,
    }
})

export default useAccessStore;
