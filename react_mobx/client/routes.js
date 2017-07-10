import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './views/app';
import Home from './views/home';

const AppRouter = () =>
  <BrowserRouter>
    <App>
      <Route path="home" component={Home} />
    </App>
  </BrowserRouter>;

export default AppRouter;
