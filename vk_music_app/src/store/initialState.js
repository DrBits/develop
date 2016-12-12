export default {
	vk: {
		initialized: false,
		authorized: false,
		authorizing: true,
		authorizeError: null,
		userId: null,
		expire: 0
	},

	ui: {
		isLeftMenuOpen: false
	},

	audios: {},

	users: {},

	entities: {},

	player: {
		playlist: [],
		current: '',
		next: '',
		prev: '',
		isPlaying: false,
		isRepeating: false,
		isShuffling: false
	}
};
