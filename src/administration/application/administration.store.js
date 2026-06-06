import {defineStore} from "pinia";
import {AdministrationApi} from "../infrastructure/administration-api.js";
import {ref} from "vue";
import {AdministratorAssembler} from "../infrastructure/administrator.assembler.js";

const administrationApi = new AdministrationApi();

const useAdministrationStore = defineStore('administration', () => {
    const administrators = ref([]);
    const administratorsLoaded = ref(false);

    const errors = ref([]);

    function fetchAdministrators() {
        administrationApi.getAdministrators().then(response => {
            administrators.value = AdministratorAssembler.toEntitiesFromResponse(response);
            administratorsLoaded.value = true;
            console.log(administratorsLoaded.value);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    return {
        administrators,
        administratorsLoaded,
        errors,
        fetchAdministrators,
    }
})

export default useAdministrationStore;
