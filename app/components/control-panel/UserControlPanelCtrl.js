import jsonpatch from 'fast-json-patch';

export default class UserControlPanelCtrl {
  /* @ngInject */
  constructor(Alertify, User, Act, Modal) {
    Object.assign(this, { Alertify, User, Act, Modal });
  }

  /**
   * Component is initialised
   */
  $onInit() {
    if (this.User.current) {
      this.Act.count({ user: this.User.current._id });
    } else {
      this.loading = true;
    }

    this.loginOff = this.User.on('login', user => {
      this.Act.count({ user: user._id });
      this.loading = false;
    });
  }

  /**
   * Component is being destroyed
   */
  $onDestroy() {
    this.loginOff();
  }

  /**
   * Toggle the user name edit form
   *
   * @param {object} user
   */
  toggleEditName(user) {
    this.editingName = !this.editingName;

    if (this.editingName) {
      this.observer = jsonpatch.observe(user);
    } else {
      jsonpatch.unobserve(user, this.observer);
    }
  }

  /**
   * Save the user's name
   *
   * @param {object} user
   */
  saveName(user) {
    this.User.update(user, jsonpatch.generate(this.observer))
      .then(() => this.Alertify.success('Updated name'))
      .catch(() => this.Alertify.error('Failed updating name'))
      .then(() => this.toggleEditName(user));
  }

  /**
   * Send confirm email address email
   *
   * @param {string} email
   */
  sendConfirmEmail(email) {
    this.sending = true;
    this.User.sendConfirmEmail(email)
      .then(() => this.Alertify.success(`Sent confirmation email to <strong>${email}</strong>`))
      .catch(() => this.Alertify.error('Failed sending confirmation email'))
      .then(() => this.sending = false);
  }
}
