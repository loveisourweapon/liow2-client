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
      .then(response => this.numberOfGroups = Number(response.data));

    this.User.find({ count: true })
      .then(response => this.numberOfUsers = Number(response.data));
  }
}

export default WelcomeController;
