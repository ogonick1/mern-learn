import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { App } from './App';
import './styles/index.scss';
import { store } from './plugins/store/store';
import { axiosSetup } from './plugins/axios-setup';
import './plugins/i18n/i18n';
import { DialogManagerProvider } from './providers/DialogManagerProvider/DialogManagerProvider';

axiosSetup();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <DialogManagerProvider>
        <App />
      </DialogManagerProvider>
    </Provider>
  </React.StrictMode>,
);
