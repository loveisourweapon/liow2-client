class WelcomeController {
  /* @ngInject */
  constructor(User, Group, Act, Modal) {
    Object.assign(this, { User, Group, Act, Modal });
  }

  /**
   * Component is initialised
   */
  $onInit() {
    this.Group.find({ count: true })
      .then(groupsCount => this.numberOfGroups = Number(groupsCount));

    this.User.find({ count: true })
      .then(usersCount => this.numberOfUsers = Number(usersCount));
  }
}

export default WelcomeController;
