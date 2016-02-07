import seedrandom from 'seedrandom';

const NUM_IMAGES = 6;

export default class GroupCtrl {
  constructor($routeParams, User, Group, Modal) {
    Object.assign(this, { User, Group, Modal });

    this.jumbotronBackground = `/images/header${Math.floor(seedrandom($routeParams.group)() * NUM_IMAGES)}.jpg`;

    this.loadGroup($routeParams.group);
  }

  /**
   * Load a group by it's urlName
   *
   * @param {string} urlName
   */
  loadGroup(urlName) {
    this.loading = true;
    this.Group
      .findOne({ urlName })
      .then((group) => {
        this.group = group;
      })
      .catch((error) => {
        this.error = error.message;
      })
      .then(() => this.loading = false);
  }
}

GroupCtrl.$inject = ['$routeParams', 'User', 'Group', 'Modal'];
