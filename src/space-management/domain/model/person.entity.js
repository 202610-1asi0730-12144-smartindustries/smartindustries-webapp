export class Person {
  constructor({ id = null, name = '', currentLocation = '', status = '' } = {}) {
    this.id = id
    this.name = name
    this.currentLocation = currentLocation
    this.status = status
  }
}
