import has from 'lodash/has';

class SignupController {
  /* @ngInject */
  constructor($uibModalInstance, $stateParams, Alertify, User, Group, Modal, canSwitch) {
    Object.assign(this, { $uibModalInstance, Alertify, User, Group, Modal, canSwitch });

    this.error = null;
    this.joinGroup = null;
    if (has($stateParams, 'group')) {
      this.joinGroup = true;
    }

    this.resetFields();
  }

  /**
   * Reset all form fields to defaults
   */
  resetFields() {
    this.user = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      picture: undefined
    };
  }

  /**
   * Authenticate user with Facebook
   *
   * @param {boolean|null} joinGroup
   */
  authenticateFacebook(joinGroup) {
    let userData = {};
    if (joinGroup) {
      userData.group = this.Group.current._id;
    }

    this.saving = true;
    this.User.authenticateFacebook(userData)
      .then(() => {
        if (joinGroup) {
          this.User.group = this.Group.current;
        }

        this.$uibModalInstance.close();
        this.Alertify.success('Signed in');
      })
      .catch(() => this.Alertify.error('Failed signing in'))
      .then(() => this.saving = false);
  }

  /**
   * Save the User
   *
   * @param {object} user
   * @param {boolean} joinGroup
   */
  save(user, joinGroup) {
    if (joinGroup) {
      user.groups = [this.Group.current._id];
    }

    this.saving = true;
    this.error = null;
    this.User.save(user)
      .then(() => {
        if (joinGroup) {
          this.User.group = this.Group.current;
        }

        this.Alertify.success('Signed up. Please confirm your email address');
        return this.User.authenticateEmail(user.email, user.password);
      })
      .then(() => this.$uibModalInstance.close())
      .catch(response => this.error = response.data.error)
      .then(() => this.saving = false);
  }
}

export default SignupController;
