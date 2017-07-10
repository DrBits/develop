import React from 'react';
import { Provider } from 'mobx-react';
import { useStrict } from 'mobx';

import Menu from '../components/menu';

import leftMenuStore from '../stores/menu_store';

import './app.css';

useStrict(true);

const stores = { leftMenuStore };

const App = props =>
  <Provider {...stores}>
    <div className="app-container">
      <Menu />
      <div className="page-container">
        {props.children}
      </div>
    </div>
  </Provider>;

export default App;
