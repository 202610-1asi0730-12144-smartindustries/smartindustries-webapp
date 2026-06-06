import {BaseApi} from "../../shared/infrastructure/base-api.js";
import {BaseEndpoint} from "../../shared/infrastructure/base-endpoint.js";

const accessEventsEndpointPath = import.meta.env.VITE_ACCESS_EVENTS_ENDPOINT_PATH;

export class ReportApi extends BaseApi {
    #accessEventsEndpoint;

    constructor() {
        super();
        this.#accessEventsEndpoint = new BaseEndpoint(this, accessEventsEndpointPath);
    }

    getAccessEvents() {
        return this.#accessEventsEndpoint.getAll();
    }
}
