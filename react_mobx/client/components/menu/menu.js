import React from 'react';
import cn from 'classnames';

import style from './style.css';

const Menu = props =>
  <nav className={cn(style.menu, { [style.active]: props.isOpenLeftPanel })}>
    <div onClick={props.toggleMenu} className={style.toggleBtn}>
      ☰
    </div>
  </nav>;

export default Menu;
