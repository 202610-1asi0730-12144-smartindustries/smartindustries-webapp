import {defineStore} from "pinia";
import {SpaceManagementApi} from "../infrastructure/space-management-api.js";
import {ref} from "vue";
import {OrganizationAssembler} from "../infrastructure/organization.assembler.js";
import {PersonAssembler} from "../infrastructure/person.assembler.js";
import {DeviceAssembler} from "../infrastructure/device.assembler.js";
import {SiteAssembler} from "../infrastructure/site.assembler.js";

const spaceManagementApi = new SpaceManagementApi();

const useSpaceManagementStore = defineStore('space-management', () => {
    const organizations = ref([]);
    const organizationsLoaded = ref(false);

    const people = ref([]);
    const peopleLoaded = ref(false);

    const devices = ref([]);
    const devicesLoaded = ref(false);

    const sites = ref([]);
    const sitesLoaded = ref(false);

    const errors = ref([]);

    function fetchOrganizations() {
        spaceManagementApi.getOrganizations().then(response => {
            organizations.value = OrganizationAssembler.toEntitiesFromResponse(response);
            organizationsLoaded.value = true;
            console.log(organizationsLoaded.value);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    function fetchPeople() {
        spaceManagementApi.getPeople().then(response => {
            people.value = PersonAssembler.toEntitiesFromResponse(response);
            peopleLoaded.value = true;
            console.log(peopleLoaded.value);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    function fetchDevices() {
        spaceManagementApi.getDevices().then(response => {
            devices.value = DeviceAssembler.toEntitiesFromResponse(response);
            devicesLoaded.value = true;
            console.log(devicesLoaded.value);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    function fetchSites() {
        spaceManagementApi.getSites().then(response => {
            sites.value = SiteAssembler.toEntitiesFromResponse(response);
            sitesLoaded.value = true;
            console.log(sitesLoaded.value);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    return {
        organizations,
        organizationsLoaded,
        people,
        peopleLoaded,
        devices,
        devicesLoaded,
        sites,
        sitesLoaded,
        errors,
        fetchOrganizations,
        fetchPeople,
        fetchDevices,
        fetchSites,
    }
})

export default useSpaceManagementStore;