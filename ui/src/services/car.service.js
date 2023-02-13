import axios from 'axios';

export class CarService {
  static pathPrefix = 'car';

  static search(searchModel) {
    return axios.post(`${CarService.pathPrefix}/search`, searchModel);
  }

  static create(searchModel) {
    return axios.post(`${CarService.pathPrefix}`, searchModel);
  }

  static delete(id) {
    return axios.delete(`${CarService.pathPrefix}/${id}`);
  }

  static getCarById(id) {
    return axios.get(`${CarService.pathPrefix}/${id}`);
  }

  static patchCarById(id, form) {
    return axios.patch(`${CarService.pathPrefix}/${id}`, form);
  }
}
