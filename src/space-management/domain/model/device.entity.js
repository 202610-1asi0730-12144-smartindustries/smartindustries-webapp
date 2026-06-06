export class Device {
  constructor({ id = null, name = '', mode = '', status = '', site = '' } = {}) {
    this.id = id
    this.name = name
    this.mode = mode
    this.status = status
    this.site = site
  }
}