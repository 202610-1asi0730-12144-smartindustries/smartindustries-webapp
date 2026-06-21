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
}
