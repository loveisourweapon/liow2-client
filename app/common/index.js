import angular from 'angular';

// Module dependencies
import Config from './config';
import Modal from './modal';
import Navbar from './navbar';
import Feed from './feed';
import DeedList from './deed-list';
import CommentForm from './comment-form';
import Home from './home';
import ControlPanel from './control-panel';
import GlobalFeed from './global-feed';
import Deed from './deed';
import Group from './group';
import User from './user';
import ConfirmEmail from './confirm-email';
import ResetPassword from './reset-password';

const common = angular
  .module('app.common', [
    Config,
    Modal,
    Home,
    Navbar,
    Feed,
    DeedList,
    CommentForm,
    ControlPanel,
    GlobalFeed,
    Deed,
    Group,
    User,
    ConfirmEmail,
    ResetPassword,
  ])
  .name;

export default common;
