import axios from 'axios';

export default class AuthService {
  static login(model) {
    return axios.post('auth/login', model);
  }

  static registration(model) {
    return axios.post('auth/registration', model);
  }
}
