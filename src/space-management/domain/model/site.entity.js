export class Site {
  constructor({ id = null, organizationId = null, name = '', description = '' } = {}) {
    this.id = id
    this.organizationId = organizationId
    this.name = name
    this.description = description
  }
}
