import angular from 'angular';

// Module dependencies
import Jumbotron from './jumbotron';
import Feed from './feed';
import DeedList from './deed-list';
import MediumEditor from './medium-editor';
import CommentForm from './comment-form';
import IconChecked from './icon-checked';
import SameAs from './same-as';
import Lodash from './lodash';
import Moment from './moment';

const components = angular
  .module('app.components', [
    Jumbotron,
    Feed,
    DeedList,
    MediumEditor,
    CommentForm,
    IconChecked,
    SameAs,
    Lodash,
    Moment,
  ])
  .name;

export default components;
