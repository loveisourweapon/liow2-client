import seedrandom from 'seedrandom';

const NUM_IMAGES = 6;

export default class GroupCtrl {
  constructor($routeParams, Alertify, User, Group, Campaign, Act, Modal) {
    Object.assign(this, { Alertify, User, Group, Campaign, Act, Modal });

    // Set a random jumbotron background image seeded by the group name
    this.jumbotronBackground = `/images/header${Math.floor(seedrandom($routeParams.group)() * NUM_IMAGES)}.jpg`;
    this.campaign = null;

    this.loadGroup($routeParams.group);
  }

  /**
   * Load a group by it's urlName
   *
   * @param {string} urlName
   */
  loadGroup(urlName) {
    this.loading = true;
    this.Group
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
      .catch(() => ({ data: null }))
      .then(response => {
        this.campaign = response.data;
        if (this.campaign) this.Act.count({ campaign: this.campaign._id });
        this.showCampaignAlert = this.setCampaignAlert(this.campaign, this.Group.current, this.User.current);
      });
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

GroupCtrl.$inject = ['$routeParams', 'Alertify', 'User', 'Group', 'Campaign', 'Act', 'Modal'];
