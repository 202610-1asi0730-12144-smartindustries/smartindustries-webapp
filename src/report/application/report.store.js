import {defineStore} from "pinia";
import {ReportApi} from "../infrastructure/report-api.js";
import {ref} from "vue";
import {AccessEventAssembler} from "../infrastructure/access-event.assembler.js";

const reportApi = new ReportApi();

const useReportStore = defineStore('report', () => {
    const accessEvents = ref([]);
    const accessEventsLoaded = ref(false);

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

    return {
        accessEvents,
        accessEventsLoaded,
        errors,
        fetchAccessEvents,
    }
})

export default useReportStore;
