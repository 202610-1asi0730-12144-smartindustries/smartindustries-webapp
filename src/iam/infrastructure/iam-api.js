import { BaseApi } from "../../shared/infrastructure/base-api.js"

export class IamApi extends BaseApi {
  async signIn(credentials) {
    return this.http.post('/authentication/sign-in', credentials)
  }

  async signUp(data) {
    return this.http.post('/authentication/sign-up', data)
  }
}
