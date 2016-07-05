import angular from 'angular';
import DeedComponent from './deed.component';

// Module dependencies
import angularMarked from 'angular-marked';
import angularYoutube from 'angular-youtube-embed';
import uibs from 'angular-ui-bootstrap';
import User from '../../services/User';
import Group from '../../services/Group';
import Deed from '../../services/Deed';
import Act from '../../services/Act';
import Feed from '../../services/Feed';

const deed = angular
  .module('deed', [
    angularMarked,
    angularYoutube,
    uibs,
    User,
    Group,
    Deed,
    Act,
    Feed,
  ])
  .component('deed', DeedComponent)
  .name;

export default deed;
