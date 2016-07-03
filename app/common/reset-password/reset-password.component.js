import ResetPasswordController from './reset-password.controller';

const ResetPasswordComponent = {
  bindings: {
    token: '<',
  },
  controller: ResetPasswordController,
  template: `
    <jumbotron jumbo-background="'/images/header.jpg'"></jumbotron>

    <div class="container container-pad">
      <div class="row">
        <div class="col-xs-12 col-sm-8 col-sm-push-2 col-md-6 col-md-push-3">
          <h3>
            <i class="fa fa-fw fa-key"></i>
            Reset your password
          </h3>
    
          <form name="resetPassword"
                ng-submit="$ctrl.form.$valid && $ctrl.save($ctrl.password, $ctrl.token)"
                novalidate>
            <span ng-init="$ctrl.form = resetPassword"></span>
    
            <div class="form-group"
                 ng-class="{ 'has-error': $ctrl.form.$submitted && $ctrl.form.password.$invalid }">
              <label for="password">Password</label>
              <input type="password"
                     class="form-control"
                     id="password"
                     name="password"
                     placeholder="Enter a new password..."
                     ng-model="$ctrl.password"
                     required
                     minlength="8"
                     autofocus>
              <span class="help-block"
                    ng-if="$ctrl.form.password.$error.minlength">
                Password must be at least 8 characters.
              </span>
            </div>
    
            <div class="form-group"
                 ng-class="{ 'has-error': $ctrl.form.$submitted && $ctrl.form.confirmPassword.$invalid }">
              <label for="confirmPassword">Confirm Password</label>
              <input type="password"
                     class="form-control"
                     id="confirmPassword"
                     name="confirmPassword"
                     placeholder="Enter the same password again..."
                     ng-model="$ctrl.confirmPassword"
                     required
                     same-as="$ctrl.password">
              <span class="help-block"
                    ng-if="$ctrl.form.confirmPassword.$error.sameAs">
                Entered passwords must be the same.
              </span>
            </div>
    
            <button type="submit"
                    class="btn btn-primary btn-block"
                    ng-disabled="$ctrl.form.$pristine || $ctrl.saving">
              <i class="fa fa-fw fa-cog fa-spin" ng-show="$ctrl.saving"></i>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  `
};

export default ResetPasswordComponent;
