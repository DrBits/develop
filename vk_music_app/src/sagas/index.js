import {fork} from 'redux-saga/effects';

import ui from './ui';
import vk from './vk';
import main from './main';

export default function* () {
	yield fork(vk);
	yield fork(ui);
	yield fork(main);
}
