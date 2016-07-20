import angular from 'angular';
import merge from 'lodash/merge';
import first from 'lodash/first';

let currentDeed = null;

class DeedService {
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
   * @returns {Promise}
   */
  find(params = {}) {
    return this.$http.get(this.baseUrl, { params }).then(extractData);
  }

  /**
   * Find a single deed by params
   *
   * @param {object} params
   *
   * @returns {Promise}
   */
  findOne(params) {
    return this.find(params)
      .then(deeds => {
        if (deeds.length === 1) {
          return first(deeds);
        } else {
          return this.$q.reject('Deed not found');
        }
      });
  }

  /**
   * Search for deeds with a search query and optional params
   *
   * @param {string} query
   * @param {object} params
   *
   * @returns {Promise}
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
   * @returns {Promise}
   */
  get(deedId, params = {}) {
    return this.$http.get(`${this.baseUrl}/${deedId}`, { params }).then(extractData);
  }

  /**
   * Set the current deed
   *
   * @param {object|null} deed
   */
  set current(deed) {
    currentDeed = angular.copy(deed);
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

/**
 * Extra data from HTTP response
 *
 * @param {Response} response
 *
 * @returns {*}
 */
function extractData(response) {
  return response.data;
}

export default DeedService;
