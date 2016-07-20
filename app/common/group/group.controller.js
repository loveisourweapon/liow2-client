import angular from 'angular';
import has from 'lodash/has';
import find from 'lodash/find';
import findLast from 'lodash/findLast';
import isNull from 'lodash/isNull';
import seedrandom from 'seedrandom';
import jsonpatch from 'fast-json-patch';

const NUM_IMAGES = 6;

class GroupController {
  /* @ngInject */
  constructor($rootScope, $state, $q, Alertify, User, Group, Campaign, Act, Feed, Modal) {
    Object.assign(this, { $rootScope, $state, $q, Alertify, User, Group, Campaign, Act, Feed, Modal });
  }

  /**
   * Component is initialised
   */
  $onInit() {
    this.$rootScope.title = this.group.name;
    this.activeTab = 0;
    this.campaign = null;
    if (this.User.isMemberOfGroup(this.group)) this.activeTab = 1;
    this.Act.count({ group: this.group._id });
    this.loadCampaign(this.group);
    if (this.User.isAuthenticated()) this.Feed.update({ refresh: true });

    this.Group.current = this.group;

    // Set a random jumbotron background image seeded by the group name
    this.jumbotronBackground = `/images/header${Math.floor(seedrandom(this.group._id)() * NUM_IMAGES)}.jpg`;

    this.loginOff = this.User.on('login', user => {
      this.Feed.update({ refresh: true });
      this.setCampaignAlert(this.campaign, this.Group.current, user);
      if (this.User.isMemberOfGroup(this.Group.current)) this.activeTab = 1;
    });
    this.logoutOff = this.User.on('logout', () => {
      this.Feed.update({ clear: true });
      this.setCampaignAlert(this.campaign, this.Group.current, null);
      this.activeTab = 0;
    });
  }

  /**
   * Component bindings updated
   *
   * @param {object} changes
   */
  $onChanges(changes) {
    if (changes.group) {
      this.group = angular.copy(this.group);
    }
  }

  /**
   * Component is being destroyed
   */
  $onDestroy() {
    this.loginOff();
    this.logoutOff();
  }

  /**
   * Load the active campaign
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
          this.currentDeed = findLast(this.campaign.deeds, { published: true });
          this.$state.go('.', { setupCampaign: null });
        } else {
          if (this.setupCampaign) {
            this.editCampaign('create', this.Group.current)
              .then(() => this.$state.go('.', { setupCampaign: null }));
          }
        }

        this.setCampaignAlert(this.campaign, this.Group.current, this.User.current);
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
    this.showCampaignAlert = (
      isNull(campaign) &&
      has(group, 'admins') &&
      has(user, '_id') &&
      ~group.admins.indexOf(user._id)
    );
  }

  /**
   * Create or edit a campaign for the current group
   *
   * @oaram {string} [action='create']
   * @param {object} group
   * @param {object} [campaign=null]
   *
   * @returns {Promise}
   */
  editCampaign(action = 'create', group, campaign = null) {
    return this.Modal.openCampaignEdit(action, group, campaign)
      .then(() => this.loadCampaign(group));
  }

  /**
   * Finish the current campaign
   *
   * @param {object} campaign
   */
  finishCampaign(campaign) {
    this.Modal.openConfirm('Are you sure you want to finish this campaign?', 'Finish Campaign')
      .then(() => {
        let observer = jsonpatch.observe(campaign);
        campaign.active = false;
        campaign.dateEnd = new Date();
        return this.Campaign.update(campaign, jsonpatch.generate(observer));
      })
      .then(() => {
        this.Alertify.success('Finished campaign');
        this.loadCampaign(this.Group.current);
      })
      .catch(() => campaign.active = true);
  }

  /**
   * Set a deed as published/unpublished for a campaign
   *
   * @param {object}  campaign
   * @param {object}  deed
   * @param {boolean} [published=true]
   */
  setPublished(campaign, deed, published = true) {
    let observer = jsonpatch.observe(campaign);
    let campaignDeed = find(campaign.deeds, { deed : { _id : deed._id } });
    campaignDeed.published = published;
    this.Campaign.update(campaign, jsonpatch.generate(observer))
      .then(() => this.Alertify.success(
        `${published ? 'Published' : 'Unpublished'} deed <strong>${campaignDeed.deed.title}</strong>`
      ))
      .then(() => this.loadCampaign(this.Group.current))
      .catch(() => campaignDeed.published = !published);
  }

  /**
   * Add the current logged in user to this group
   *
   * @param {object} user
   * @param {object} group
   */
  joinGroup(user, group) {
    let observer = jsonpatch.observe(user);
    user.groups.push(group._id);
    this.User.update(user, jsonpatch.generate(observer))
      .then(() => this.Alertify.success(`Joined group <strong>${group.name}</strong>`))
      .then(() => this.User.group = group)
      .then(() => this.activeTab = 1)
      .catch(() => user.groups.splice(user.groups.indexOf(groups._id)));
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
        You are the current owner of **${group.name}**.
        
        You'll need to make someone else the owner before leaving.
      `, 'Leave Group');
    } else if (this.Group.isAdmin(group, user)) {
      return this.Modal.openAlert(`
        You are currently an admin of **${group.name}**.
        
        You'll need to remove yourself as an admin before leaving.
      `, 'Leave Group');
    } else {
      const cancelConfirm = Symbol('cancelConfirm');
      return this.Modal.openConfirm(`Are you sure you want to leave **${group.name}**?`, 'Leave Group')
        .catch(() => this.$q.reject(cancelConfirm))
        .then(() => {
          let observer = jsonpatch.observe(user);
          user.groups.splice(user.groups.indexOf(group._id));
          return this.User.update(user, jsonpatch.generate(observer));
        })
        .then(() => this.Alertify.success(`Left group <strong>${group.name}</strong>`))
        .then(() => this.activeTab = 0)
        .catch(reason => (reason !== cancelConfirm) && user.groups.push(group));
    }
  }
}

export default GroupController;
