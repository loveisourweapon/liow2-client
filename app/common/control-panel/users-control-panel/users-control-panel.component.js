import { UsersControlPanelController } from './users-control-panel.controller';

export const UsersControlPanelComponent = {
  controller: UsersControlPanelController,
  template: `
    <div class="row">
      <div class="col-xs-12">
        <control-panel-search on-search="$ctrl.onSearch($event)"></control-panel-search>

        <div class="table-responsive">
          <table class="table table-bordered table-striped" ng-if="!$ctrl.loading">
            <thead>
              <tr>
                <th style="width: 65px;">Picture</th>
                <th>Email</th>
                <th>Name</th>
                <th>Joined</th>
                <th>Last Seen</th>
                <th>Confirmed</th>
                <th>Super Admin</th>
              </tr>
            </thead>
            <tbody>
              <tr ng-repeat="user in $ctrl.users track by user._id">
                <td class="text-center">
                  <img ng-src="{{ user.picture || $ctrl.User.getDefaultUserImage(user._id) }}"
                       class="img-circle icon">
                </td>
                <td>{{ user.email }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.created | moment:'L' }}</td>
                <td>{{ user.lastSeen | moment:'L' }}</td>
                <td class="text-center">
                  <icon-checked value="user.confirmed"></icon-checked>
                </td>
                <td class="text-center">
                  <icon-checked value="user.superAdmin"></icon-checked>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <loading-spinner size="5x" ng-if="$ctrl.loading"></loading-spinner>
      </div>
    </div>
  `
};
