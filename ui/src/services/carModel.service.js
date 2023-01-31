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

  static getModelById(id) {
    return axios.get(`${CarModelService.pathPrefix}/${id}`);
  }

  static patchModelById(id, form) {
    return axios.patch(`${CarModelService.pathPrefix}/${id}`, form);
  }
}
