import React from 'react';

import style from './style.css';

const LeftPanelController = props =>
  <div className={style.container}>
    <button onClick={() => props.openPanel()}>Open left panel</button>
    <button onClick={() => props.closePanel()}>Close left panel</button>
  </div>;

export default LeftPanelController;
