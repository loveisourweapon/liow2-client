import angular from 'angular';
import config from '../../config';

let currentDeed = null;

class Deed {
  constructor($http, $q) {
    Object.assign(this, { $http, $q });

    this.baseUrl = `${config.serverUrl}/deeds`;
  }

  /**
   * Find deeds by params
   *
   * @param {object} [params={}]
   *
   * @returns {HttpPromise}
   */
  find(params = {}) {
    return this.$http.get(this.baseUrl, { params });
  }

  /**
   * Find a single deed by params
   *
   * @param {object} params
   *
   * @returns {Promise}
   */
  findOne(params) {
    return this.$q((resolve, reject) => {
      this.find(params)
        .then(response => {
          if (response.data.length === 1) {
            resolve(response.data[0]);
          } else {
            reject(new Error('Deed not found'));
          }
        })
        .catch(() => reject(new Error('Failed connecting to server')));
    });
  }

  /**
   * Get a deed by ID
   *
   * @param {string} deedId
   * @param {object} [params={}]
   *
   * @returns {HttpPromise}
   */
  get(deedId, params = {}) {
    return this.$http.get(`${this.baseUrl}/${deedId}`, { params });
  }

  /**
   * Set the current deed
   *
   * @param {object|null} deed
   */
  set current(deed) {
    currentDeed = deed;
  }

  /**
   * Get the current deed
   *
   * @returns {object|null}
   */
  get current() {
    return currentDeed;
  }
}

Deed.$inject = ['$http', '$q'];

export default angular.module('app.services.Deed', [])
  .service('Deed', Deed)
  .name;
