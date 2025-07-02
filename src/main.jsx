import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';

import Router from './routes/Router';
import AdminRouter from './routes/AdminRoutes';

const isAdminPath = window.location.pathname.startsWith('/admin');

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        {isAdminPath ? <AdminRouter /> : <Router />}
      </BrowserRouter>
    </StrictMode>
  </Provider>
);
