import {Administrator} from "../domain/model/administrator.entity.js";

export class AdministratorAssembler {
    static toEntityFromResource(resource) {
        return new Administrator(resource);
    }

    static toEntitiesFromResponse(response){
        if(response.status !== 200){
            console.error(`${response.status}, ${response.statusText}`);
            return [];
        }
        let resources = response.data instanceof Array ? response.data : response.data['administrators'];
        return resources.map(resource => this.toEntityFromResource(resource));
    }
}
