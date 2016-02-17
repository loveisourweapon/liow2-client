import _ from 'lodash';
import angular from 'angular';

// Module dependencies
import config from '../config';

let currentGroup = null;

class Group {
  constructor($http, $q, config) {
    Object.assign(this, { $http, $q });

    this.baseUrl = `${config.serverUrl}/groups`;
  }

  /**
   * Find groups by params
   *
   * @param {object} [params={}]
   *
   * @returns {HttpPromise}
   */
  find(params = {}) {
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
    return this.$q((resolve, reject) => {
      this.find(params)
        .then(response => {
          if (response.data.length === 1) {
            resolve(response.data[0]);
          } else {
            reject(new Error('Group not found'));
          }
        })
        .catch(() => reject(new Error('Failed connecting to server')));
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
   * Save a new or existing group
   *
   * @param {object} group
   *
   * @returns {HttpPromise}
   */
  save(group) {
    if (_.has(group, '_id')) {
      return this.$http.put(`${this.baseUrl}/${group._id}`, group);
    } else {
      return this.$http.post(this.baseUrl, group);
    }
  }

  /**
   * Check if a user is an admin of a group
   *
   * @param {object} group
   * @param {object} user
   *
   * @returns {boolean}
   */
  isAdmin(group, user) {
    return _.has(group, 'admins') && _.has(user, '_id') && group.admins.indexOf(user._id) > -1;
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

Group.$inject = ['$http', '$q', 'config'];

export default angular.module('app.services.Group', [config])
  .service('Group', Group)
  .name;
