import _ from 'lodash';
import angular from 'angular';
import config from '../../config';

let currentGroup = null;

class Group {
  constructor($http) {
    Object.assign(this, { $http });

    this.baseUrl = `${config.serverUrl}/groups`;
  }

  /**
   * Find groups by params
   *
   * @param {object} params
   *
   * @returns {HttpPromise}
   */
  find(params) {
    return this.$http.get(this.baseUrl, { params });
  }

  /**
   * Find a single group by params
   *
   * @param {object} params
   *
   * @returns {Promise}
   */
  findOne(params) {
    return new Promise((resolve, reject) => {
      this.find(params)
        .then((response) => {
          if (response.data.length === 1) {
            resolve(response.data[0]);
          } else {
            reject(new Error('Group not found'));
          }
        })
        .catch(() => {
          reject(new Error('Failed connecting to server'));
        });
    });
  }

  /**
   * Search for groups with a search query and optional params
   *
   * @param {string} query
   * @param {object} params
   *
   * @returns {HttpPromise}
   */
  search(query, params) {
    params = _.merge({ query }, params);

    return this.find(params);
  }

  /**
   * Set the current group
   *
   * @param {object|null} group
   */
  set current(group) {
    currentGroup = group;
  }

  /**
   * Get the current group
   *
   * @returns {object|null}
   */
  get current() {
    return currentGroup;
  }
}
Group.$inject = ['$http'];

export default angular.module('app.services.Group', [])
  .service('Group', Group)
  .name;
