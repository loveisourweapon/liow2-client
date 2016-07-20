import DeedsControlPanelController from './deeds-control-panel.controller'
import deedsControlPanelTemplate from './deeds-control-panel.html';

const DeedsControlPanelComponent = {
  bindings: {
    deeds: '<',
  },
  controller: DeedsControlPanelController,
  template: deedsControlPanelTemplate,
};

export default DeedsControlPanelComponent;
