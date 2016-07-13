import ControlPanelController from './control-panel.controller';

const ControlPanelComponent = {
  controller: ControlPanelController,
  template: `
    <div class="container container-pad control-panel">
      <div class="row">
        <div class="col-xs-12">
          <h3 class="m-b-lg">
            <i class="fa fa-fw fa-cogs"></i>
            Control Panel
            <small>&raquo; {{ $ctrl.$state.current.name.split('.') | last | capitalize }}</small>
          </h3>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-3">
          <div class="list-group">
            <a class="list-group-item"
               ui-sref="controlPanel.user"
               ui-sref-active="{ active: 'controlPanel.user' }">
              User
            </a>
          </div>

          <div ng-if="$ctrl.User.current.groups.length">
            <h4>Your Groups</h4>
            <div class="list-group">
              <a class="list-group-item"
                 ng-repeat="group in $ctrl.User.current.groups track by group._id"
                 ui-sref="controlPanel.group({ groupId: group._id })"
                 ui-sref-active="{ active: 'controlPanel.group' }">
                {{ group.name }}
              </a>
            </div>
          </div>

          <div ng-if="$ctrl.User.isSuperAdmin()">
            <h4>Admin</h4>
            <div class="list-group">
              <a class="list-group-item"
                 ui-sref="controlPanel.deeds"
                 ui-sref-active="{ active: 'controlPanel.deeds' }">
                Deeds
              </a>
              <a class="list-group-item"
                 ui-sref="controlPanel.users({ query: null })"
                 ui-sref-active="{ active: 'controlPanel.users' }">
                Users
              </a>
              <a class="list-group-item"
                 ui-sref="controlPanel.groups({ query: null })"
                 ui-sref-active="{ active: 'controlPanel.groups' }">
                Groups
              </a>
            </div>
          </div>
        </div>

        <div class="col-sm-9">
          <div ui-view="section"></div>
        </div>
      </div>
    </div>
  `
};

export default ControlPanelComponent;
