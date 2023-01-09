import axios from 'axios';

export default class CarBrandService {
  static search(params) {
    return axios.post('car-brand/search', { params });
  }
}
