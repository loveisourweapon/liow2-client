import _ from 'lodash';
import angular from 'angular';
import uuid from 'uuid';

// Module dependencies
import config from '../config';

const FEED_UPDATE_DELAY = 80;
let listeners = {};

class Feed {
  /* @ngInject */
  constructor($http, $timeout, config) {
    Object.assign(this, { $http, $timeout });

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

  /**
   * Subscribe to a Feed update
   *
   * @param {function} callback
   *
   * @returns {function}
   */
  onUpdate(callback) {
    let id = uuid.v4();
    listeners[id] = { callback };

    return () => delete listeners[id];
  }

  /**
   * Publish an async Feed update
   *
   * @param {object} [options={}]
   */
  update(options = {}) {
    this.$timeout(() => {
      _.forOwn(listeners, listener => listener.callback(options));
    }, FEED_UPDATE_DELAY);
  }
}

export default angular.module('app.services.Feed', [
  config
])
  .service('Feed', Feed)
  .name;
