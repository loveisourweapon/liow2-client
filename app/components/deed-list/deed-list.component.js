import DeedListController from './deed-list.controller';

const DeedListComponent = {
  bindings: {
    layout: '@',
  },
  controller: DeedListController,
  template: `
    <deed-list-vertical ng-if="$ctrl.layout === 'vertical'"></deed-list-vertical>
    <deed-list-horizontal ng-if="$ctrl.layout === 'horizontal'"></deed-list-horizontal>
  `
};

export default DeedListComponent;
