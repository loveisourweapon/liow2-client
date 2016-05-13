import seedrandom from 'seedrandom';

const NUM_IMAGES = 6;

export default class UserCtrl {
  /* @ngInject */
  constructor($rootScope, $scope, $routeParams, User, Act, Feed, Modal) {
    Object.assign(this, { User, Act, Feed, Modal });

    // Set a random jumbotron background image seeded by the user ID
    this.jumbotronBackground = `/images/header${Math.floor(seedrandom($routeParams.user)() * NUM_IMAGES)}.jpg`;

    this.loadUser($routeParams.user)
      .then(() => $rootScope.title = this.user ?
        this.user.firstName + (this.user.lastName ? ` ${this.user.lastName}` : '') :
        null
      );

    let loginOff = this.User.on('login', () => this.Feed.update({ refresh: true }));
    let logoutOff = this.User.on('logout', () => this.Feed.update({ clear: true }));
    $scope.$on('$destroy', () => loginOff() && logoutOff());
  }

  /**
   * Load a user by ID
   *
   * @param {string} userId
   *
   * @returns {Promise}
   */
  loadUser(userId) {
    this.loading = true;
    return this.User.findById(userId)
      .then(response => {
        this.user = response.data;
        this.Act.count({ user: this.user._id });
        if (this.User.isAuthenticated()) this.Feed.update(true);
      })
      .catch(() => {
        this.error = 'User not found';
        this.user = null;
      })
      .then(() => this.loading = false);
  }
}
