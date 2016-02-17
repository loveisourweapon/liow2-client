import angular from 'angular';

// Module dependencies
import config from '../config';
import satellizer from 'satellizer';

let currentUser = null;
let currentGroup = null;

class User {
  constructor($auth, $http, $q, config, Group) {
    Object.assign(this, { $auth, $http, $q, Group });

    this.baseUrl = `${config.serverUrl}/users`;

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
        this.loadCurrent();
      })
      .catch(err => console.log('authenticateFacebook failed', err));
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
        this.loadCurrent();
      })
      .catch(err => console.log('authenticateEmail failed', err));
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
    return this.$auth.logout().then(() => currentUser = null);
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

        // Set the current group as the users first group
        if (currentUser.groups.length) {
          currentGroup = currentUser.groups[0];
        }
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
      .then(response => {
        this.loadCurrent();
        return response;
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

User.$inject = ['$auth', '$http', '$q', 'config', 'Group'];

export default angular.module('app.services.User', [satellizer, config])
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
