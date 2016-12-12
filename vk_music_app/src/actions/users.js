import {createActions} from 'redux-actions';

export const {
	usersAdd,
	usersAddMultiple,
	usersFetchAlbums,
	usersFetchAudios
} = createActions(
	'USERS_ADD',
	'USERS_ADD_MULTIPLE',
	'USERS_FETCH_ALBUMS',
	'USERS_FETCH_AUDIOS'
);
