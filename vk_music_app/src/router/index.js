import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Router} from 'react-router';

import Authorize from '../containers/Authorize/Authorize';
import App from '../containers/App/App';
import Audios from '../containers/Audios/Audios';
import Albums from '../containers/Albums/Albums';

class MyRouter extends Component {
  routes = {
    path: '/',
    indexRoute: { onEnter: (nextState, replace) => this.onEnter(nextState, replace) },
    childRoutes: [{
      path: 'authorize',
      component: Authorize,
      onEnter: (nextState, replace) => this.onEnter(nextState, replace)
    }, {
			path: ':ownerId',
			component: App,
			indexRoute: { component: Audios },
			onEnter: (nextState, replace) => this.onEnter(nextState, replace),
			childRoutes: [{
				path: 'albums',
				component: Albums
			}]
		}]
  }

  onEnter(nextState, replace) {
    const nextPathName = nextState.location.pathname;

    if (!this.props.authorized && nextPathName !== '/authorize') {
      replace({
        pathname: '/authorize',
        state: nextPathName
      });
    } else if (this.props.authorized && (nextPathName === '/' || nextPathName === '/authorize')) {
      replace({
        pathname: `/${this.props.userId}`,
        state: nextPathName
      });
    }
  }

  render() {
    return (
      <Router history={ this.props.history } routes={ this.routes }/>
    )
  }
}

const mapStateToProps = ({vk, routing}) => ({
  authorized: vk.authorized,
  userId: vk.userId,
  routing: routing.locationBeforeTransitions
});

export default connect(mapStateToProps)(MyRouter);
