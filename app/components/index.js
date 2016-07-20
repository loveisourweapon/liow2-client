import angular from 'angular';

// Module dependencies
import Jumbotron from './jumbotron';
import IconChecked from './icon-checked';
import LoadingSpinner from './loading-spinner';
import SameAs from './same-as';
import MediumEditor from './medium-editor';
import Alertify from './alertify';
import Lodash from './lodash';
import Moment from './moment';

const components = angular
  .module('app.components', [
    Jumbotron,
    IconChecked,
    LoadingSpinner,
    SameAs,
    MediumEditor,
    Alertify,
    Lodash,
    Moment,
  ])
  .name;

export default components;
