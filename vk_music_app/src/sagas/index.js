import {fork} from 'redux-saga/effects';

import ui from './ui';

export default function* () {
	yield fork (ui);
}
