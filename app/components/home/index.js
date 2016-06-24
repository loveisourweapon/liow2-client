import angular from 'angular';

// Module dependencies
import User from '../../services/User';
import Group from '../../services/Group';
import Act from '../../services/Act';
import Feed from '../../services/Feed';
import Modal from '../../services/Modal';
import jumbotron from '../jumbotron';
import feed from '../feed';
import deedList from '../deed-list';

// Component dependencies
import HomeCtrl from './HomeCtrl';
import homeTpl from './home.html';
import WelcomeCtrl from './WelcomeCtrl';
import welcomeTpl from './welcome.html';
import HomeFeedCtrl from './HomeFeedCtrl';
import homeFeedTpl from './homeFeed.html';

export default angular.module('app.components.home', [
  User,
  Group,
  Act,
  Feed,
  Modal,
  jumbotron,
  feed,
  deedList
])
  .component('home', {
    controller: HomeCtrl,
    template: homeTpl
  })
  .component('welcome', {
    controller: WelcomeCtrl,
    template: welcomeTpl
  })
  .component('homeFeed', {
    controller: HomeFeedCtrl,
    template: homeFeedTpl
  })
  .name;
