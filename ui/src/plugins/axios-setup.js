import axios from 'axios';
import appConfig from '../appConfig';
import { store } from './store/store';

const axiosSetup = () => {
  axios.interceptors.request.use(
    (config) => {
      const newConfig = config;
      newConfig.baseURL = appConfig.baseUrl;
      const token = store.getState().authToken;
      newConfig.headers.Authorization = `Bearer ${token}`;
      return config;
    },
  );

  axios.interceptors.response.use((response) => {
    return response.data;
  }, (error) => {
    function errorHandler(err) {
      return (
        {
          originalError: err,
          originalErrorData: err.data,
          resolvedErrorMessage: 'Something went wrong',
          errorCode: err.data?.errorCode,
          statusCode: err.response.status,
          isCancelled: true,
        }
      );
    }
    return Promise.reject(errorHandler(error));
  });
};

export { axiosSetup };
