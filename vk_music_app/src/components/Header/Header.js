import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';

import Close from 'react-icons/lib/md/close';
import Menu from 'react-icons/lib/md/menu';

import Button from '../Button/Button';

import classes from './header.scss';

const CloseIcon = <Close size={24} color="white" name="close"/>;
const MenuIcon = <Menu size={24} color="white" name="menu"/>;

export default class Header extends Component {
	static propTypes = {
		onMenuClick: PropTypes.func.isRequired,
		open: PropTypes.bool.isRequired
	};

	render() {
		return (
			<header className={classes.component}>
				<Button
						className={classes.button}
						rounded={true}
						ripple={true}
						onClick={this.props.onMenuClick}
					>
					{this.getIcon()}
				</Button>
				<h1 className={classes.title}>VK Music</h1>
			</header>
		);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}

	getIcon() {
		return this.props.open ? CloseIcon: MenuIcon;
	}
}
