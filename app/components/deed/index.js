import angular from 'angular';

// Module dependencies
import angularMarked from 'angular-marked';
import angularYoutube from 'angular-youtube-embed';
import uibs from 'angular-ui-bootstrap';
import User from '../../services/User';
import Group from '../../services/Group';
import Deed from '../../services/Deed';
import Act from '../../services/Act';
import Feed from '../../services/Feed';
import Modal from '../../services/Modal';
import jumbotron from '../jumbotron';
import feed from '../feed';
import deedList from '../deed-list';
import commentForm from '../comment-form';

// Component dependencies
import DeedCtrl from './DeedCtrl';
import deedTpl from './deed.html';

export default angular.module('app.components.deed', [
  angularMarked,
  angularYoutube,
  uibs,
  User,
  Group,
  Deed,
  Act,
  Feed,
  Modal,
  jumbotron,
  feed,
  deedList,
  commentForm
])
  .component('deed', {
    controller: DeedCtrl,
    template: deedTpl,
    bindings: {
      deedSlug: '<'
    }
  })
  .name;
