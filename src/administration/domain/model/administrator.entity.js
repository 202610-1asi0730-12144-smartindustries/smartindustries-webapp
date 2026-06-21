export class Administrator {
  constructor({ userId = null, email = '', firstName = '', lastName = '', roleId = null, roleName = '' } = {}) {
    this.userId = userId
    this.email = email
    this.firstName = firstName
    this.lastName = lastName
    this.roleId = roleId
    this.roleName = roleName
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }
}
