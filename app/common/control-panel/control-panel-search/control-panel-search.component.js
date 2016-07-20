import ControlPanelSearchController from './control-panel-search.controller';
import controlPanelSearchTemplate from './control-panel-search.html';

const ControlPanelSearchComponent = {
  bindings: {
    query: '<',
    onSearch: '&',
  },
  controller: ControlPanelSearchController,
  template: controlPanelSearchTemplate,
};

export default ControlPanelSearchComponent;
