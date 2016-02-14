import seedrandom from 'seedrandom';

const NUM_IMAGES = 6;

export default class GroupCtrl {
  constructor($routeParams, User, Group, Campaign, Modal) {
    Object.assign(this, { User, Group, Campaign, Modal });

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
        this.showCampaignAlert = this.setCampaignAlert(group, this.User.current);
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
      .then(campaigns => this.campaigns = campaigns)
      .catch(error => this.error = error.message);
  }

  /**
   * Show hint to setup a campaign if logged in as admin of group with no active campaign
   *
   * @param {object} group
   * @param {user} user
   *
   * @returns {boolean}
   */
  setCampaignAlert(group, user) {
    return (
      _.has(group, 'admins') &&
      _.has(user, '_id') &&
      group.admins.indexOf(user._id) !== -1
    );
  }

  /**
   * Add the current logged in user to this group
   */
  addUserToGroup() {
    console.log(`Add user '${this.User.current.name}' to group '${this.Group.current.name}'`);
  }
}

GroupCtrl.$inject = ['$routeParams', 'User', 'Group', 'Campaign', 'Modal'];
