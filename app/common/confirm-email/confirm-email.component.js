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
        <div class="col-xs-12">
          <i class="fa fa-fw fa-cog fa-2x fa-spin middle"></i>
          Confirming your email address
        </div>
      </div>
    </div>
  `
};

export default ConfirmEmailComponent;
