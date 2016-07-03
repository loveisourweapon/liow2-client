import each from 'lodash/each';
import map from 'lodash/map';

class HomeFeedController {
  /* @ngInject */
  constructor(User, Act, Feed) {
    Object.assign(this, { User, Act, Feed });
  }

  /**
   * Component is being initialised
   */
  $onInit() {
    if (this.User.isAuthenticated() && this.User.current) {
      this.Feed.update({ refresh: true });
      this.countAllGroupActs(this.User.current.groups);
    }

    this.loginOff = this.User.on('login', user => {
      this.Feed.update({ refresh: true });
      this.countAllGroupActs(user.groups);
    });
    this.logoutOff = this.User.on('logout', () => this.Feed.update({ clear: true }));
  }

  /**
   * Component is being destroyed
   */
  $onDestroy() {
    this.loginOff();
    this.logoutOff();
  }

  /**
   * Create a comma-separated list of group ID's
   *
   * @param {object[]} groups
   *
   * @returns {string|null}
   */
  listGroupIds(groups) {
    return (groups && groups.length) ? map(groups, '_id').join(',') : null;
  }

  /**
   * Count acts for a set of groups
   *
   * @param {object[]} groups
   */
  countAllGroupActs(groups) {
    each(groups, group => this.Act.count({ group: group._id }));
  }
}

export default HomeFeedController;
