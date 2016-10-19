import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import counterReducer from './reducers/counterReducer';

export default function (initialState = {}) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
};
