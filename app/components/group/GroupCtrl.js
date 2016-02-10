import seedrandom from 'seedrandom';

const NUM_IMAGES = 6;

export default class GroupCtrl {
  constructor($routeParams, User, Group, Modal) {
    Object.assign(this, { User, Group, Modal });

    // Set a random jumbotron background image seeded by the group name
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
      .then(group => this.Group.current = group)
      .catch(error => {
        this.error = error.message;
        this.Group.current = null;
      })
      .then(() => this.loading = false);
  }

  /**
   * Add the current logged in user to this group
   */
  addUserToGroup() {
    console.log(`Add user '${this.User.current.name}' to group '${this.Group.current.name}'`);
  }
}

GroupCtrl.$inject = ['$routeParams', 'User', 'Group', 'Modal'];
