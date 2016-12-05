import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {push} from 'react-router-redux';

import vk from '../helpers/vk';

import {VK_APP_ID, VK_PERMISSION_KEY} from '../constants/vk';
import {vkInitialized, vkAuthorize, vkAuthorized, vkAuthoruzeError} from '../actions/vk';

export default function* () {
	yield initialize();
}

function* initialize() {
	yield call(vk.initialize, VK_APP_ID);

	yield put(vkInitialized());
}
