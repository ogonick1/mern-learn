import axios from 'axios';

export default class AuthService {
  static pathPrefix = 'auth';

  static login(model) {
    return axios.post(`${AuthService.pathPrefix}/login`, model);
  }

  static registration(model) {
    return axios.post(`${AuthService.pathPrefix}/registration`, model);
  }
}
