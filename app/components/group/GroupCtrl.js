import _ from 'lodash';
import seedrandom from 'seedrandom';
import jsonpatch from 'fast-json-patch';

const NUM_IMAGES = 6;

export default class GroupCtrl {
  constructor($rootScope, $scope, $routeParams, $location, Alertify, User, Group, Campaign, Act, Feed, Modal) {
    Object.assign(this, { $location, Alertify, User, Group, Campaign, Act, Feed, Modal });

    // Set a random jumbotron background image seeded by the group name
    this.jumbotronBackground = `/images/header${Math.floor(seedrandom($routeParams.group)() * NUM_IMAGES)}.jpg`;
    this.activeTab = 0;
    this.campaign = null;
    this.feedItems = null;

    this.loadGroup($routeParams.group)
      .then(() => $rootScope.title = this.Group.current ? this.Group.current.name : null);

    let loginOff = this.User.on('login', user => {
      if (this.Group.current) this.loadFeed(this.Group.current);
      this.setCampaignAlert(this.campaign, this.Group.current, user);
      if (this.User.isMemberOfGroup(this.Group.current)) this.activeTab = 1;
    });
    let logoutOff = this.User.on('logout', () => {
      this.feedItems = null;
      this.setCampaignAlert(this.campaign, this.Group.current, null);
      this.activeTab = 0;
    });
    $scope.$on('$destroy', () => loginOff() && logoutOff());
  }

  /**
   * Load a group by it's urlName
   *
   * @param {string} urlName
   *
   * @returns {Promise}
   */
  loadGroup(urlName) {
    this.loading = true;
    return this.Group.findOne({ urlName })
      .then(group => {
        this.Group.current = group;
        if (this.User.isMemberOfGroup(this.Group.current)) this.activeTab = 1;
        this.Act.count({ group: group._id });
        this.loadCampaign(group);
        if (this.User.isAuthenticated()) this.loadFeed(group);
      })
      .catch(err => {
        this.error = err.message;
        this.Group.current = null;
      })
      .then(() => this.loading = false);
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
          this.currentDeed = _.findLast(this.campaign.deeds, { published: true });
          this.$location.search('setupCampaign', null);
        } else {
          if (_.has(this.$location.search(), 'setupCampaign')) {
            this.editCampaign('create', this.Group.current)
              .then(() => this.$location.search('setupCampaign', null));
          }
        }

        this.setCampaignAlert(this.campaign, this.Group.current, this.User.current);
      });
  }

  /**
   * Load feed items
   *
   * @param {object} group
   * @param {object} [params={}]
   */
  loadFeed(group, params = {}) {
    this.loadingFeed = true;
    this.Feed.find(_.merge({ group: group._id }, params))
      .then(response => {
        if (_.has(params, 'before')) {
          this.feedItems = this.feedItems.concat(response.data);
        } else if (_.has(params, 'after')) {
          this.feedItems = response.data.concat(this.feedItems);
        } else {
          this.feedItems = response.data;
        }
      })
      .catch(() => null)
      .then(() => this.loadingFeed = false);
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
      .then(() => this.loadCampaign(group))
      .catch(err => null);
  }

  /**
   * Finish the current campaign
   *
   * @param {object} campaign
   */
  finishCampaign(campaign) {
    this.Modal.openConfirm('<p>Are you sure you want to finish this campaign?</p>')
      .then(() => {
        let observer = jsonpatch.observe(campaign);
        campaign.active = false;
        campaign.dateEnd = new Date();
        return this.Campaign.update(campaign, jsonpatch.generate(observer));
      })
      .then(() => this.Alertify.success('Finished campaign'))
      .then(() => this.loadCampaign(this.Group.current))
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
    let campaignDeed = _.find(campaign.deeds, { deed : { _id : deed._id } });
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
        <p>You are the current owner of <strong>${group.name}</strong>.</p>
        <p>You'll need to make someone else the owner before leaving.</p>
      `);
    } else if (this.Group.isAdmin(group, user)) {
      return this.Modal.openAlert(`
        <p>You are currently an admin of <strong>${group.name}</strong>.</p>
        <p>You'll need to remove yourself as an admin before leaving.</p>
      `);
    } else {
      return this.Modal.openConfirm(`<p>Are you sure you want to leave <strong>${group.name}</strong>?</p>`)
        .then(() => {
          let observer = jsonpatch.observe(user);
          user.groups.splice(user.groups.indexOf(group._id));
          return this.User.update(user, jsonpatch.generate(observer));
        })
        .then(() => this.Alertify.success(`Left group <strong>${group.name}</strong>`))
        .then(() => this.activeTab = 0)
        .catch(() => user.groups.push(group));
    }
  }
}

GroupCtrl.$inject = ['$rootScope', '$scope', '$routeParams', '$location', 'Alertify', 'User', 'Group', 'Campaign', 'Act', 'Feed', 'Modal'];
