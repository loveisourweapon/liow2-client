import angular from 'angular';
import config from '../../config';

// Module dependencies
import satellizer from 'satellizer';

let currentUser = null;

class User {
  constructor($auth, $http) {
    Object.assign(this, { $auth, $http });

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
      return Promise.reject('Email and/or password not provided');
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
      return Promise.reject('Not logged in')
    }

    return this.$http.get(`${this.baseUrl}/me`).then(response => currentUser = response.data);
  }

  /**
   * Get the current logged in user
   *
   * @returns {object|null}
   */
  get current() {
    return currentUser;
  }
}

User.$inject = ['$auth', '$http'];

export default angular.module('app.services.User', [satellizer])
  .config(['$authProvider', $authProvider => {
    const BASE_URL = 'http://loveisourweapon.local:3000';

    $authProvider.loginUrl = `${BASE_URL}/auth/login`;
    $authProvider.signupUrl = `${BASE_URL}/auth/signup`;
    $authProvider.facebook({
      clientId: '1432544943734958',
      url: `${BASE_URL}/auth/facebook`
    });
  }])
  .service('User', User)
  .name;
