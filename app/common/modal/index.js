import angular from 'angular';
import ModalService from './modal.service';
import UiModalWindowDirective from './ui-modal-window.directive';

// Module dependencies
import ngRoute from 'angular-route';
import ngSanitize from 'angular-sanitize';
import angularDragula from 'angular-dragula';
import uibs from 'angular-ui-bootstrap';
import uiSelect from 'ui-select';
import angularMarked from 'angular-marked';
import angularYoutube from 'angular-youtube-embed';
import 'angular-ui-switch'; // Not browserified

const modal = angular
  .module('modal', [
    ngRoute,
    ngSanitize,
    angularDragula(angular),
    uibs,
    uiSelect,
    angularMarked,
    angularYoutube,
    'uiSwitch',
  ])
  .service('Modal', ModalService)
  .name;

export default modal;

angular
  .module(uibs)
  .directive('uibModalWindow', /* @ngInject */ $window => new UiModalWindowDirective($window));
