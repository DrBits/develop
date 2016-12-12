import {handleActions} from 'redux-actions';

import {
	playerPlayTrack,
	playerPlayPause
} from '../actions/player';
import defaultState from '../store/initialState';

export default handleActions({
	[playerPlayTrack]: (state, {payload}) => ({
		...state,
		current: payload.id,
		playlist: payload.playlist,
		entityId: payload.entityId,
		offset: payload.offset,
		count: payload.count,
		next: getNext(payload.playlist, payload.id),
		prev: getPrev(payload.playlist, payload.id),
		isPlaying: true
	}),
	[playerPlayPause]: state => ({
		...state,
		isPlaying: !state.isPlaying
	}),
}, defaultState.player);

function getNext(playlist, current) {
	const currentIndex = playlist.indexOf(current);

	return playlist[currentIndex + 1] || '';
}

function getPrev(playlist, current) {
	const currentIndex = playlist.indexOf(current);

	return playlist[currentIndex - 1] || '';
}
