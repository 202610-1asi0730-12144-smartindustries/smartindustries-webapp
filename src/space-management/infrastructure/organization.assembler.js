import {Organization} from "../domain/model/organization.entity.js";

export class OrganizationAssembler {
    static toEntityFromResource(resource) {
        return new Organization(resource);
    }

    static toEntitiesFromResponse(response){
        if(response.status !== 200){
            console.error(`${response.status}, ${response.statusText}`);
            return [];
        }
        let resources = response.data instanceof Array ? response.data : response.data['organizations'];
        return resources.map(resource => this.toEntityFromResource(resource));
    }
}