import { BaseApi } from "../../shared/infrastructure/base-api.js";
import { BaseEndpoint } from "../../shared/infrastructure/base-endpoint.js";

const organizationsEndpointPath = import.meta.env.VITE_ORGANIZATIONS_ENDPOINT_PATH;

export class SpaceManagementApi extends BaseApi {
    #organizationsEndpoint;

    constructor() {
        super();
        this.#organizationsEndpoint = new BaseEndpoint(this, organizationsEndpointPath);
    }

    getOrganizations() {
        return this.#organizationsEndpoint.getAll();
    }

    getPeople(organizationId) {
        return this.http.get(`/organizations/${organizationId}/people`);
    }

    getDevices(organizationId) {
        return this.http.get(`/organizations/${organizationId}/devices`);
    }

    getSites(organizationId) {
        return this.http.get(`/organizations/${organizationId}/sites`);
    }

    createOrganization(resource) {
        return this.http.post('/organizations', resource);
    }

    createPerson(organizationId, resource) {
        return this.http.post(`/organizations/${organizationId}/people`, resource);
    }

    createDevice(siteId, resource) {
        return this.http.post(`/sites/${siteId}/devices`, resource);
    }

    createSite(organizationId, resource) {
        return this.http.post(`/organizations/${organizationId}/sites`, resource);
    }

    updateDevice(siteId, deviceId, resource) {
        return this.http.put(`/sites/${siteId}/devices/${deviceId}`, resource);
    }

    deleteDevice(siteId, deviceId) {
        return this.http.delete(`/sites/${siteId}/devices/${deviceId}`);
    }

    updatePerson(organizationId, personId, resource) {
        return this.http.put(`/organizations/${organizationId}/people/${personId}`, resource);
    }

    deletePerson(organizationId, personId) {
        return this.http.delete(`/organizations/${organizationId}/people/${personId}`);
    }
}
