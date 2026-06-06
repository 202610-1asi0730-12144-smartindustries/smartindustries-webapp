export class AccessEvent {
  constructor({ id = null, location = '', person = '', status = '', date = '' } = {}) {
    this.id = id
    this.location = location
    this.person = person
    this.status = status
    this.date = date
  }
}
