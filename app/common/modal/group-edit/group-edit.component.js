import GroupEditController from './group-edit.controller';

export const GroupEditComponent = {
  controller: GroupEditController,
  template: `
    <modal-header modal-title="{{ ::$ctrl.action | capitalize }} Group"
                  on-close-click="$ctrl.$uibModalInstance.dismiss()"></modal-header>

    <div class="modal-body">
      <uib-alert type="danger"
                 ng-if="$ctrl.error && !$ctrl.error.errors">
        <i class="fa fa-fw fa-exclamation-triangle"></i>
        Failed sending request. Please try again or
        <a href="mailto:support@loveisourweapon.com">contact us</a> about it.
      </uib-alert>

      <form name="groupEdit"
            class="form-horizontal"
            ng-submit="$ctrl.form.$valid && $ctrl.save($ctrl.group)"
            ng-if="$ctrl.User.isAuthenticated()"
            novalidate>
        <span ng-init="$ctrl.form = groupEdit"></span>
        <div class="form-group"
             ng-class="{ 'has-error': $ctrl.error.errors.name || $ctrl.error.errors.urlName }">
          <label for="name"
                 class="col-xs-3 control-label">
            Name
          </label>
          <div class="col-xs-9">
            <input type="text"
                   class="form-control"
                   id="name"
                   name="name"
                   placeholder="Group name..."
                   ng-model="$ctrl.group.name"
                   required
                   autofocus>
            <span class="help-block"
                  ng-if="!($ctrl.error.errors.name || $ctrl.error.errors.urlName)">
              https://loveisourweapon.com/g/{{ ($ctrl.group.name | kebabCase) || '...' }}
            </span>
            <span class="help-block"
                  ng-if="$ctrl.error.errors.name"
                  ng-repeat="error in $ctrl.error.errors.name">
              {{ error.message }}
            </span>
            <span class="help-block"
                  ng-if="$ctrl.error.errors.urlName"
                  ng-repeat="error in $ctrl.error.errors.urlName">
              {{ error.message }}
            </span>
          </div>
        </div>

        <div class="form-group"
             ng-class="{ 'has-error': $ctrl.error.errors.logo }">
          <label for="logo"
                 class="col-xs-3 control-label">
            Logo
          </label>
          <div class="col-xs-9">
            <input type="text"
                   class="form-control"
                   id="logo"
                   name="logo"
                   placeholder="Image upload coming soon..."
                   ng-model="$ctrl.group.logo"
                   disabled>
            <span class="help-block"
                  ng-if="!$ctrl.error.errors.logo">
              Ideally 500px x 500px
            </span>
            <span class="help-block"
                  ng-if="$ctrl.error.errors.logo"
                  ng-repeat="error in $ctrl.error.errors.logo">
              {{ error.message }}
            </span>
          </div>
        </div>

        <div class="form-group"
             ng-class="{ 'has-error': $ctrl.error.errors.coverImage }">
          <label for="coverImage"
                 class="col-xs-3 control-label">
            Cover Image
          </label>
          <div class="col-xs-9">
            <input type="text"
                   class="form-control"
                   id="coverImage"
                   name="coverImage"
                   placeholder="Image upload coming soon..."
                   ng-model="$ctrl.group.coverImage"
                   disabled>
            <span class="help-block"
                  ng-if="!$ctrl.error.errors.coverImage">
              Ideally 1280px x 580px
            </span>
            <span class="help-block"
                  ng-if="$ctrl.error.errors.coverImage"
                  ng-repeat="error in $ctrl.error.errors.coverImage">
              {{ error.message }}
            </span>
          </div>
        </div>

        <div class="form-group"
             ng-class="{ 'has-error': $ctrl.error.errors.admins }">
          <label for="logo"
                 class="col-xs-3 control-label">
            Admins
          </label>
          <div class="col-xs-9">
            <ui-select multiple
                       id="admins"
                       name="admins"
                       ng-model="$ctrl.group.admins"
                       ng-disabled="!$ctrl.group._id">
              <ui-select-match placeholder="Select admins..."
                               ui-lock-choice="$item._id === $ctrl.group.owner">
                <img ng-src="{{ $item.picture || $ctrl.User.getDefaultUserImage($item._id) }}"
                     class="img-circle b-xs m-xxs"
                     style="width: 22px;">
                {{ $item.name }}
              </ui-select-match>
              <ui-select-choices repeat="user._id as user in $ctrl.users | filter: { name: $select.search }">
                <div class="clearfix">
                  <img ng-src="{{ user.picture || $ctrl.User.getDefaultUserImage(user._id) }}"
                       class="img-circle pull-left b-xs m-r-xs"
                       style="width: 22px;">
                  <div ng-bind-html="user.name | highlight: $select.search"></div>
                </div>
              </ui-select-choices>
            </ui-select>
          </div>
        </div>

        <div class="form-group"
             ng-class="{ 'has-error': $ctrl.error.errors.welcomeMessage }">
          <label for="welcomeMessage"
                 class="col-xs-3 control-label">
            Intro Message
          </label>
          <div class="col-xs-9">
            <div class="well well-sm medium-editor m-none">
              <textarea id="welcomeMessage"
                        ng-model="$ctrl.group.welcomeMessage"></textarea>
            </div>
            <span class="help-block"
                  ng-if="!$ctrl.error.errors.welcomeMessage">
              Select text to add links, bold, italics, etc.
            </span>
            <span class="help-block"
                  ng-if="$ctrl.error.errors.welcomeMessage"
                  ng-repeat="error in $ctrl.error.errors.welcomeMessage">
              {{ error.message }}
            </span>
          </div>
        </div>

        <div class="form-group"
             ng-if="!$ctrl.group._id">
          <div class="col-xs-9 col-xs-push-3">
            <p>
              <switch id="setupCampaign"
                      name="setupCampaign"
                      ng-model="$ctrl.setupCampaign"
                      class="m-r-xs"></switch>
              <span ng-click="$ctrl.setupCampaign = !$ctrl.setupCampaign">
                Setup your first campaign now?
              </span>
            </p>
          </div>
        </div>

        <button type="submit" hidden></button>
      </form>

      <div ng-if="!$ctrl.User.isAuthenticated()">
        <p>Please sign up or login to setup a new group</p>
        <p>
          <button type="button"
                  class="btn btn-primary"
                  ng-click="$ctrl.openModal('signup')">
            Sign up
          </button>
          &nbsp;&nbsp; or &nbsp;&nbsp;
          <button type="button"
                  class="btn btn-default"
                  ng-click="$ctrl.openModal('login')">
            Login
          </button>
        </p>
      </div>
    </div><!-- .modal-body -->

    <div class="modal-footer">
      <button type="button"
              class="btn btn-default"
              ng-click="$ctrl.$uibModalInstance.dismiss()">
        Cancel
      </button>
      <button type="button"
              class="btn btn-primary"
              ng-click="$ctrl.save($ctrl.group)"
              ng-disabled="!$ctrl.User.isAuthenticated() || $ctrl.saving || $ctrl.form.$invalid">
        <i class="fa fa-cog fa-spin" ng-show="$ctrl.saving"></i>
        {{ ::$ctrl.action | capitalize }}
      </button>
    </div><!-- .modal-footer -->
  `
};
