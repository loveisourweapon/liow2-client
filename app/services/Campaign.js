import angular from 'angular';

// Module dependencies
import config from '../config';

class Campaign {
  /* @ngInject */
  constructor($http, $q, config) {
    Object.assign(this, { $http, $q });

    this.baseUrl = `${config.serverUrl}/campaigns`;
  }

  /**
   * Find campaigns by params
   *
   * @param {object} [params={}]
   *
   * @returns {HttpPromise}
   */
  find(params = {}) {
    return this.$http.get(this.baseUrl, { params });
  }

  /**
   * Find a single campaign by params
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
            reject(new Error('Campaign not found'));
          }
        })
        .catch(() => reject(new Error('Failed connecting to server')));
    });
  }

  /**
   * Save a new or existing campaign
   *
   * @param {object} campaign
   *
   * @returns {HttpPromise}
   */
  save(campaign) {
    if (_.has(campaign, '_id')) {
      return this.$http.put(`${this.baseUrl}/${campaign._id}`, campaign);
    } else {
      return this.$http.post(this.baseUrl, campaign);
    }
  }

  /**
   * Update an existing campaign
   *
   * @param {object}   campaign
   * @param {object[]} changes
   *
   * @returns {HttpPromise}
   */
  update(campaign, changes) {
    return this.$http.patch(`${this.baseUrl}/${campaign._id}`, changes);
  }
}

export default angular.module('app.services.Campaign', [
  config
])
  .service('Campaign', Campaign)
  .name;
