export default class DeedCtrl {
  constructor($rootScope, $routeParams, Alertify, User, Group, Deed, Act, Feed, Modal) {
    Object.assign(this, { Alertify, User, Group, Deed, Act, Feed, Modal });

    this.feedItems = null;

    this.loadDeed($routeParams.deed)
      .then(() => $rootScope.title = this.Deed.current ? this.Deed.current.title : null);
  }

  /**
   * Load a deed by urlTitle
   *
   * @param {string} urlTitle
   */
  loadDeed(urlTitle) {
    this.loading = true;
    return this.Deed
      .findOne({ urlTitle })
      .then(deed => {
        this.Deed.current = deed;
        this.Act.count({ deed: deed._id });
        this.loadFeed(deed);
      })
      .catch(error => {
        this.error = error.message;
        this.Deed.current = null;
      })
      .then(() => this.loading = false);
  }

  /**
   * Load feed items
   *
   * @param {object} deed
   * @param {object} [params={}]
   */
  loadFeed(deed, params = {}) {
    this.loadingFeed = true;
    this.Feed.find(_.merge({ 'target.deed': deed._id }, params))
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
   * Register a deed as done
   *
   * @param {object} deed
   * @param {object} [group=null]
   */
  done(deed, group = null) {
    this.doing = true;
    this.Act.done(deed, group)
      .then(() => {
        this.Act.count();
        this.Act.count({ deed: deed._id });
        this.loadFeed(deed);
        this.Alertify.success('Deed done!');
      })
      .catch(() => this.Alertify.error('Failed registering deed'))
      .then(() => this.doing = false);
  }

  /**
   * Write a deed testimony
   *
   * @param {object} deed
   * @param {object} [group=null]
   */
  testimony(deed, group = null) {
    this.Modal.openCommentEdit('Leave a Testimony for ', deed, group)
      .then(() => this.loadFeed(deed))
      .catch(() => null);
  }
}

DeedCtrl.$inject = ['$rootScope', '$routeParams', 'Alertify', 'User', 'Group', 'Deed', 'Act', 'Feed', 'Modal'];
