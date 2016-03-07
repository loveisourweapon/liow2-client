import angular from 'angular';

// Module dependencies
import User from '../../services/User';
import Group from '../../services/Group';
import Act from '../../services/Act';
import Modal from '../../services/Modal';
import jumbotron from '../jumbotron';
import feed from '../feed';

// Component dependencies
import HomeCtrl from './HomeCtrl';
import template from './home.html';
import WelcomeCtrl from './WelcomeCtrl';
import welcomeTpl from './welcome.html';
import HomeFeedCtrl from './HomeFeedCtrl';
import homeFeedTpl from './homeFeed.html';

export let homeTpl = template;
export let home = angular.module('app.components.home', [
  User,
  Group,
  Act,
  Modal,
  jumbotron,
  feed
])
  .controller('HomeCtrl', HomeCtrl)
  .component('welcome', {
    controller: WelcomeCtrl,
    template: welcomeTpl
  })
  .component('homeFeed', {
    controller: HomeFeedCtrl,
    template: homeFeedTpl
  })
  .name;
