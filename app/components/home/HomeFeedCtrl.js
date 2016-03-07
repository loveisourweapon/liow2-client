import _ from 'lodash';

export default class HomeFeedCtrl {
  constructor($scope, User, Act, Feed) {
    Object.assign(this, { User, Act, Feed });

    this.feedItems = null;
    if (this.User.isAuthenticated() && this.User.current) {
      this.loadFeed(this.User.current);
      this.countAllGroupActs(this.User.current.groups);
    }

    let loginOff = this.User.on('login', user => {
      this.loadFeed(user);
      this.countAllGroupActs(user.groups);
    });
    let logoutOff = this.User.on('logout', () => this.feedItems = null);
    $scope.$on('$destroy', () => loginOff() && logoutOff());
  }

  /**
   * Load feed items
   *
   * @param {object} user
   * @param {object} [params={}]
   */
  loadFeed(user, params = {}) {
    this.loading = true;
    this.Feed.find(_.merge({ user: user._id, group: _.map(user.groups, '_id').join(',') }, params))
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
      .then(() => this.loading = false);
  }

  /**
   * Count acts for a set of groups
   *
   * @param {object[]} groups
   */
  countAllGroupActs(groups) {
    _.each(groups, group => this.Act.count({ group: group._id }));
  }
}

HomeFeedCtrl.$inject = ['$scope', 'User', 'Act', 'Feed'];
