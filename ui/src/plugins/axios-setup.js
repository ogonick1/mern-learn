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
    // add error handler
    // function with argument response
    // which return next object
    // {
    //   originalError: error,
    //   originalErrorData: error.data,
    //   resolvedErrorMessage: 'Something went wrong',
    //   errorCode: error.data?.errorCode,
    //   statusCode: error.response.status,
    //   isCancelled: true,
    // }

    return Promise.reject(error);
  });
};

export { axiosSetup };
