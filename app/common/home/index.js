import angular from 'angular';
import HomeComponent from './home.component';
import WelcomeComponent from './welcome.component';
import HomeFeedComponent from './home-feed.component';

// Module dependencies
import User from '../../services/User';
import Group from '../../services/Group';
import Act from '../../services/Act';
import Feed from '../../services/Feed';
import Modal from '../modal';
import Jumbotron from '../../components/jumbotron';
import feed from '../../components/feed';
import DeedList from '../../components/deed-list';

const home = angular
  .module('home', [
    User,
    Group,
    Act,
    Feed,
    Modal,
    Jumbotron,
    feed,
    DeedList,
  ])
  .component('home', HomeComponent)
  .component('welcome', WelcomeComponent)
  .component('homeFeed', HomeFeedComponent)
  .name;

export default home;
