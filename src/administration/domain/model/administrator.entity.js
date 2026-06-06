export class Administrator {
  constructor({ id = null, name = '', role = '', status = '' } = {}) {
    this.id = id
    this.name = name
    this.role = role
    this.status = status
  }
}
