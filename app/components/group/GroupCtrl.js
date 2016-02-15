import seedrandom from 'seedrandom';

const NUM_IMAGES = 6;

export default class GroupCtrl {
  constructor($routeParams, Alertify, User, Group, Campaign, Modal) {
    Object.assign(this, { Alertify, User, Group, Campaign, Modal });

    // Set a random jumbotron background image seeded by the group name
    this.jumbotronBackground = `/images/header${Math.floor(seedrandom($routeParams.group)() * NUM_IMAGES)}.jpg`;
    this.campaigns = null;

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
        this.loadCampaigns(group);
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
  loadCampaigns(group) {
    this.Campaign.find({ group: group._id, active: true })
      .then(response => {
        this.campaigns = response.data;
        this.showCampaignAlert = this.setCampaignAlert(this.campaigns, this.Group.current, this.User.current);
      })
      .catch(error => this.error = error.message);
  }

  /**
   * Show hint to setup a campaign if logged in as admin of group with no active campaign
   *
   * @param {array}  campaigns
   * @param {object} group
   * @param {object} user
   *
   * @returns {boolean}
   */
  setCampaignAlert(campaigns, group, user) {
    return (
      _.isEmpty(campaigns) &&
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
      .then(response => this.Alertify.success('Joined group'))
      .catch(err => null);
  }
}

GroupCtrl.$inject = ['$routeParams', 'Alertify', 'User', 'Group', 'Campaign', 'Modal'];
