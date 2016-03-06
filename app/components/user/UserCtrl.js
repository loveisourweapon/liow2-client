import seedrandom from 'seedrandom';

const NUM_IMAGES = 6;

export default class UserCtrl {
  constructor($rootScope, $routeParams, User, Act, Feed) {
    Object.assign(this, { User, Act, Feed });

    // Set a random jumbotron background image seeded by the user ID
    this.jumbotronBackground = `/images/header${Math.floor(seedrandom($routeParams.user)() * NUM_IMAGES)}.jpg`;
    this.feedItems = null;

    this.loadUser($routeParams.user)
      .then(() => $rootScope.title = this.user ?
        this.user.firstName + (this.user.lastName ? ` ${this.user.lastName}` : '') :
        null
      );
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
        this.loadFeed(this.user);
      })
      .catch(() => {
        this.error = 'User not found';
        this.user = null;
      })
      .then(() => this.loading = false);
  }

  /**
   * Load feed items
   *
   * @param {object} user
   * @param {object} [params={}]
   */
  loadFeed(user, params = {}) {
    this.loadingFeed = true;
    this.Feed.find(_.merge({ user: user._id }, params))
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
}

UserCtrl.$inject = ['$rootScope', '$routeParams', 'User', 'Act', 'Feed'];
