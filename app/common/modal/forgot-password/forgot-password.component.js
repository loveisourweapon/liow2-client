import ForgotPasswordController from './forgot-password.controller';

export const ForgotPasswordComponent = {
  controller: ForgotPasswordController,
  template: `
    <div class="modal-header">
      <button type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              ng-click="$ctrl.$uibModalInstance.dismiss()">
        <span aria-hidden="true"><i class="fa fa-times"></i></span>
      </button>
      <h4 class="modal-title">
        Forgot your password?
      </h4>
    </div><!-- .modal-header -->
    
    <div class="modal-body">
      <form name="forgotPassword"
            ng-submit="$ctrl.form.$valid && $ctrl.send($ctrl.email)"
            novalidate>
        <span ng-init="$ctrl.form = forgotPassword"></span>
    
        <div class="form-group"
             ng-class="{ 'has-error': $ctrl.form.$submitted && $ctrl.form.email.$invalid }">
          <label for="email"
                 class="control-label">
            Your email address
          </label>
          <input type="email"
                 class="form-control"
                 id="email"
                 name="email"
                 placeholder="Email address..."
                 ng-model="$ctrl.email"
                 required
                 autofocus>
          <span class="help-block"
                ng-if="$ctrl.form.$submitted && $ctrl.form.email.$error.email">
            Please enter a valid email address.
          </span>
        </div>
    
        <button type="submit" hidden></button>
      </form>
    </div><!-- .modal-body -->
    
    <div class="modal-footer">
      <button type="submit"
              class="btn btn-primary btn-block"
              ng-click="$ctrl.form.$valid && $ctrl.send($ctrl.email)"
              ng-disabled="$ctrl.form.$pristine || $ctrl.sending">
        <i class="fa fa-fw fa-cog fa-spin" ng-show="$ctrl.sending"></i>
        Email me a recovery link
      </button>
    </div><!-- .modal-footer -->
  `
};
