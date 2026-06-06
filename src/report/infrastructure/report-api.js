import {BaseApi} from "../../shared/infrastructure/base-api.js";
import {BaseEndpoint} from "../../shared/infrastructure/base-endpoint.js";

const accessEventsEndpointPath = import.meta.env.VITE_ACCESS_EVENTS_ENDPOINT_PATH;
const alertsEndpointPath = import.meta.env.VITE_ALERTS_ENDPOINT_PATH;

export class ReportApi extends BaseApi {
    #accessEventsEndpoint;
    #alertsEndpoint;

    constructor() {
        super();
        this.#accessEventsEndpoint = new BaseEndpoint(this, accessEventsEndpointPath);
        this.#alertsEndpoint = new BaseEndpoint(this, alertsEndpointPath);
    }

    getAccessEvents() {
        return this.#accessEventsEndpoint.getAll();
    }

    getAlerts() {
        return this.#alertsEndpoint.getAll();
    }
}
