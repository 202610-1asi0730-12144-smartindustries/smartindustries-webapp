import {BaseApi} from "../../shared/infrastructure/base-api.js";
import {BaseEndpoint} from "../../shared/infrastructure/base-endpoint.js";

const administratorsEndpointPath = import.meta.env.VITE_ADMINISTRATORS_ENDPOINT_PATH;

export class AdministrationApi extends BaseApi {
    #administratorsEndpoint;

    constructor() {
        super();
        this.#administratorsEndpoint = new BaseEndpoint(this, administratorsEndpointPath);
    }

    getAdministrators() {
        return this.#administratorsEndpoint.getAll();
    }
}
