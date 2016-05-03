import angular from 'angular';

// Module dependencies
import Deed from '../../services/Deed';
import Act from '../../services/Act';

// Component dependencies
import DeedListCtrl from './DeedListCtrl';

export default angular.module('app.components.deedList', [
  Deed,
  Act
])
  .component('deedList', {
    bindings: {
      layout: '@'
    },
    controller: DeedListCtrl,
    template: '<ng-include src="$ctrl.getTemplateName()" />'
  })
  .name;
