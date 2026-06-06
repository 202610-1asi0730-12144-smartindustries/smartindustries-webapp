import {BaseApi} from "../../shared/infrastructure/base-api.js";
import {BaseEndpoint} from "../../shared/infrastructure/base-endpoint.js";

const organizationsEndpointPath = import.meta.env.VITE_ORGANIZATIONS_ENDPOINT_PATH;
const peopleEndpointPath = import.meta.env.VITE_PEOPLE_ENDPOINT_PATH;
const devicesEndpointPath = import.meta.env.VITE_DEVICES_ENDPOINT_PATH;
const sitesEndpointPath = import.meta.env.VITE_SITES_ENDPOINT_PATH;

export class SpaceManagementApi extends BaseApi {
    #organizationsEndpoint;
    #peopleEndpoint;
    #devicesEndpoint;
    #sitesEndpoint;

    constructor() {
        super();
        this.#organizationsEndpoint = new BaseEndpoint(this, organizationsEndpointPath);
        this.#peopleEndpoint = new BaseEndpoint(this, peopleEndpointPath);
        this.#devicesEndpoint = new BaseEndpoint(this, devicesEndpointPath);
        this.#sitesEndpoint = new BaseEndpoint(this, sitesEndpointPath);
    }

    getOrganizations() {
        return this.#organizationsEndpoint.getAll();
    }

    getPeople() {
        return this.#peopleEndpoint.getAll();
    }

    getDevices() {
        return this.#devicesEndpoint.getAll();
    }

    getSites() {
        return this.#sitesEndpoint.getAll();
    }
}