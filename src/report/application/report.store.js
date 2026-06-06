import {defineStore} from "pinia";
import {ReportApi} from "../infrastructure/report-api.js";
import {ref} from "vue";
import {AccessEventAssembler} from "../infrastructure/access-event.assembler.js";
import {AlertAssembler} from "../infrastructure/alert.assembler.js";

const reportApi = new ReportApi();

const useReportStore = defineStore('report', () => {
    const accessEvents = ref([]);
    const accessEventsLoaded = ref(false);
    
    const alerts = ref([]);
    const alertsLoaded = ref(false);

    const errors = ref([]);

    function fetchAccessEvents() {
        reportApi.getAccessEvents().then(response => {
            accessEvents.value = AccessEventAssembler.toEntitiesFromResponse(response);
            accessEventsLoaded.value = true;
            console.log(accessEventsLoaded.value);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    function fetchAlerts() {
        reportApi.getAlerts().then(response => {
            alerts.value = AlertAssembler.toEntitiesFromResponse(response);
            alertsLoaded.value = true;
            console.log(alertsLoaded.value);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    return {
        accessEvents,
        accessEventsLoaded,
        alerts,
        alertsLoaded,
        errors,
        fetchAccessEvents,
        fetchAlerts,
    }
})

export default useReportStore;
