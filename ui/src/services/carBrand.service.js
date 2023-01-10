import axios from 'axios';

export class CarBrandService {
  static pathPrefix = 'car-brand';

  static search(searchModel) {
    return axios.post(`${CarBrandService.pathPrefix}/search`, searchModel);
  }

  static delete(id) {
    return axios.delete(`${CarBrandService.pathPrefix}/${id}`);
  }
}
