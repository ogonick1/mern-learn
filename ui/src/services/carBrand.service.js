import axios from 'axios';

export default class CarBrandService {
  static pathPrefix = 'car-brand';

  static search(searchModel) {
    return axios.post(`${CarBrandService.pathPrefix}/search`, searchModel);
  }
}
