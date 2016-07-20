import angular from 'angular';
import seedrandom from 'seedrandom';

const NUM_IMAGES = 6;

class UserController {
  /* @ngInject */
  constructor($rootScope, User, Act, Feed, Modal) {
    Object.assign(this, { $rootScope, User, Act, Feed, Modal });
  }

  /**
   * Component is initialised
   */
  $onInit() {
    this.$rootScope.title = this.user.name;
    this.Act.count({ user: this.user._id });
    if (this.User.isAuthenticated()) this.Feed.update(true);

    // Set a random jumbotron background image seeded by the user ID
    this.jumbotronBackground = `/images/header${Math.floor(seedrandom(this.user._id)() * NUM_IMAGES)}.jpg`;

    this.loginOff = this.User.on('login', () => this.Feed.update({ refresh: true }));
    this.logoutOff = this.User.on('logout', () => this.Feed.update({ clear: true }));
  }

  /**
   * Component bindings updated
   *
   * @param {object} changes
   */
  $onChanges(changes) {
    if (changes.user) {
      this.user = angular.copy(this.user);
    }
  }

  /**
   * Component is being destroyed
   */
  $onDestroy() {
    this.loginOff();
    this.logoutOff();
  }
}

export default UserController;
