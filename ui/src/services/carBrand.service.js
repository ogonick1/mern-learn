import axios from 'axios';

export class CarBrandService {
  static pathPrefix = 'car-brand';

  static search(searchModel) {
    return axios.post(`${CarBrandService.pathPrefix}/search`, searchModel);
  }

  static create(searchModel) {
    return axios.post(`${CarBrandService.pathPrefix}`, searchModel);
  }

  static delete(id) {
    return axios.delete(`${CarBrandService.pathPrefix}/${id}`);
  }

  static getCarBrandById(id) {
    return axios.get(`${CarBrandService.pathPrefix}/${id}`);
  }

  static patchCarBrandById(id, form) {
    return axios.patch(`${CarBrandService.pathPrefix}/${id}`, form);
  }
}
