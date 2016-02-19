import _ from 'lodash';
import angular from 'angular';
import uuid from 'uuid';

// Module dependencies
import config from '../config';
import satellizer from 'satellizer';
import Alertify from './Alertify';

let currentUser = null;
let currentGroup = null;
let listeners = {};

class User {
  constructor($auth, $http, $q, config, Alertify) {
    Object.assign(this, { $auth, $http, $q, Alertify });

    this.baseUrl = `${config.serverUrl}/users`;

    this.loadCurrent().catch(() => null);
  }

  /**
   * Subscribe to a User update
   *
   * @param {string}   key
   * @param {function} callback
   *
   * @returns {Function}
   */
  on(key, callback) {
    let id = uuid.v4();
    listeners[id] = { key, callback };

    return () => delete listeners[id];
  }

  /**
   * Publish a User update
   *
   * @param {string} key
   * @param {*}      [data=null]
   */
  pub(key, data = null) {
    _.forOwn(listeners, listener => {
      if (listener.key === key) {
        listener.callback(data);
      }
    });
  }

  /**
   * Authenticate user with Facebook
   *
   * @param {object} [userData={}]
   *
   * @returns {Promise}
   */
  authenticateFacebook(userData = {}) {
    return this.$auth.authenticate('facebook', userData)
      .then(response => {
        this.$auth.setToken(response.data.token);
        return this.loadCurrent();
      });
  }

  /**
   * Authenticate user with email and password
   *
   * @param {string} email
   * @param {string} password
   *
   * @returns {Promise}
   */
  authenticateEmail(email, password) {
    if (!email || !password) {
      return this.$q.reject('Email and/or password not provided');
    }

    return this.$auth.login({ email, password })
      .then(response => {
        this.$auth.setToken(response.data.token);
        return this.loadCurrent();
      });
  }

  /**
   * Check if there is a currently logged in user
   *
   * @returns {boolean}
   */
  isAuthenticated() {
    return this.$auth.isAuthenticated();
  }

  /**
   * Check if the current user is a member of a group
   *
   * @param {object} group
   */
  isMemberOfGroup(group) {
    return (
      _.has(currentUser, 'groups') &&
      _.has(group, '_id') &&
      _.some(currentUser.groups, userGroup => userGroup._id === group._id)
    );
  }

  /**
   * Logout the current user
   *
   * @returns {Promise}
   */
  logout() {
    return this.$auth.logout()
      .then(() => {
        currentUser = null;
        this.pub('logout');
        this.Alertify.success('Logged out');
      });
  }

  /**
   * Find users by params
   *
   * @param {object} [params={}]
   *
   * @returns {HttpPromise}
   */
  find(params = {}) {
    return this.$http.get(this.baseUrl, { params });
  }

  /**
   * Get the current user from the server
   *
   * @returns {Promise}
   */
  loadCurrent() {
    if (!this.isAuthenticated()) {
      return this.$q.reject('Not logged in')
    }

    return this.$http.get(`${this.baseUrl}/me`)
      .then(response => {
        currentUser = response.data;
        this.pub('login', currentUser);

        // Set the current group as the users first group
        if (currentUser.groups.length) {
          currentGroup = currentUser.groups[0];
        }

        return response;
      });
  }

  /**
   * Update an existing user
   *
   * @param {object} user
   * @param {object} changes
   *
   * @returns {Promise}
   */
  update(user, changes) {
    return this.$http.patch(`${this.baseUrl}/${user._id}`, changes)
      .then(response => this.loadCurrent());
  }

  /**
   * Get the current logged in user
   *
   * @returns {object|null}
   */
  get current() {
    return currentUser;
  }

  /**
   * Set the current group of the logged in user
   *
   * @param {object|null} group
   */
  set group(group) {
    currentGroup = group;
  }

  /**
   * Get the current group of the logged in user
   *
   * @returns {object|null}
   */
  get group() {
    return currentGroup;
  }
}

User.$inject = ['$auth', '$http', '$q', 'config', 'Alertify'];

export default angular.module('app.services.User', [
  config,
  satellizer,
  Alertify
])
  .config(['$authProvider', 'config', ($authProvider, config) => {
    $authProvider.loginUrl = `${config.serverUrl}/auth/login`;
    $authProvider.signupUrl = `${config.serverUrl}/auth/signup`;
    $authProvider.facebook({
      clientId: config.facebookClientId,
      url: `${config.serverUrl}/auth/facebook`
    });
  }])
  .service('User', User)
  .name;
