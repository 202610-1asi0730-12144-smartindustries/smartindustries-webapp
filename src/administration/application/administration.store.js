import {defineStore} from "pinia";
import {AdministrationApi} from "../infrastructure/administration-api.js";
import {ref} from "vue";
import {AdministratorAssembler} from "../infrastructure/administrator.assembler.js";
import {RoleAssembler} from "../infrastructure/role.assembler.js";

const administrationApi = new AdministrationApi();

const useAdministrationStore = defineStore('administration', () => {
    const administrators = ref([]);
    const administratorsLoaded = ref(false);

    const roles = ref([]);
    const rolesLoaded = ref(false);

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

    function fetchRoles() {
        administrationApi.getRoles().then(response => {
            roles.value = RoleAssembler.toEntitiesFromResponse(response);
            rolesLoaded.value = true;
            console.log(rolesLoaded.value);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    return {
        administrators,
        administratorsLoaded,
        roles,
        rolesLoaded,
        errors,
        fetchAdministrators,
        fetchRoles,
    }
})

export default useAdministrationStore;
