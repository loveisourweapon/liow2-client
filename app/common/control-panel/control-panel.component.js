import { ControlPanelController } from './control-panel.controller';

export const ControlPanelComponent = {
  bindings: {
    view: '<',
  },
  controller: ControlPanelController,
  template: `
    <div class="container container-pad control-panel">
      <div class="row">
        <div class="col-xs-12">
          <h3 class="m-b-lg">
            <i class="fa fa-fw fa-cogs"></i>
            Control Panel
            <small>&raquo; {{ $ctrl.view | capitalize }}</small>
          </h3>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-3">
          <div class="list-group">
            <a class="list-group-item"
               ng-class="{ active: $ctrl.view === 'user' }"
               href="/control-panel/user">
              User
            </a>
          </div>

          <div ng-if="$ctrl.User.current.groups.length">
            <h4>Your Groups</h4>
            <div class="list-group">
              <a class="list-group-item"
                 ng-class="{ active: $ctrl.view === 'group' && $ctrl.groupId === group._id }"
                 ng-repeat="group in $ctrl.User.current.groups track by group._id"
                 ng-href="/control-panel/group?groupId={{ group._id }}">
                {{ group.name }}
              </a>
            </div>
          </div>

          <div ng-if="$ctrl.User.isSuperAdmin()">
            <h4>Admin</h4>
            <div class="list-group">
              <a class="list-group-item"
                 ng-class="{ active: $ctrl.view === 'deeds' }"
                 href="/control-panel/deeds">
                Deeds
              </a>
              <a class="list-group-item"
                 ng-class="{ active: $ctrl.view === 'users' }"
                 href="/control-panel/users">
                Users
              </a>
              <a class="list-group-item"
                 ng-class="{ active: $ctrl.view === 'groups' }"
                 href="/control-panel/groups">
                Groups
              </a>
            </div>
          </div>
        </div>

        <div class="col-sm-9">
          <user-control-panel ng-if="$ctrl.view === 'user'"></user-control-panel>
          <group-control-panel ng-if="$ctrl.view === 'group'"
                               group-id="$ctrl.groupId"></group-control-panel>

          <div ng-if="$ctrl.User.isSuperAdmin()">
            <deeds-control-panel ng-if="$ctrl.view === 'deeds'"></deeds-control-panel>
            <users-control-panel ng-if="$ctrl.view === 'users'"></users-control-panel>
            <groups-control-panel ng-if="$ctrl.view === 'groups'"></groups-control-panel>
          </div>
        </div>
      </div>
    </div>
  `
};
