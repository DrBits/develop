import {
	VK_AUTH_CONNECTED,
	VK_API_VERSION
} from '../constants/vk';

class VK {
	constructor() {
		this._VK = null;
	}

	initialize = id => {
		let initPromise;

		this.APP_ID = id;

		if (window.VK) {
			initPromise = Promise.resolve();
		} else {
			initPromise = new Promise(resolve => {
				window.vkAsyncInit = resolve;
			});
		}

		return initPromise.then(this._asyncInit);
	};

	_asyncInit = () => {
		this._VK = window.VK;

		this._VK.init({
			apiId: this.APP_ID
		});

		delete window.vkAsyncInit;
	};
}
