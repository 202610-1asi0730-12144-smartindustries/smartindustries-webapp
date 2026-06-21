export class AuthenticatedUser {
  constructor({ id = null, firstName = '', lastName = '', email = '', token = '' } = {}) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.token = token
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }
}
