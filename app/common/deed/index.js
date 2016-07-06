import angular from 'angular';
import DeedService from './deed.service';
import DeedComponent from './deed.component';

// Module dependencies
import angularMarked from 'angular-marked';
import angularYoutube from 'angular-youtube-embed';
import uibs from 'angular-ui-bootstrap';

const deed = angular
  .module('deed', [
    angularMarked,
    angularYoutube,
    uibs,
  ])
  .service('Deed', DeedService)
  .component('deed', DeedComponent)
  .name;

export default deed;
