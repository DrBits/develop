import {fork} from 'redux-saga/effects';

import ui from './ui';
import vk from './vk';

export default function* () {
	yield fork(ui);
	yield fork(vk);
}
