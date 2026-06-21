import { defineStore } from "pinia";
import { AdministrationApi } from "../infrastructure/administration-api.js";
import { ref } from "vue";
import { RoleAssembler } from "../infrastructure/role.assembler.js";

const administrationApi = new AdministrationApi();

const useAdministrationStore = defineStore('administration', () => {
    const administrators = ref([]);
    const administratorsLoaded = ref(false);

    const roles = ref([]);
    const rolesLoaded = ref(false);

    const errors = ref([]);

    async function fetchAdministrators(organizationId) {
        try {
            const response = await administrationApi.getAdministrators(organizationId);
            administrators.value = response.data.map(r => ({
                userId: r.userId || r.id,
                email: r.email || '',
                firstName: r.firstName || '',
                lastName: r.lastName || '',
                roleId: r.roleId,
                roleName: r.roleName || ''
            }));
            administratorsLoaded.value = true;
        } catch (error) {
            errors.value.push(error);
        }
    }

    async function fetchRoles(organizationId) {
        try {
            const response = await administrationApi.getRoles(organizationId);
            roles.value = RoleAssembler.toEntitiesFromResponse(response);
            rolesLoaded.value = true;
        } catch (error) {
            errors.value.push(error);
        }
    }

    async function createRole(organizationId, name, canCreateSites, canCreatePeople, canConnectDevices) {
        try {
            const response = await administrationApi.addRole(organizationId, { name, canCreateSites, canCreatePeople, canConnectDevices });
            const role = RoleAssembler.toEntityFromResource(response.data);
            roles.value.unshift(role);
            return role;
        } catch (error) {
            errors.value.push(error);
            return null;
        }
    }

    async function updateRole(organizationId, roleId, name, canCreateSites, canCreatePeople, canConnectDevices) {
        try {
            const response = await administrationApi.updateRole(organizationId, roleId, { name, canCreateSites, canCreatePeople, canConnectDevices });
            const updated = RoleAssembler.toEntityFromResource(response.data);
            const index = roles.value.findIndex(r => r.id === roleId);
            if (index !== -1) roles.value[index] = updated;
            return updated;
        } catch (error) {
            errors.value.push(error);
            return null;
        }
    }

    return {
        administrators,
        administratorsLoaded,
        roles,
        rolesLoaded,
        errors,
        fetchAdministrators,
        fetchRoles,
        createRole,
        updateRole,
    }
})

export default useAdministrationStore;
