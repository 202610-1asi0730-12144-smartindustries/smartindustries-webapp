import {Person} from "../domain/model/person.entity.js";

export class PersonAssembler {
    static toEntityFromResource(resource) {
        return new Person(resource);
    }

    static toEntitiesFromResponse(response){
        if(response.status !== 200){
            console.error(`${response.status}, ${response.statusText}`);
            return [];
        }
        let resources = response.data instanceof Array ? response.data : response.data['people'];
        return resources.map(resource => this.toEntityFromResource(resource));
    }
}
