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

	middlewares.push(createLogger({
		actionTransformer: (action) => ({
			...action,
			type: String(action.type),
		})
	}));
}

const includeInLocalStorage = [
	'vk.expire'
];

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
			slicer,
			merge
		}),
		devTools
	);
}


function include(rule, state, initialState) {
	let newState = state;
	let initState = initialState;
	let keys = rule.split('.');

	keys.forEach((key, index) => {
		if (index === keys.length - 1) {
			newState[key] = initState[key];
		} else {
			newState[key] = newState[key] || {};
			initState = initState[key] || {};
		}

		newState = newState[key];
	});
}

function slicer() {
	return state => {
		let newState = {};

		includeInLocalStorage.forEach(rule => {
			include(rule, newState, state);
		});

		return newState;
	};
}

function assignByRule(rule, state, persistedState) {
	let newState = state;
	let persistState = persistedState;
	let keys = rule.split('.');

	keys.forEach((key, index) => {
		if (index === keys.length - 1) {
			if (isObject(newState[key])) {
				newState[key] = assignIn({}, newState[key], persistState[key]);
			} else {
				newState[key] = persistState[key];
			}
		} else {
			newState[key] = newState[key] || {};
			persistState = persistState[key] || {};
		}

		newState = newState[key];
	});
}

function merge(initialState, persistState) {
	if (!persistState) {
		return initialState;
	}

	let newState = assignIn({}, initialState);

	includeInLocalStorage.forEach(rule => {
		assignByRule(rule, newState, persistState);
	});

	return newState;
}
