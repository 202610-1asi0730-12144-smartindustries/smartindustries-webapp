import {BaseApi} from "../../shared/infrastructure/base-api.js";
import {BaseEndpoint} from "../../shared/infrastructure/base-endpoint.js";

const administratorsEndpointPath = import.meta.env.VITE_ADMINISTRATORS_ENDPOINT_PATH;
const rolesEndpointPath = import.meta.env.VITE_ROLES_ENDPOINT_PATH;

export class AdministrationApi extends BaseApi {
    #administratorsEndpoint;
    #rolesEndpoint;

    constructor() {
        super();
        this.#administratorsEndpoint = new BaseEndpoint(this, administratorsEndpointPath);
        this.#rolesEndpoint = new BaseEndpoint(this, rolesEndpointPath);
    }

    getAdministrators() {
        return this.#administratorsEndpoint.getAll();
    }

    getRoles() {
        return this.#rolesEndpoint.getAll();
    }
}
