import angular from 'angular';
import HomeComponent from './home.component';
import WelcomeComponent from './welcome.component';
import HomeFeedComponent from './home-feed.component';

const home = angular
  .module('home', [])
  .component('home', HomeComponent)
  .component('welcome', WelcomeComponent)
  .component('homeFeed', HomeFeedComponent)
  .name;

export default home;
