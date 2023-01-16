import axios from 'axios';

export class CarModelService {
  static pathPrefix = 'car-model';

  static search(searchModel) {
    return axios.post(`${CarModelService.pathPrefix}/search`, searchModel);
  }

  static create(searchModel) {
    return axios.post(`${CarModelService.pathPrefix}`, searchModel);
  }

  static delete(id) {
    return axios.delete(`${CarModelService.pathPrefix}/${id}`);
  }

  static getCarBrandById(id) {
    return axios.get(`${CarModelService.pathPrefix}/${id}`);
  }

  static patchCarBrandById(id, form) {
    return axios.patch(`${CarModelService.pathPrefix}/${id}`, form);
  }
}
