import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import vk from './vk';
import ui from './ui';
import users from './users';
import entities from './entities';

export default combineReducers({
	vk,
	ui,
	users,
	entities,
	routing: routerReducer
});
