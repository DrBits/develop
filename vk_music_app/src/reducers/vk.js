import {handleActions} from 'redux-actions';

import {
	vkInitialized,

	vkAuthorize,
	vkAuthorized,
	vkAuthoruzeError
} from '../actions/vk';
import defaultState from '../store/initialState';

export default handleActions({
	[vkInitialized]: state => ({
		...state,
		initialized: true
	}),
	[vkAuthorize]: state => ({
		...state,
		authorizing: true,
		authrorized: false,
		authorizeError: null
	}),
	[vkAuthorized]: (state, {payload}) => ({
		...state,
		...payload,
		authorizing: false,
		authorized: true,
		authorizeError: null
	}),
	[vkAuthoruzeError]: (state, {payload}) => ({
		...state,
		authorizing: false,
		authorized: false,
		authorizeError: payload
	})
}, defaultState.vk);
