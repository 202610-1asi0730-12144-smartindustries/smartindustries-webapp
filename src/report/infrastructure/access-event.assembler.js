import {AccessEvent} from "../domain/model/access-event.entity.js";

export class AccessEventAssembler {
    static toEntityFromResource(resource) {
        return new AccessEvent(resource);
    }

    static toEntitiesFromResponse(response){
        if(response.status !== 200){
            console.error(`${response.status}, ${response.statusText}`);
            return [];
        }
        let resources = response.data instanceof Array ? response.data : response.data['access-events'];
        return resources.map(resource => this.toEntityFromResource(resource));
    }
}
