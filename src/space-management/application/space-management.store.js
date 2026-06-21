import { defineStore } from "pinia";
import { SpaceManagementApi } from "../infrastructure/space-management-api.js";
import { ref } from "vue";
import { OrganizationAssembler } from "../infrastructure/organization.assembler.js";
import { PersonAssembler } from "../infrastructure/person.assembler.js";
import { DeviceAssembler } from "../infrastructure/device.assembler.js";
import { SiteAssembler } from "../infrastructure/site.assembler.js";

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

    async function fetchOrganizations() {
        try {
            const response = await spaceManagementApi.getOrganizations();
            organizations.value = OrganizationAssembler.toEntitiesFromResponse(response);
            organizationsLoaded.value = true;
        } catch (error) {
            errors.value.push(error);
        }
    }

    async function fetchPeople(organizationId) {
        try {
            const response = await spaceManagementApi.getPeople(organizationId);
            people.value = PersonAssembler.toEntitiesFromResponse(response);
            peopleLoaded.value = true;
        } catch (error) {
            errors.value.push(error);
        }
    }

    async function fetchDevices(organizationId) {
        try {
            const response = await spaceManagementApi.getDevices(organizationId);
            devices.value = DeviceAssembler.toEntitiesFromResponse(response);
            devicesLoaded.value = true;
        } catch (error) {
            errors.value.push(error);
        }
    }

    async function createOrganization(name, description) {
        try {
            const response = await spaceManagementApi.createOrganization({ name, description });
            const org = OrganizationAssembler.toEntityFromResource(response.data);
            organizations.value.unshift(org);
            return org;
        } catch (error) {
            errors.value.push(error);
            return null;
        }
    }

    async function createPerson(organizationId, firstName, lastName, identityDocument) {
        try {
            const response = await spaceManagementApi.createPerson(organizationId, { firstName, lastName, identityDocument });
            const person = PersonAssembler.toEntityFromResource(response.data);
            people.value.unshift(person);
            return person;
        } catch (error) {
            errors.value.push(error);
            return null;
        }
    }

    async function createDevice(siteId, name, mode) {
        try {
            const response = await spaceManagementApi.createDevice(siteId, { name, mode });
            const device = DeviceAssembler.toEntityFromResource(response.data);
            devices.value.unshift(device);
            return device;
        } catch (error) {
            errors.value.push(error);
            return null;
        }
    }

    async function createSite(organizationId, name, description) {
        try {
            const response = await spaceManagementApi.createSite(organizationId, { name, description });
            const site = SiteAssembler.toEntityFromResource(response.data);
            sites.value.unshift(site);
            return site;
        } catch (error) {
            errors.value.push(error);
            return null;
        }
    }

    async function fetchSites(organizationId) {
        try {
            const response = await spaceManagementApi.getSites(organizationId);
            sites.value = SiteAssembler.toEntitiesFromResponse(response);
            sitesLoaded.value = true;
        } catch (error) {
            errors.value.push(error);
        }
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
        createOrganization,
        createPerson,
        createDevice,
        createSite,
    }
})

export default useSpaceManagementStore;
