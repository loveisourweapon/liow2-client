/* globals LIOW_CONFIG */

import angular from 'angular';
import defaults from 'lodash/defaults';

const defaultConfig = {
  serverUrl: 'http://localhost:3000',
  facebookClientId: 'FACEBOOK_CLIENT_ID'
};

const config = angular
  .module('config', [])
  .constant('config', defaults(LIOW_CONFIG || {}, defaultConfig))
  .name;

export default config;
