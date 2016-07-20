import ResetPasswordController from './reset-password.controller';
import resetPasswordTemplate from './reset-password.html';

const ResetPasswordComponent = {
  bindings: {
    token: '<',
  },
  controller: ResetPasswordController,
  template: resetPasswordTemplate,
};

export default ResetPasswordComponent;
