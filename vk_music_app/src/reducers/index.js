import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import vk from './vk';
import ui from './ui';
import albums from './albums';
import audios from './audios';
import users from './users';
import player from './player';
import entities from './entities';

export default combineReducers({
	vk,
	ui,
	users,
	albums,
	audios,
	player,
	entities,
	routing: routerReducer
});
