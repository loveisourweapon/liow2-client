/* globals LIOW_CONFIG */

import _ from 'lodash';
import angular from 'angular';

const defaults = {
  serverUrl: 'http://localhost:3000',
  facebookClientId: 'FACEBOOK_CLIENT_ID'
};

export default angular.module('app.config', [])
  .constant('config', _.defaults(LIOW_CONFIG || {}, defaults))
  .name;
