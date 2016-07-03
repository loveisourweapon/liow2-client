import angular from 'angular';

// Module dependencies
import Jumbotron from './jumbotron';
import Feed from './feed';
import DeedList from './deed-list';
import CommentForm from './comment-form';
import IconChecked from './icon-checked';
import SameAs from './same-as';
import MediumEditor from './medium-editor';
import Alertify from './alertify';
import Lodash from './lodash';
import Moment from './moment';

const components = angular
  .module('app.components', [
    Jumbotron,
    Feed,
    DeedList,
    CommentForm,
    IconChecked,
    SameAs,
    MediumEditor,
    Alertify,
    Lodash,
    Moment,
  ])
  .name;

export default components;
