import DeedListController from './deed-list.controller';
import deedListTemplate from './deed-list.html';

const DeedListComponent = {
  bindings: {
    layout: '@',
  },
  controller: DeedListController,
  template: deedListTemplate,
};

export default DeedListComponent;
