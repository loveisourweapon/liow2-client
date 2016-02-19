import _ from 'lodash';
import seedrandom from 'seedrandom';
import jsonpatch from 'fast-json-patch';

const NUM_IMAGES = 6;

export default class GroupCtrl {
  constructor($rootScope, $scope, $routeParams, Alertify, User, Group, Campaign, Act, Modal) {
    Object.assign(this, { Alertify, User, Group, Campaign, Act, Modal });

    // Set a random jumbotron background image seeded by the group name
    this.jumbotronBackground = `/images/header${Math.floor(seedrandom($routeParams.group)() * NUM_IMAGES)}.jpg`;
    this.campaign = null;

    this.loadGroup($routeParams.group)
      .then(() => $rootScope.title = this.Group.current ? this.Group.current.name : null);

    let loginOff = this.User.on('login', user => this.setCampaignAlert(this.campaign, this.Group.current, user));
    let logoutOff = this.User.on('logout', () => this.setCampaignAlert(this.campaign, this.Group.current, null));
    $scope.$on('$destroy', () => {
      loginOff();
      logoutOff();
    });
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
      .catch(err => {
        this.err = err.message;
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
        this.setCampaignAlert(this.campaign, this.Group.current, this.User.current);
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
    this.showCampaignAlert = (
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
    let observer = jsonpatch.observe(user);
    user.groups.splice(user.groups.push(group._id));
    this.User.update(user, jsonpatch.generate(observer))
      .then(() => this.Alertify.success('Joined group'))
      .catch(err => null);
  }

  /**
   * Setup a campaign for the current group
   *
   * @param {object} group
   */
  setupCampaign(group) {
    this.Modal.openCampaignEdit('setup', group)
      .then(() => this.loadCampaign(group))
      .catch(err => null);
  }

  /**
   * Remove the user from the group
   *
   * @param {object} user
   * @param {object} group
   */
  leaveGroup(user, group) {
    if (group.owner === user._id) {
      return this.Modal.openAlert(`
        <p>You are the current owner of <strong>${group.name}</strong>.</p>
        <p>You'll need to make someone else the owner before leaving.</p>
      `);
    } else if (this.Group.isAdmin(group, user)) {
      return this.Modal.openAlert(`
        <p>You are currently an admin of <strong>${group.name}</strong>.</p>
        <p>You'll need to remove yourself as an admin before leaving.</p>
      `);
    } else {
      return this.Modal.openConfirm(`
        <p>Are you sure you want to leave this group?</p>
      `)
        .then(() => {
          let observer = jsonpatch.observe(user);
          user.groups.splice(user.groups.indexOf(group._id));
          return this.User.update(user, jsonpatch.generate(observer))
            .then(() => this.Alertify.success('Left group'));
        })
        .catch(err => null);
    }
  }
}

GroupCtrl.$inject = ['$rootScope', '$scope', '$routeParams', 'Alertify', 'User', 'Group', 'Campaign', 'Act', 'Modal'];
