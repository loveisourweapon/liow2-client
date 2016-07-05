import angular from 'angular';
import UserComponent from './user.component';

// Module dependencies
import uibs from 'angular-ui-bootstrap';
import User from '../../services/User';
import Act from '../../services/Act';
import Feed from '../../services/Feed';

const user = angular
  .module('user', [
    uibs,
    User,
    Act,
    Feed,
  ])
  .component('user', UserComponent)
  .name;

export default user;
