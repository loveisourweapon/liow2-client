import ConfirmEmailController from './confirm-email.controller';

const ConfirmEmailComponent = {
  bindings: {
    token: '<',
  },
  controller: ConfirmEmailController,
  template: `
    <jumbotron jumbo-background="'/images/header.jpg'"></jumbotron>
    
    <div class="container container-pad">
      <div class="row">
        <loading-spinner size="2x" classes="middle">
          Confirming your email address
        </loading-spinner>
      </div>
    </div>
  `
};

export default ConfirmEmailComponent;
