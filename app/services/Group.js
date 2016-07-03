import angular from 'angular';
import has from 'lodash/has';
import find from 'lodash/find';
import merge from 'lodash/merge';

// Module dependencies
import Config from '../common/config';
import User from './User';

let currentGroup = null;

class Group {
  /* @ngInject */
  constructor($http, $q, config, User) {
    Object.assign(this, { $http, $q, User });

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
    params = merge({ query }, params);

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
    if (has(group, '_id')) {
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
    return has(group, 'admins') && has(user, '_id') && ~group.admins.indexOf(user._id);
  }

  /**
   * Set the current group
   *
   * @param {object|null} group
   */
  set current(group) {
    currentGroup = group;

    // If the current user is a member of this group, make it their active group
    if (this.User.current && find(this.User.current.groups, ['id', group._id])) {
      this.User.group = group;
    }
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

const groupService = angular
  .module('app.services.Group', [
    Config,
    User,
  ])
  .service('Group', Group)
  .name;

export default groupService;
