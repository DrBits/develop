import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import timeReducer from './timerReducer';

export default combineReducers({
  counter: counterReducer,
  time: timeReducer
});
