import angular from 'angular';
import HomeComponent from './home.component';
import WelcomeComponent from './welcome.component';
import HomeFeedComponent from './home-feed.component';

// Module dependencies
import User from '../../services/User';
import Group from '../../services/Group';
import Act from '../../services/Act';
import Feed from '../../services/Feed';

const home = angular
  .module('home', [
    User,
    Group,
    Act,
    Feed,
  ])
  .component('home', HomeComponent)
  .component('welcome', WelcomeComponent)
  .component('homeFeed', HomeFeedComponent)
  .name;

export default home;
