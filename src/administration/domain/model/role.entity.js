export class Role {
  constructor({
    id = null,
    organizationId = null,
    name = '',
    canCreateSites = false,
    canCreatePeople = false,
    canConnectDevices = false,
    deletable = false
  } = {}) {
    this.id = id
    this.organizationId = organizationId
    this.name = name
    this.canCreateSites = canCreateSites
    this.canCreatePeople = canCreatePeople
    this.canConnectDevices = canConnectDevices
    this.deletable = deletable
  }
}
