import {createActions} from 'redux-actions';

export const {
	usersAdd,
	usersFetchAlbums
} = createActions(
	'USERS_ADD',
	'USERS_FETCH_ALBUMS'
);
