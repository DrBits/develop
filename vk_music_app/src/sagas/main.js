import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';

import vk from '../helpers/vk';
import switcher from '../helpers/switcher';
import normalizeBy, {normalizeByAndMakeCID} from '../helpers/normalizeBy';

import {entitiesSet, entitiesReset, entitiesFetch, entitiesError} from '../actions/entities';

import {usersAddMultiple, usersFetchAlbums, usersFetchAudios} from '../actions/users';

import {audiosAddMultiple} from '../actions/audios';
import {albumsAddMultiple} from '../actions/albums';

export default function* () {
	console.log('userFetchAudio', usersFetchAudios.toString());
	yield takeEvery([
		usersFetchAudios.toString(),
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
		yield makeSomeThinkBeforePutByType(type, newData.normalized);
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
		audios: 'fetchAudio',
		albums: 'fetchAlbums'
	});
}

function getNewDataByType(type, data) {
	return switcher(type, {
		albums: () => normalizeByAndMakeCID(data.items, 'id', 'owner_id'),
		audios: () => normalizeByAndMakeCID(data.items, 'id', 'owner_id'),
		default: () => normalizeBy(data.item, 'id')
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
		albums: ({...newPayload, ownerId}),
		audios: ({...newPayload, ownerId, albumId}),
		default: newPayload
	});
}

function makeSomeThinkBeforePutByType(type, normalized) {
	return switcher(type, {
		albums: () => put(albumsAddMultiple(normalized)),
		audios: () => put(audiosAddMultiple(normalized))
	});
}
