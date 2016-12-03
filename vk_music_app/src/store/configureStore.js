import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {routerMiddleware} from 'react-router-redux';
import persistState from 'redux-localstorage';
import assignIn from 'lodash/assignIn';
import isObject from 'lodash/isObject';

import reducers from '../reducers/index';

const sagaMiddleware = createSagaMiddleware();

let middlewares = [
	sagaMiddleware
];

if (!IS_PROD) {
	const createLogger = require('redux-logger');

	middlewares.push(createLogger());
}

export default (initialState, browserHistory) => {
	middlewares.push(routerMiddleware(browserHistory));

	const store = createStore(reducers, initialState, getEnhancer());

	store.runSaga = sagaMiddleware.run;

	if (module.hot) {
		module.hot.accept('../reducers', () =>
			store.replaceReducer(require('../reducers').default)
		);
	}

	return store;
};

function getEnhancer() {
	let devTools = f => f;

	if (!IS_PROD && window.devToolsExtenstion) {
		devTools = window.devToolsExtenstion();
	}

	return compose(
		applyMiddleware(...middlewares),
		persistState('', {
			key: 'vk-music',
		}),
		devTools
	);
}
