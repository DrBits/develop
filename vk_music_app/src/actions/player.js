import {createActions} from 'redux-actions';

export const {
	playerPlayTrack,
	playerPlayPause
} = createActions(
	'PLAYER_PLAY_TRACK',
	'PLAYER_PLAY_PAUSE'
);
