export default class WelcomeCtrl {
  /* @ngInject */
  constructor(User, Group, Act, Modal) {
    Object.assign(this, { Act, Modal });

    Group.find({ count: true })
      .then(response => this.numberOfGroups = Number(response.data));

    User.find({ count: true })
      .then(response => this.numberOfUsers = Number(response.data));
  }
}
