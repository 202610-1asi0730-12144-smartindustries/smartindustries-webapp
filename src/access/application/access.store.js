import {defineStore} from "pinia";
import {AccessApi} from "../infrastructure/access-api.js";
import {ref} from "vue";
import {AccessGroupAssembler} from "../infrastructure/access-group.assembler.js";

const accessApi = new AccessApi();

const useAccessStore = defineStore('access', () => {
    const accessGroups = ref([]);
    const accessGroupsLoaded = ref(false);

    const errors = ref([]);

    function fetchAccessGroups() {
        accessApi.getAccessGroups().then(response => {
            accessGroups.value = AccessGroupAssembler.toEntitiesFromResponse(response);
            accessGroupsLoaded.value = true;
            console.log(accessGroupsLoaded.value);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    return {
        accessGroups,
        accessGroupsLoaded,
        errors,
        fetchAccessGroups,
    }
})

export default useAccessStore;
