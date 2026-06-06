import {BaseApi} from "../../shared/infrastructure/base-api.js";
import {BaseEndpoint} from "../../shared/infrastructure/base-endpoint.js";

const accessGroupsEndpointPath = import.meta.env.VITE_ACCESS_GROUPS_ENDPOINT_PATH;

export class AccessApi extends BaseApi {
    #accessGroupsEndpoint;

    constructor() {
        super();
        this.#accessGroupsEndpoint = new BaseEndpoint(this, accessGroupsEndpointPath);
    }

    getAccessGroups() {
        return this.#accessGroupsEndpoint.getAll();
    }
}
