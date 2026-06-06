import {defineStore} from "pinia";
import {SpaceManagementApi} from "../infrastructure/space-management-api.js";
import {ref} from "vue";
import {OrganizationAssembler} from "../infrastructure/organization.assembler.js";

const spaceManagementApi = new SpaceManagementApi();

const useSpaceManagementStore = defineStore('space-management', () => {
    const organizations = ref([]);
    const organizationsLoaded = ref(false);

    const errors = ref([]);

    function fetchOrganizations() {
        spaceManagementApi.getOrganizations().then(response => {
            organizations.value = OrganizationAssembler.toEntitiesFromResponse(response);
            organizationsLoaded.value = true;
            console.log(organizationsLoaded.value);
            console.log(organizationsLoaded.value);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    return {
        organizations
    }
})