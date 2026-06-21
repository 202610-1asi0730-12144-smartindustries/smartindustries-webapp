export class Device {
  constructor({ id = null, siteId = null, name = '', mode = '', status = '' } = {}) {
    this.id = id
    this.siteId = siteId
    this.name = name
    this.mode = mode
    this.status = status
  }
}
