import angular from 'angular';

// Module dependencies
import Deed from '../../services/Deed';
import Act from '../../services/Act';

// Component dependencies
import DeedListCtrl from './DeedListCtrl';
import deedListTpl from './deedList.html';

export default angular.module('app.components.deedList', [
  Deed,
  Act
])
  .component('deedList', {
    controller: DeedListCtrl,
    template: deedListTpl
  })
  .name;
