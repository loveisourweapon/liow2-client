import LoginController from './login.controller';

export const LoginComponent = {
  controller: LoginController,
  template: `
    <modal-header modal-title="Login"
                  on-close-click="$ctrl.$uibModalInstance.dismiss()"></modal-header>

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
                ng-disabled="$ctrl.loggingIn">
          <i class="fa fa-fw fa-cog fa-spin" ng-show="$ctrl.loggingIn"></i>
          <i class="fa fa-fw fa-facebook-official" ng-hide="$ctrl.loggingIn"></i>
          Sign in with Facebook
        </button>
      </p>

      <hr>

      <form ng-submit="$ctrl.authenticateEmail($ctrl.email, $ctrl.password, $ctrl.joinGroup)">
        <uib-alert type="danger"
                   class="p-sm"
                   ng-if="$ctrl.error">
          <i class="fa fa-fw fa-exclamation-triangle"></i>
          {{ $ctrl.error }}
          <span ng-if="$ctrl.error.indexOf('Please confirm') === 0">
            <i class="fa fa-fw"></i>
            <a ng-click="$ctrl.sendConfirmEmail($ctrl.email)" href>
              Re-send confirmation email?
              <i ng-show="$ctrl.sending" class="fa fa-cog fa-spin"></i>
            </a>
          </span>
        </uib-alert>

        <div class="form-group">
          <div class="input-group">
            <div class="input-group-addon">
              <i class="fa fa-fw fa-at"></i>
            </div>
            <input type="text"
                   class="form-control"
                   id="email"
                   name="email"
                   ng-model="$ctrl.email"
                   placeholder="Email"
                   autofocus>
          </div>
        </div>

        <div class="form-group">
          <div class="input-group">
            <div class="input-group-addon">
              <i class="fa fa-fw fa-key"></i>
            </div>
            <input type="password"
                   class="form-control"
                   id="password"
                   name="password"
                   ng-model="$ctrl.password"
                   placeholder="Password">
          </div>
          <span class="help-block">
            <a ng-click="$ctrl.$uibModalInstance.dismiss() && $ctrl.Modal.openForgotPassword($ctrl.email)" href>
              Forgot your password?
            </a>
          </span>
        </div>

        <button type="submit" hidden></button>
      </form>

      <div ng-if="::$ctrl.canSwitch">
        <p>
          Don't have an account yet?
          <a ng-click="$ctrl.$uibModalInstance.dismiss() && $ctrl.Modal.openSignup()" href>Sign up now</a>
        </p>
      </div>
    </div><!-- .modal-body -->

    <div class="modal-footer">
      <button type="submit"
              class="btn btn-primary btn-block"
              ng-click="$ctrl.authenticateEmail($ctrl.email, $ctrl.password, $ctrl.joinGroup)"
              ng-disabled="!$ctrl.email || !$ctrl.password || $ctrl.loggingIn">
        <i class="fa fa-fw fa-cog fa-spin" ng-show="$ctrl.loggingIn"></i>
        Login
      </button>
    </div><!-- .modal-footer -->
  `
};
