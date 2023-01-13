import axios from 'axios';

export class ExtraFeatureService {
  static pathPrefix = 'extra-feature';

  static search(searchModel) {
    return axios.post(`${ExtraFeatureService.pathPrefix}/search`, searchModel);
  }

  static create(searchModel) {
    return axios.post(`${ExtraFeatureService.pathPrefix}`, searchModel);
  }

  static delete(id) {
    return axios.delete(`${ExtraFeatureService.pathPrefix}/${id}`);
  }

  static getById(id) {
    return axios.get(`${ExtraFeatureService.pathPrefix}/${id}`);
  }

  static patchById(id, form) {
    return axios.patch(`${ExtraFeatureService.pathPrefix}/${id}`, form);
  }
}
