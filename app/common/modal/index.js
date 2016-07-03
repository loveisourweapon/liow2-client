import angular from 'angular';
import first from 'lodash/first';
import ModalService from './modal.service';

// Module dependencies
import ngRoute from 'angular-route';
import ngSanitize from 'angular-sanitize';
import angularDragula from 'angular-dragula';
import uibs from 'angular-ui-bootstrap';
import uiSelect from 'ui-select';
import angularMarked from 'angular-marked';
import angularYoutube from 'angular-youtube-embed';
import 'angular-ui-switch'; // Not browserified
import Alertify from '../../components/Alertify';
import User from '../../services/User';
import Group from '../../services/Group';
import Campaign from '../../services/Campaign';
import Deed from '../../services/Deed';
import Lodash from '../../components/lodash';
import SameAs from '../../components/same-as';

const modalService = angular
  .module('app.services.Modal', [
    ngRoute,
    ngSanitize,
    angularDragula(angular),
    uibs,
    uiSelect,
    angularMarked,
    angularYoutube,
    'uiSwitch',
    Alertify,
    User,
    Group,
    Campaign,
    Deed,
    Lodash,
    SameAs,
  ])
  .service('Modal', ModalService)
  .name;

export default modalService;

// Fixes to UI Bootstrap Modal
angular
  .module(uibs)
  .directive('uibModalWindow', $window => {
    'ngInject';

    return {
      priority: 1,
      link: (scope, element) => {
        // Set max-height on modal-body
        let modalBody = first(element.querySelectorAll('.modal-body'));
        let window = angular.element($window);
        window.on('resize', setMaxHeight);
        scope.$on('$destroy', () => window.off('resize', setMaxHeight));
        setMaxHeight();

        function setMaxHeight() {
          let maxHeight = $window.innerHeight
            - 62 /* margins + border */
            - 120 /* header + footer */
          ;

          modalBody.style.maxHeight = `${maxHeight}px`;
        }
      }
    }
  });
