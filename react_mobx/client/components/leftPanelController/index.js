import React from 'react';
import { inject } from 'mobx-react';

import LeftPanelController from './left_menu_controller';

const Component = inject('leftMenuStore')(({ leftMenuStore }) =>
  <LeftPanelController
    openPanel={() => leftMenuStore.openLeftPanel()}
    closePanel={() => leftMenuStore.closeLeftPanel()}
  />
);

Component.displayName = 'LeftPanelController';
export default Component;
