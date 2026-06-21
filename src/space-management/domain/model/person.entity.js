export class Person {
  constructor({ id = null, organizationId = null, firstName = '', lastName = '', identityDocument = '' } = {}) {
    this.id = id
    this.organizationId = organizationId
    this.firstName = firstName
    this.lastName = lastName
    this.identityDocument = identityDocument
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }
}
