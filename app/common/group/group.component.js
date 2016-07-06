import GroupController from './group.controller';

const GroupComponent = {
  bindings: {
    groupSlug: '<',
  },
  controller: GroupController,
  template: `
    <jumbotron jumbo-image="'/images/group.png'"
               jumbo-background="::$ctrl.jumbotronBackground">
      <jumbo-title>{{ $ctrl.Group.current.name }}</jumbo-title>
      <jumbo-text>
        <span class="f-lg">
          {{ $ctrl.Act.counters[$ctrl.Group.current._id] | number }}
        </span>
        acts of love
      </jumbo-text>
    </jumbotron>
    
    <div class="container container-pad">
      <div class="row">
        <div ng-if="!($ctrl.loading || $ctrl.error)">
          <div class="col-sm-4 col-md-3 col-sm-push-8 col-md-push-9 m-b-lg">
            <div class="well well-sm"
                 ng-if="$ctrl.User.isMemberOfGroup($ctrl.Group.current) && $ctrl.campaign !== null">
              <h5 class="text-center">
                Current Campaign
                <br>
                <small>
                  <span class='f-lg'>
                    {{ $ctrl.Act.counters[$ctrl.campaign._id] | number }}
                  </span>
                  acts of love
                </small>
              </h5>
    
              <!-- TODO: move buttons to a directive -->
              <!-- Show buttons with publish/unpublish menu for admins -->
              <div class="btn-group btn-block"
                   ng-repeat="item in $ctrl.campaign.deeds"
                   ng-if="$ctrl.Group.isAdmin($ctrl.Group.current, $ctrl.User.current)"
                   uib-dropdown>
                <a class="btn col-xs-10"
                   ng-class="{
                     'btn-primary': item.published,
                     'btn-default': !item.published,
                     'btn-lg': item.deed._id === $ctrl.currentDeed.deed._id
                   }"
                   ng-href="/d/{{ ::item.deed.urlTitle }}">
                  {{ ::item.deed.title }}
                </a>
                <button type="button"
                        class="btn col-xs-2"
                        ng-class="{
                          'btn-primary': item.published,
                          'btn-default': !item.published,
                          'btn-lg': item.deed._id === $ctrl.currentDeed.deed._id
                        }"
                        uib-dropdown-toggle
                        aria-haspopup="true"
                        aria-expanded="false">
                  <span class="caret"></span>
                  <span class="sr-only">Toggle Dropdown</span>
                </button>
                <ul class="dropdown-menu-right" uib-dropdown-menu>
                  <li ng-if="!item.published">
                    <a ng-click="$ctrl.setPublished($ctrl.campaign, item.deed, true)" href>
                      <i class="fa fa-fw fa-thumbs-up"></i>
                      Publish
                    </a>
                  </li>
                  <li ng-if="item.published">
                    <a ng-click="$ctrl.setPublished($ctrl.campaign, item.deed, false)" href>
                      <i class="fa fa-fw fa-thumbs-down"></i>
                      Unpublish
                    </a>
                  </li>
                </ul>
              </div>
              <div ng-if="$ctrl.Group.isAdmin($ctrl.Group.current, $ctrl.User.current)">
                <hr>
                <button type="button"
                        class="btn btn-default btn-block"
                        ng-click="$ctrl.editCampaign('update', $ctrl.Group.current, $ctrl.campaign)">
                  <i class="fa fa-fw fa-edit"></i>
                  Update campaign
                </button>
                <button type="button"
                        class="btn btn-default btn-block"
                        ng-click="$ctrl.finishCampaign($ctrl.campaign)">
                  <i class="fa fa-fw fa-flag-checkered"></i>
                  Finish campaign
                </button>
              </div>
    
              <!-- Show a normal button for non-admins -->
              <a class="btn btn-block"
                 ng-repeat="item in $ctrl.campaign.deeds"
                 ng-href="/d/{{ ::item.deed.urlTitle }}"
                 ng-class="{
                   'btn-primary': item.published,
                   'btn-default': !item.published,
                   'btn-lg': item.deed._id === $ctrl.currentDeed.deed._id
                 }"
                 ng-if="!$ctrl.Group.isAdmin($ctrl.Group.current, $ctrl.User.current)">
                {{ ::item.deed.title }}
              </a>
            </div>
            <button type="button"
                    class="btn btn-primary btn-block btn-lg"
                    ng-click="$ctrl.User.isAuthenticated() ?
                      $ctrl.joinGroup($ctrl.User.current, $ctrl.Group.current) :
                      $ctrl.Modal.openLogin()"
                    ng-if="!$ctrl.User.isMemberOfGroup($ctrl.Group.current)">
              <i class="fa fa-fw fa-users"></i>
              <span ng-if="!$ctrl.User.isAuthenticated()">Login &amp; </span>
              Join us
            </button>
            <button type="button"
                    class="btn btn-default btn-block"
                    ng-click="$ctrl.editCampaign('create', $ctrl.Group.current)"
                    ng-if="$ctrl.showCampaignAlert">
              <i class="fa fa-fw fa-bullhorn"></i>
              Setup campaign
            </button>
            <button type="button"
                    class="btn btn-default btn-block"
                    ng-click="$ctrl.Modal.openGroupEdit('update', $ctrl.Group.current)"
                    ng-if="$ctrl.Group.isAdmin($ctrl.Group.current, $ctrl.User.current)">
              <i class="fa fa-fw fa-edit"></i>
              Update group
            </button>
            <button type="button"
                    class="btn btn-default btn-block"
                    ng-click="$ctrl.leaveGroup($ctrl.User.current, $ctrl.Group.current)"
                    ng-if="$ctrl.User.isMemberOfGroup($ctrl.Group.current)">
              <i class="fa fa-fw fa-sign-out"></i>
              Leave group
            </button>
          </div>
    
          <div class="col-sm-8 col-md-9 col-sm-pull-4 col-md-pull-3">
            <uib-alert type="info"
                       ng-if="$ctrl.showCampaignAlert"
                       close="$ctrl.showCampaignAlert = false">
              You haven't got an active campaign, would you like to set one up now?&nbsp;
              <button class="btn btn-info btn-inline m-t-xxs p-xs"
                      ng-click="$ctrl.editCampaign('create', $ctrl.Group.current)">
                Setup Campaign
              </button>
            </uib-alert>
    
            <uib-tabset active="$ctrl.activeTab"
                        type="pills">
              <uib-tab>
                <uib-tab-heading>
                  <i class="fa fa-fw fa-commenting"></i>
                  Welcome
                </uib-tab-heading>
    
                <blockquote marked="$ctrl.Group.current.welcomeMessage"
                            ng-if="$ctrl.Group.current.welcomeMessage"></blockquote>
    
                <div ng-if="!$ctrl.Group.current.welcomeMessage">
                  <h2>
                    The Love is our Weapon Campaign is a youth movement that exists to
                    change cities through the love of Jesus by doing strategic practical
                    acts of love.
                  </h2>
                  <p>
                    Thousands of people, doing thousands of acts of love, bringing
                    change, value, healing and hope throughout cities and communities
                    everywhere.
                  </p>
                </div>
              </uib-tab>
    
              <uib-tab>
                <uib-tab-heading>
                  <i class="fa fa-fw fa-list"></i>
                  Activity Feed
                </uib-tab-heading>
    
                <feed criteria="{ group: $ctrl.Group.current._id }"
                      ng-if="$ctrl.User.isAuthenticated()"></feed>
    
                <p ng-if="!$ctrl.User.isAuthenticated()">
                  You must <a ng-click="$ctrl.Modal.openLogin()" href>login</a>
                  to see {{ $ctrl.Group.current.name }}'s Activity Feed.
                </p>
              </uib-tab>
            </uib-tabset>
          </div>
        </div>
    
        <loading-spinner size="5x" ng-if="$ctrl.loading"></loading-spinner>
    
        <div class="col-xs-12" ng-if="$ctrl.error">
          <uib-alert type="danger">
            <i class="fa fa-exclamation-triangle"></i>
            {{ $ctrl.error }}
          </uib-alert>
        </div>
      </div>
    </div>
  `
};

export default GroupComponent;
