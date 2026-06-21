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
}
