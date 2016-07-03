import angular from 'angular';
import merge from 'lodash/merge';

// Module dependencies
import Config from '../common/config';

let currentDeed = null;

class Deed {
  /* @ngInject */
  constructor($http, $q, config) {
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
   * Search for deeds with a search query and optional params
   *
   * @param {string} query
   * @param {object} params
   *
   * @returns {HttpPromise}
   */
  search(query, params) {
    params = merge({ query }, params);

    return this.find(params);
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

const deedService = angular
  .module('app.services.Deed', [
    Config,
  ])
  .service('Deed', Deed)
  .name;

export default deedService;
