import angular from 'angular';

// Module dependencies
import config from '../config';

class Feed {
  constructor($http, config) {
    Object.assign(this, { $http });

    this.baseUrl = `${config.serverUrl}/feeds`;
  }

  /**
   * Find a feed by params
   *
   * @param {object} [params={}]
   *
   * @returns {HttpPromise}
   */
  find(params = {}) {
    return this.$http.get(this.baseUrl, { params });
  }
}

Feed.$inject = ['$http', 'config'];

export default angular.module('app.services.Feed', [
  config
])
  .service('Feed', Feed)
  .name;
