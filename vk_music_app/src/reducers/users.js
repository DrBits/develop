import {handleActions} from 'redux-actions';

import {userAdd} from '../actions/users';
import defaultState from '../store/initialState';

export default handleActions({
	[userAdd]: (state, {payload}) => ({
		...state,
		[payload.id]: {...payload}
	})
}, defaultState.users);
