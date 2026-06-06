import {Site} from "../domain/model/site.entity.js";

export class SiteAssembler {
    static toEntityFromResource(resource) {
        return new Site(resource);
    }

    static toEntitiesFromResponse(response){
        if(response.status !== 200){
            console.error(`${response.status}, ${response.statusText}`);
            return [];
        }
        let resources = response.data instanceof Array ? response.data : response.data['sites'];
        return resources.map(resource => this.toEntityFromResource(resource));
    }
}
