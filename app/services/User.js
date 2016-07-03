import angular from 'angular';
import has from 'lodash/has';
import some from 'lodash/some';
import forOwn from 'lodash/forOwn';
import uuid from 'uuid';
import seedrandom from 'seedrandom';

// Module dependencies
import satellizer from 'satellizer';
import Config from '../common/config';
import Alertify from './Alertify';

const NUM_IMAGES = 12;
var defaultImagesDict = {};

let currentUser = null;
let currentGroup = null;
let listeners = {};

class User {
  /* @ngInject */
  constructor($auth, $http, $q, config, Alertify) {
    Object.assign(this, { $auth, $http, $q, Alertify });

    this.baseUrl = `${config.serverUrl}/users`;
    this.authUrl = `${config.serverUrl}/auth`;

    this.loadCurrent().catch(() => null);
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
   * @param {object} [group=null]
   *
   * @returns {Promise}
   */
  authenticateEmail(email, password, group = null) {
    if (!email || !password) {
      return this.$q.reject({ data: { message: 'Email and/or password not provided' } });
    }

    let userData = { email, password };
    if (has(group, '_id')) {
      userData.group = group._id;
    }

    return this.$auth.login(userData)
      .then(response => {
        this.$auth.setToken(response.data.token);
        return this.loadCurrent();
      });
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
        currentGroup = null;
        this.pub('logout');
        this.Alertify.success('Logged out');
      });
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
   * Find a single user by Id
   *
   * @param {string} userId
   * @param {object} [params={}]
   *
   * @returns {HttpPromise}
   */
  findById(userId, params) {
    return this.$http.get(`${this.baseUrl}/${userId}`, { params });
  }

  /**
   * Save a new or existing user
   *
   * @param {object} user
   *
   * @returns {HttpPromise}
   */
  save(user) {
    if (has(user, '_id')) {
      return this.$http.put(`${this.baseUrl}/${user._id}`, user);
    } else {
      return this.$http.post(this.baseUrl, user);
    }
  }

  /**
   * Update an existing user
   *
   * @param {object}   user
   * @param {object[]} changes
   *
   * @returns {Promise}
   */
  update(user, changes) {
    return this.$http.patch(`${this.baseUrl}/${user._id}`, changes)
      .then(response => this.loadCurrent());
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
   * Check if the current user is a super admin
   *
   * @returns {boolean}
   */
  isSuperAdmin() {
    return Boolean(currentUser) && currentUser.superAdmin;
  }

  /**
   * Check if the user is the currently logged in user
   *
   * @param {object} user
   *
   * @returns {boolean}
   */
  isLoggedInUser(user) {
    return Boolean(currentUser) && currentUser._id === user._id;
  }

  /**
   * Check if the current user is a member of a group
   *
   * @param {object} group
   *
   * @returns {boolean}
   */
  isMemberOfGroup(group) {
    return (
      has(currentUser, 'groups') &&
      some(currentUser.groups, userGroup => userGroup._id === (has(group, '_id') ? group._id : group))
    );
  }

  /**
   * Check if the current user has a common group
   *
   * @param {object[]} groups
   *
   * @returns {boolean}
   */
  hasCommonGroup(groups) {
    return some(groups, this.isMemberOfGroup);
  }

  /**
   * Send forgot password email
   *
   * @param {string} email
   *
   * @returns {HttpPromise}
   */
  sendForgotPassword(email) {
    return this.$http.get(`${this.authUrl}/forgot`, { params: { email } });
  }

  /**
   * Reset user's password
   *
   * @param {string} password
   * @param {string} token
   *
   * @returns {HttpPromise}
   */
  resetPassword(password, token) {
    return this.$http.post(`${this.authUrl}/reset`, { password, token });
  }

  /**
   * Send confirm email address email
   *
   * @param {string} email
   *
   * @returns {HttpPromise}
   */
  sendConfirmEmail(email) {
    return this.$http.get(`${this.authUrl}/confirm`, { params: { email } });
  }

  /**
   * Confirm email address with token
   *
   * @param {string} token
   *
   * @returns {HttpPromise}
   */
  confirmEmail(token) {
    return this.$http.post(`${this.authUrl}/confirm`, { token });
  }

  /**
   * Get a default user image seeded by userId
   *
   * @param {string} userId
   *
   * @returns {string}
   */
  getDefaultUserImage(userId) {
    if (!userId) { return `/images/user0.png`; }

    if (!has(defaultImagesDict, userId)) {
      defaultImagesDict[userId] = Math.floor(seedrandom(userId)() * NUM_IMAGES);
    }

    return `/images/user${defaultImagesDict[userId]}.png`;
  }

  /**
   * Subscribe to a User update
   *
   * @param {string}   key
   * @param {function} callback
   *
   * @returns {function}
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
    forOwn(listeners, listener => {
      if (listener.key === key) {
        listener.callback(data);
      }
    });
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

const userService = angular
  .module('app.services.User', [
    satellizer,
    Config,
    Alertify,
  ])
  .config(($authProvider, config) => {
    'ngInject';

    $authProvider.loginUrl = `${config.serverUrl}/auth/login`;
    $authProvider.signupUrl = `${config.serverUrl}/auth/signup`;
    $authProvider.facebook({
      clientId: config.facebookClientId,
      url: `${config.serverUrl}/auth/facebook`
    });
  })
  .service('User', User)
  .name;

export default userService;
