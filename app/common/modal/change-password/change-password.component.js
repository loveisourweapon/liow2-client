import ChangePasswordController from './change-password.controller';

export const ChangePasswordComponent = {
  controller: ChangePasswordController,
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
        Change Password
      </h4>
    </div><!-- .modal-header -->
    
    <div class="modal-body">
      <form name="changePassword"
            ng-submit="$ctrl.form.$valid && $ctrl.save($ctrl.user, $ctrl.currentPassword, $ctrl.newPassword)"
            novalidate>
        <span ng-init="$ctrl.form = changePassword"></span>
    
        <div class="form-group"
             ng-class="{ 'has-error': $ctrl.error }">
          <label for="currentPassword">Current Password</label>
          <input type="password"
                 class="form-control"
                 id="currentPassword"
                 name="currentPassword"
                 placeholder="Enter your current password..."
                 ng-model="$ctrl.currentPassword"
                 required
                 autofocus>
          <span class="help-block"
                ng-if="$ctrl.error">
            {{ $ctrl.error }}
          </span>
        </div>
    
        <div class="form-group"
             ng-class="{ 'has-error': $ctrl.form.$submitted && $ctrl.form.newPassword.$invalid }">
          <label for="newPassword">New Password</label>
          <input type="password"
                 class="form-control"
                 id="newPassword"
                 name="newPassword"
                 placeholder="Enter a new password..."
                 ng-model="$ctrl.newPassword"
                 required
                 minlength="8">
          <span class="help-block"
                ng-if="$ctrl.form.newPassword.$error.minlength">
            Password must be at least 8 characters.
          </span>
        </div>
    
        <div class="form-group"
             ng-class="{ 'has-error': $ctrl.form.$submitted && $ctrl.form.confirmPassword.$invalid }">
          <input type="password"
                 class="form-control"
                 id="confirmPassword"
                 name="confirmPassword"
                 placeholder="Enter the same password again..."
                 ng-model="$ctrl.confirmPassword"
                 required
                 same-as="$ctrl.newPassword">
          <span class="help-block"
                ng-if="$ctrl.form.confirmPassword.$error.sameAs">
            Entered passwords must be the same.
          </span>
        </div>
    
        <button type="submit" hidden></button>
      </form>
    </div><!-- .modal-body -->
    
    <div class="modal-footer">
      <button type="button"
              class="btn btn-default"
              ng-click="$ctrl.$uibModalInstance.dismiss()">
        Cancel
      </button>
      <button type="button"
              class="btn btn-primary"
              ng-click="$ctrl.save($ctrl.user, $ctrl.currentPassword, $ctrl.newPassword)"
              ng-disabled="$ctrl.form.$pristine || $ctrl.form.$invalid || $ctrl.saving">
        <i class="fa fa-fw fa-cog fa-spin" ng-show="$ctrl.saving"></i>
        Save
      </button>
    </div><!-- .modal-footer -->
  `
};
