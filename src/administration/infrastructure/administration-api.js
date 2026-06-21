import { BaseApi } from "../../shared/infrastructure/base-api.js";

export class AdministrationApi extends BaseApi {

    constructor() {
        super();
    }

    getAdministrators(organizationId) {
        return this.http.get(`/organizations/${organizationId}/users`);
    }

    getRoles(organizationId) {
        return this.http.get(`/organizations/${organizationId}/roles`);
    }

    addRole(organizationId, resource) {
        return this.http.post(`/organizations/${organizationId}/roles`, resource);
    }

    updateRole(organizationId, roleId, resource) {
        return this.http.put(`/organizations/${organizationId}/roles/${roleId}`, resource);
    }
}
