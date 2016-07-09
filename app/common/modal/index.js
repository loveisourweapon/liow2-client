import angular from 'angular';
import ModalService from './modal.service';
import ModalHeaderComponent from './modal-header.component';
import UiModalWindowDirective from './ui-modal-window.directive';

// Module dependencies
import ngMessages from 'angular-messages';
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
    ngMessages,
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
  .component('modalHeader', ModalHeaderComponent)
  .name;

export default modal;

angular
  .module(uibs)
  .directive('uibModalWindow', /* @ngInject */ $window => new UiModalWindowDirective($window));
