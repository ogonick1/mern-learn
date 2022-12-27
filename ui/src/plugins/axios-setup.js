import axios from 'axios';
import appConfig from '../appConfig';

const axiosSetup = () => {
  axios.interceptors.request.use(
    (config) => {
      const newConfig = config;
      newConfig.baseURL = appConfig.baseUrl;
      return config;
    },
  );

  axios.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    return Promise.reject(error);
  });
};

export default axiosSetup;
