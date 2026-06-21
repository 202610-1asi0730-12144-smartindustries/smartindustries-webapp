import { BaseApi } from "../../shared/infrastructure/base-api.js";

export class AccessApi extends BaseApi {

    constructor() {
        super();
    }

    getAccessGroups(organizationId) {
        return this.http.get(`/organizations/${organizationId}/access-groups`);
    }

    createAccessGroup(organizationId, resource) {
        return this.http.post(`/organizations/${organizationId}/access-groups`, resource);
    }
}
