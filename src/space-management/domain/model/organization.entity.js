export class Organization {
  constructor({ id = null, name = '', owner = '', description = '' }) {
    this.id = id
    this.name = name
    this.owner = owner
    this.description = description
  }
}
