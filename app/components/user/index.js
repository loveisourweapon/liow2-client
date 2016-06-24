import angular from 'angular';

// Module dependencies
import uibs from 'angular-ui-bootstrap';
import User from '../../services/User';
import Act from '../../services/Act';
import Feed from '../../services/Feed';
import Modal from '../../services/Modal';
import jumbotron from '../jumbotron';

// Component dependencies
import UserCtrl from './UserCtrl';
import userTpl from './user.html';

export default angular.module('app.components.user', [
  uibs,
  User,
  Act,
  Feed,
  Modal,
  jumbotron
])
  .component('user', {
    controller: UserCtrl,
    template: userTpl
  })
  .name;
