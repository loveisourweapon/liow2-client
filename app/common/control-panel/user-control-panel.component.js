import UserControlPanelController from './user-control-panel.controller';

const UserControlPanelComponent = {
  controller: UserControlPanelController,
  template: `
    <div class="row">
      <div class="col-sm-3 col-sm-push-9">
        <img ng-src="{{ $ctrl.User.current.picture || $ctrl.User.getDefaultUserImage($ctrl.User.current._id) }}"
             class="profile img-responsive img-circle">
      </div>
      <div class="col-sm-9 col-sm-pull-3">
        <table class="table table-bordered table-striped" ng-if="!$ctrl.loading">
          <tbody>
            <tr>
              <th>Email</th>
              <td>{{ $ctrl.User.current.email }}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>
                <div ng-if="!$ctrl.editingName">
                  <a ng-click="$ctrl.toggleEditName($ctrl.User.current)" class="pull-right" href>
                    <i class="fa fa-fw fa-pencil"></i>
                  </a>
                  {{ $ctrl.User.current.name }}
                </div>
                <div ng-if="$ctrl.editingName">
                  <a ng-click="$ctrl.toggleEditName($ctrl.User.current)" class="pull-right" href>
                    <i class="fa fa-fw fa-times"></i>
                  </a>
    
                  <form name="userNameEdit"
                        class="form-inline"
                        ng-submit="$ctrl.form.$valid && $ctrl.saveName($ctrl.User.current)"
                        novalidate>
                    <span ng-init="$ctrl.form = userNameEdit"></span>
    
                    <div class="form-group"
                         ng-class="{ 'has-error': $ctrl.form.$submitted && $ctrl.form.firstName.$invalid }">
                      <label class="sr-only" for="firstName">First name</label>
                      <input type="text"
                             class="form-control"
                             id="firstName"
                             name="firstName"
                             placeholder="First..."
                             ng-model="$ctrl.User.current.firstName"
                             required>
                    </div>
                    <div class="form-group">
                      <label class="sr-only" for="lastName">Last name</label>
                      <input type="text"
                             class="form-control"
                             id="lastName"
                             name="lastName"
                             placeholder="Last..."
                             ng-model="$ctrl.User.current.lastName">
                    </div>
                    <button type="submit" class="btn btn-success">
                      <i class="fa fa-check"></i>
                    </button>
                  </form>
                </div>
              </td>
            </tr>
            <tr>
              <th>Password</th>
              <td>
                <a ng-click="$ctrl.Modal.openChangePassword($ctrl.User.current)" href>
                  Change password
                </a>
                <a ng-click="$ctrl.Modal.openChangePassword($ctrl.User.current)"
                   class="pull-right" href>
                  <i class="fa fa-fw fa-pencil"></i>
                </a>
              </td>
            </tr>
            <tr>
              <th>Joined</th>
              <td>{{ $ctrl.User.current.created | moment:'LL' }}</td>
            </tr>
            <tr>
              <th>Acts of Love</th>
              <td>{{ $ctrl.Act.counters[$ctrl.User.current._id] | number }}</td>
            </tr>
            <tr>
              <th>Confirmed</th>
              <td>
                <icon-checked value="$ctrl.User.current.confirmed"></icon-checked>
                <span ng-if="$ctrl.User.current && !$ctrl.User.current.confirmed"
                      class="m-l-xs">
                  <a ng-click="$ctrl.sendConfirmEmail($ctrl.User.current.email)" href>
                    Re-send confirmation email?
                    <i ng-show="$ctrl.sending" class="fa fa-cog fa-spin"></i>
                  </a>
                </span>
              </td>
            </tr>
            <tr ng-if="$ctrl.User.current.superAdmin">
              <th>Super Admin</th>
              <td>
                <icon-checked value="$ctrl.User.current.superAdmin"></icon-checked>
              </td>
            </tr>
          </tbody>
        </table>
    
        <loading-spinner size="5x" ng-if="$ctrl.loading"></loading-spinner>
      </div>
    </div>
  `
};

export default UserControlPanelComponent;
