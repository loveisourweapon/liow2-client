import GroupControlPanelController from './group-control-panel.controller';

const GroupControlPanelComponent = {
  bindings: {
    groupId: '<',
  },
  controller: GroupControlPanelController,
  template: `
    <div class="row">
      <div class="col-sm-3 col-sm-push-9">
        <img ng-src="/images/group.png"
             class="profile img-responsive img-circle">
    
        <button type="button"
                class="btn btn-default btn-block"
                ng-click="$ctrl.updateGroup($ctrl.group)"
                ng-if="$ctrl.Group.isAdmin($ctrl.group, $ctrl.User.current)">
                <!-- TODO: allow superAdmin access -->
          <i class="fa fa-fw fa-edit"></i>
          Update
        </button>
        <button type="button"
                class="btn btn-default btn-block"
                ng-click="$ctrl.leaveGroup($ctrl.User.current, $ctrl.group)"
                ng-if="$ctrl.User.isMemberOfGroup($ctrl.group)">
          <i class="fa fa-fw fa-sign-out"></i>
          Leave
        </button>
      </div>
    
      <div class="col-sm-9 col-sm-pull-3">
        <table class="table table-bordered table-striped" ng-if="!$ctrl.loading">
          <tbody>
            <tr>
              <th>Name</th>
              <td>{{ $ctrl.group.name }}</td>
            </tr>
            <tr>
              <th>Created</th>
              <td>{{ $ctrl.group.created | moment:'LL' }}</td>
            </tr>
            <tr>
              <th>Members</th>
              <td>{{ $ctrl.group.members | number }}</td>
            </tr>
            <tr>
              <th>Acts of Love</th>
              <td>{{ $ctrl.Act.counters[$ctrl.group._id] | number }}</td>
            </tr>
            <tr>
              <th>Welcome Message</th>
              <td><div marked="$ctrl.group.welcomeMessage"></div></td>
            </tr>
          </tbody>
        </table>
    
        <p class="text-center" ng-if="$ctrl.loading">
          <i class="fa fa-cog fa-5x fa-spin"></i>
        </p>
      </div>
    </div>
  `
};

export default GroupControlPanelComponent;
