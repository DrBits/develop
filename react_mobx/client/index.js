/* eslint-disable global-require */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import AppRouter from './routes';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  );
};

render(AppRouter);
if (module.hot) {
  module.hot.accept('./routes', () => {
    require('./routes');
    render(AppRouter);
  });
}
/* eslint-enable global-require */
function asdf(){
  let a =x
}
