import angular from 'angular';
import config from '../../config';

class Campaign {
  constructor($http) {
    Object.assign(this, { $http });

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
}

Campaign.$inject = ['$http'];

export default angular.module('app.services.Campaign', [])
  .service('Campaign', Campaign)
  .name;
