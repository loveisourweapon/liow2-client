import angular from 'angular';
import ModalService from './modal.service';
import ModalHeaderComponent from './modal-header.component';
import UiModalWindowDirective from './ui-modal-window.directive';

const modal = angular
  .module('modal', [])
  .service('Modal', ModalService)
  .component('modalHeader', ModalHeaderComponent)
  .name;

export default modal;

import uibs from 'angular-ui-bootstrap';
angular
  .module(uibs)
  .directive('uibModalWindow', /* @ngInject */ $window => new UiModalWindowDirective($window));
