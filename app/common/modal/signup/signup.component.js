import SignupController from './signup.controller';

export const SignupComponent = {
  controller: SignupController,
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
        Sign up
      </h4>
    </div><!-- .modal-header -->
    
    <div class="modal-body">
      <div ng-if="$ctrl.joinGroup !== null">
        <p>
          <switch id="joinGroup"
                  name="joinGroup"
                  ng-model="$ctrl.joinGroup"
                  class="m-r-xs"></switch>
          Join {{ ::$ctrl.Group.current.name }}
        </p>
        <hr>
      </div>
    
      <p>
        <button ng-click="$ctrl.authenticateFacebook($ctrl.joinGroup)"
                class="btn btn-facebook btn-block"
                ng-disabled="$ctrl.saving">
          <i class="fa fa-fw fa-cog fa-spin" ng-show="$ctrl.saving"></i>
          <i class="fa fa-fw fa-facebook-official" ng-hide="$ctrl.saving"></i>
          Sign up with Facebook
        </button>
      </p>
    
      <hr>
    
      <form name="userEdit"
            class="form-horizontal"
            ng-submit="$ctrl.form.$valid && $ctrl.save($ctrl.user, $ctrl.joinGroup)"
            novalidate>
        <span ng-init="$ctrl.form = userEdit"></span>
    
        <uib-alert type="danger"
                   ng-if="$ctrl.error && !$ctrl.error.errors">
          <i class="fa fa-fw fa-exclamation-triangle"></i>
          Failed sending request. Please try again or
          <a href="mailto:support@loveisourweapon.com">contact us</a> about it.
        </uib-alert>
    
        <div class="form-group"
             ng-class="{ 'has-error': $ctrl.error.errors.email || ($ctrl.form.$submitted && $ctrl.form.email.$invalid) }">
          <label for="email"
                 class="col-xs-3 control-label">
            Email
          </label>
          <div class="col-xs-9 col-sm-8">
            <input type="email"
                   class="form-control"
                   id="email"
                   name="email"
                   placeholder="Email address..."
                   ng-model="$ctrl.user.email"
                   required
                   autofocus>
            <span class="help-block"
                  ng-if="!$ctrl.error.errors.email && $ctrl.form.$submitted && $ctrl.form.email.$error.email">
              Please enter a valid email address.
            </span>
            <span class="help-block"
                  ng-if="$ctrl.error.errors.email"
                  ng-repeat="error in $ctrl.error.errors.email">
              {{ error.message }}
            </span>
          </div>
        </div>
    
        <div class="form-group"
             ng-class="{ 'has-error': $ctrl.form.$submitted && $ctrl.form.firstName.$invalid }">
          <label for="firstName"
                 class="col-xs-3 control-label">
            Name
          </label>
          <div class="col-xs-9 col-sm-8">
            <div class="row">
              <div class="col-xs-6">
                <input type="text"
                       class="form-control"
                       id="firstName"
                       name="firstName"
                       placeholder="First..."
                       ng-model="$ctrl.user.firstName"
                       required>
              </div>
              <div class="col-xs-6">
                <input type="text"
                       class="form-control"
                       id="lastName"
                       name="lastName"
                       placeholder="Last..."
                       ng-model="$ctrl.user.lastName">
              </div>
            </div>
          </div>
          <span class="help-block col-xs-9 col-xs-push-3"
                ng-if="$ctrl.form.$submitted && $ctrl.form.firstName.$error.required">
            First name is required.
          </span>
        </div>
    
        <div class="form-group"
             ng-class="{ 'has-error': $ctrl.error.errors.password || ($ctrl.form.$submitted && $ctrl.form.password.$invalid) }">
          <label for="password"
                 class="col-xs-3 control-label">
            Password
          </label>
          <div class="col-xs-9 col-sm-8">
            <input type="password"
                   class="form-control"
                   id="password"
                   name="password"
                   placeholder="Enter a password..."
                   ng-model="$ctrl.user.password"
                   required
                   minlength="8">
            <span class="help-block"
                  ng-if="!$ctrl.error.errors.email && $ctrl.form.$submitted && $ctrl.form.password.$error.required">
              Password is required.
            </span>
            <span class="help-block"
                  ng-if="!$ctrl.error.errors.email && $ctrl.form.$submitted && $ctrl.form.password.$error.minlength">
              Password must be at least 8 characters.
            </span>
            <span class="help-block"
                  ng-if="$ctrl.error.errors.password"
                  ng-repeat="error in $ctrl.error.errors.password">
              {{ error.message }}
            </span>
          </div>
        </div>
    
        <div class="form-group"
             ng-class="{ 'has-error': $ctrl.error.errors.picture }">
          <label for="picture"
                 class="col-xs-3 control-label">
            Picture
          </label>
          <div class="col-xs-9 col-sm-8">
            <input type="text"
                   class="form-control"
                   id="picture"
                   name="picture"
                   placeholder="Image upload coming soon..."
                   ng-model="$ctrl.user.picture"
                   disabled>
            <span class="help-block"
                  ng-if="!$ctrl.error.errors.picture">
              Ideally 200px x 200px
            </span>
            <span class="help-block"
                  ng-if="$ctrl.error.errors.picture"
                  ng-repeat="error in $ctrl.error.errors.picture">
              {{ error.message }}
            </span>
          </div>
        </div>
    
        <button type="submit" hidden></button>
      </form>
    
      <div ng-if="::$ctrl.canSwitch" class="row">
        <div class="col-xs-9 col-xs-push-3">
          <p>
            Already have an account?
            <a ng-click="$ctrl.$uibModalInstance.dismiss() && $ctrl.Modal.openLogin()" href>Login now</a>
          </p>
        </div>
      </div>
    </div><!-- .modal-body -->
    
    <div class="modal-footer">
      <button type="submit"
              class="btn btn-primary btn-block"
              ng-click="$ctrl.form.$valid && $ctrl.save($ctrl.user, $ctrl.joinGroup)"
              ng-disabled="$ctrl.form.$pristine || $ctrl.saving">
        <i class="fa fa-fw fa-cog fa-spin" ng-show="$ctrl.saving"></i>
        Sign up
      </button>
    </div><!-- .modal-footer -->
  `
};
