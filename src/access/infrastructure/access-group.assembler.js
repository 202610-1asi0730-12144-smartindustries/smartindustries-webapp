import {AccessGroup} from "../domain/model/access-group.entity.js";

export class AccessGroupAssembler {
    static toEntityFromResource(resource) {
        return new AccessGroup(resource);
    }

    static toEntitiesFromResponse(response){
        if(response.status !== 200){
            console.error(`${response.status}, ${response.statusText}`);
            return [];
        }
        let resources = response.data instanceof Array ? response.data : response.data['access-groups'];
        return resources.map(resource => this.toEntityFromResource(resource));
    }
}
