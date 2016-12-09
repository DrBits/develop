import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';

import vk from '../helpers/vk';
import switcher from '../helpers/switcher';
import normalizeBy, {normlizeByAndMakeCID} from '../helpers/normalizeBy';

import {entitiesSet, entitiesReset, entitiesFetch, entitiesError} from '../actions/entities';

import {usersFetchAlbums} from '../actions/users';

export default function* () {
	yield takeEvery([
		usersFetchAlbums.toString()
	], fetchByType);
}

function* fetchByType({payload}) {
	const entityId = payload.entityId;
	const type = entityId.split('--')[1];
	const fetchMethod = getMethodNameByType(type);

	yield put(entitiesFetch(entityId));

	try {
		const data = yield call(vk[fetchMethod], payload);
		const newData = getNewDataByType(type, data);
		const newPayload = getNewPayloadByType(type, data, payload, newData.ids);

		if (payload.offset === 0) {
			yield put(entitiesReset(newPayload));
		} else {
			yield put(entitiesSet(newPayload));
		}

	} catch (e) {
		yield put(entitiesError(e));
	}
}

function getMethodNameByType(type) {
	return switcher(type, {
		albums: 'fetchAlbums'
	});
}

function getNewDataByType(type, data) {
	return switcher(type, {
		albums: () => normlizeByAndMakeCID(data.items, 'id', 'owner_id')
	});
}

function getNewPayloadByType(type, {count, offset}, payload, ids) {
	const {ownerId, albumId} = payload;
	const newPayload = {
		ids,
		id: payload.entityId,
		count: count,
		offset: payload.offset + payload.count
	};

	return switcher(type, {
		albums: ({...newPayload, ownerId})
	});
}
