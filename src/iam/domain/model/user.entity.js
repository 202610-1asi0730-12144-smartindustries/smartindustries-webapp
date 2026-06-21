export class User {
  constructor({ id = null, firstName = '', lastName = '', email = '' } = {}) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }
}
