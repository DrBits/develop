import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import cns from 'classnames';

import QueueMusic from 'react-icons/lib/md/queue-music';
import AvLibraryMusic from 'react-icons/lib/md/library-music';
import AvAlbum from 'react-icons/lib/md/album';
import SocialPerson from 'react-icons/lib/md/person';
import SocialPeople from 'react-icons/lib/md/people';
import Notifications from 'react-icons/lib/md/notifications';
import ActionThumbUp from 'react-icons/lib/md/thumb-up';
import ActionSettings from 'react-icons/lib/md/settings';
import Home from 'react-icons/lib/md/home';

import {UI_SIZE_ICON, UI_COLOR_DEFAULT} from '../../constants/ui';

import LeftDrawerList from '../LeftDrawerList/LeftDrawerList';

import classes from './leftDrawer.scss';

const menuItems = {
	topList: [{
		icon: <QueueMusic className={classes.icon} size={UI_SIZE_ICON} color={UI_COLOR_DEFAULT} />,
		text: 'Playlist',
		href: 'playlist'
	}, {
		icon: <AvLibraryMusic className={classes.icon} size={UI_SIZE_ICON} color={UI_COLOR_DEFAULT} />,
		text: 'Audio',
		href: ''
	}, {
		icon: <AvAlbum className={classes.icon} size={UI_SIZE_ICON} color={UI_COLOR_DEFAULT} />,
		text: 'Albums',
		href: 'albums'
	}, {
		icon: <Home className={classes.icon} size={UI_SIZE_ICON} color={UI_COLOR_DEFAULT} />,
		text: 'Wall',
		href: 'wall'
	}, {
		icon: <SocialPerson className={classes.icon} size={UI_SIZE_ICON} color={UI_COLOR_DEFAULT} />,
		text: 'Friends',
		href: 'friends'
	}, {
		icon: <SocialPeople className={classes.icon} size={UI_SIZE_ICON} color={UI_COLOR_DEFAULT} />,
		text: 'Groups',
		href: 'groups'
	}, {
		icon: <Notifications className={classes.icon} size={UI_SIZE_ICON} color={UI_COLOR_DEFAULT} />,
		text: 'Recommendations',
		href: 'recommendations'
	}, {
		icon: <ActionThumbUp className={classes.icon} size={UI_SIZE_ICON} color={UI_COLOR_DEFAULT} />,
		text: 'Popular',
		href: 'popular'
	}],
	bottomList: [{
		icon: <ActionSettings className={classes.icon} size={UI_SIZE_ICON} color={UI_COLOR_DEFAULT} />,
		text: 'Settings',
		href: 'settings'
	}]
};

export default class LeftDrawer extends Component {
	static propTypes = {
		urlPrefix: PropTypes.string.isRequired,
		open: PropTypes.bool.isRequired
	};

	constructor(props) {
		super(props);

		this.state = this.getState(props);
	}

	render() {
		return (
			<aside className={cns(classes.component, {[classes.componentOpen]: this.props.open})}>
				<LeftDrawerList items={this.state.topList}/>
				<LeftDrawerList items={this.state.bottomList}/>
			</aside>
		);
	}

	componentWillReceiveProps(newProps) {
		this.setState(this.getState(newProps));
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}

	getState(props) {
		return {
			topList: menuItems.topList.map(item => ({
				...item,
				href: `/${props.urlPrefix}${item.href ? '/' + item.href : ''}`
			})),
			bottomList: menuItems.bottomList.map(item => ({
				...item,
				href: `/${props.urlPrefix}${item.href ? '/' + item.href : ''}`
			}))
		};
	}
}
