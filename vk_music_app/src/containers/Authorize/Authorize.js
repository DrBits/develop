import React, {Component, PropTypes} from 'react';

import Scrollable from '../../components/Scrollable/Scrollable';
import Button from '../../components/Button/Button';

import classes from './authorize.scss';

class Authorize extends Component {
  static propTypes = {
    authorized: PropTypes.bool.isRequired,
    authorize: PropTypes.func.isRequired
  };

  render() {
    return (
      <Scrollable>
        <div className={ classes.component }>
          <h2 className={ classes.title } data-text="VK Music">VK Music</h2>
          <Button className={ classes.button } ripple={ true } onClick={ this.props.authorize }>
            <span>Авторизоваться</span>
          </Button>
        </div>
      </Scrollable>
    )
  }
}

export default Authorize;
