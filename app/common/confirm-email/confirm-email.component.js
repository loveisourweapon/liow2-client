import ConfirmEmailController from './confirm-email.controller';
import confirmEmailTemplate from './confirm-email.html';

const ConfirmEmailComponent = {
  bindings: {
    token: '<',
  },
  controller: ConfirmEmailController,
  template: confirmEmailTemplate,
};

export default ConfirmEmailComponent;
