import DeedListController from './deed-list.controller';

const DeedListComponent = {
  bindings: {
    layout: '@',
  },
  controller: DeedListController,
  template: `<ng-include src="$ctrl.getTemplateName($ctrl.layout)" />`,
};

export default DeedListComponent;
