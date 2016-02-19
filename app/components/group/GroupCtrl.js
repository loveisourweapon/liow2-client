import _ from 'lodash';
import seedrandom from 'seedrandom';

const NUM_IMAGES = 6;

export default class GroupCtrl {
  constructor($rootScope, $routeParams, Alertify, User, Group, Campaign, Act, Modal) {
    Object.assign(this, { Alertify, User, Group, Campaign, Act, Modal });

    // Set a random jumbotron background image seeded by the group name
    this.jumbotronBackground = `/images/header${Math.floor(seedrandom($routeParams.group)() * NUM_IMAGES)}.jpg`;
    this.campaign = null;

    this.loadGroup($routeParams.group)
      .then(() => $rootScope.title = this.Group.current ? this.Group.current.name : null);
  }

  /**
   * Load a group by it's urlName
   *
   * @param {string} urlName
   */
  loadGroup(urlName) {
    this.loading = true;
    return this.Group
      .findOne({ urlName })
      .then(group => {
        this.Group.current = group;
        this.Act.count({ group: group._id });
        this.loadCampaign(group);
      })
      .catch(error => {
        this.error = error.message;
        this.Group.current = null;
      })
      .then(() => this.loading = false);
  }

  /**
   * Load all active campaigns
   *
   * @param {object} group
   */
  loadCampaign(group) {
    this.Campaign.findOne({ group: group._id, active: true })
      .catch(() => null)
      .then(campaign => {
        this.campaign = campaign;
        if (this.campaign) {
          this.Act.count({ campaign: this.campaign._id });
          this.currentDeed = _.findLast(this.campaign.deeds, { published: true });
        }
        this.showCampaignAlert = this.setCampaignAlert(this.campaign, this.Group.current, this.User.current);
      });
  }

  /**
   * Set a deed as published/unpublished for a campaign
   *
   * @param {object}  campaign
   * @param {object}  deed
   * @param {boolean} [published=true]
   */
  setPublished(campaign, deed, published = true) {
    this.Campaign.setPublished(campaign, deed, published)
      .then(() => this.loadCampaign(this.Group.current))
      .catch(err => null);
  }

  /**
   * Show hint to setup a campaign if logged in as admin of group with no active campaign
   *
   * @param {object} campaign
   * @param {object} group
   * @param {object} user
   *
   * @returns {boolean}
   */
  setCampaignAlert(campaign, group, user) {
    return (
      _.isNull(campaign) &&
      _.has(group, 'admins') &&
      _.has(user, '_id') &&
      group.admins.indexOf(user._id) !== -1
    );
  }

  /**
   * Add the current logged in user to this group
   *
   * @param {object} user
   * @param {object} group
   */
  addUserToGroup(user, group) {
    this.User.update(user, { groups: group._id })
      .then(() => {
        this.User.group = group;
        this.Alertify.success('Joined group');
      })
      .catch(error => null);
  }

  /**
   * Setup a campaign for the current group
   *
   * @param {group} group
   */
  setupCampaign(group) {
    this.Modal.openCampaignEdit('setup', group)
      .then(() => this.loadCampaign(group))
      .catch(error => null);
  }
}

GroupCtrl.$inject = ['$rootScope', '$routeParams', 'Alertify', 'User', 'Group', 'Campaign', 'Act', 'Modal'];
