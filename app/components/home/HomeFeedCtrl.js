import _ from 'lodash';

export default class HomeFeedCtrl {
  /* @ngInject */
  constructor($scope, User, Act, Feed) {
    Object.assign(this, { User, Act });

    if (this.User.isAuthenticated() && this.User.current) {
      Feed.update({ refresh: true });
      this.countAllGroupActs(this.User.current.groups);
    }

    let loginOff = this.User.on('login', user => {
      Feed.update({ refresh: true });
      this.countAllGroupActs(user.groups);
    });
    let logoutOff = this.User.on('logout', () => Feed.update({ clear: true }));
    $scope.$on('$destroy', () => loginOff() && logoutOff());
  }

  /**
   * Create a comma-separated list of group ID's
   *
   * @param {object[]} groups
   *
   * @returns {string|null}
   */
  listGroupIds(groups) {
    return (groups && groups.length) ? _.map(groups, '_id').join(',') : null;
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
