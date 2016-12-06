import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import vk from './vk';
import ui from './ui';
import users from './users'

export default combineReducers({
	vk,
	ui,
	users,
	routing: routerReducer
});
