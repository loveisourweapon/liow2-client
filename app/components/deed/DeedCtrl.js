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
   */
  loadFeed(deed) {
    if (!this.User.isAuthenticated()) {
      return this.feed = [];
    }

    this.Feed.find({ 'target.deed': deed._id })
      .then(response => this.feedItems = response.data);
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
