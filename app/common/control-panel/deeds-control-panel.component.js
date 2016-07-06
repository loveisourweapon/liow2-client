import DeedsControlPanelController from './deeds-control-panel.controller'

const DeedsControlPanelComponent = {
  controller: DeedsControlPanelController,
  template: `
    <div class="row">
      <div class="col-xs-12">
        <table class="table table-bordered table-striped" ng-if="!$ctrl.loading">
          <thead>
            <tr>
              <th style="width: 65px;">Logo</th>
              <th>Title</th>
              <th style="width: 150px;">Video</th>
              <th style="width: 102px;">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr ng-repeat="deed in $ctrl.deeds track by deed._id">
              <td class="text-center">
                <img ng-src="{{ deed.logo || '/images/deed.png' }}"
                     class="img-circle icon">
              </td>
              <td>{{ deed.title }}</td>
              <td>
                <div ng-if="deed.videoUrl">
                  <a ng-href="{{ deed.videoUrl }}" target="_blank">
                    <i class="fa fa-lg fa-youtube-play"></i>
                    {{ deed.videoUrl.split('/') | last }}
                  </a>
                </div>
                <div ng-if="!deed.videoUrl" class="text-center">
                  <i class="fa fa-lg fa-times-circle text-muted"></i>
                </div>
              </td>
              <td>
                <div class="btn-group" uib-dropdown>
                  <button type="button"
                          class="btn btn-default"
                          uib-dropdown-toggle>
                    Actions
                    <span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu-right" uib-dropdown-menu>
                    <li>
                      <a ng-click="$ctrl.Modal.openDeedPreview(deed._id)" href>
                        <i class="fa fa-fw fa-external-link-square"></i>
                        Open Preview
                      </a>
                    </li>
                    <li>
                      <a ng-href="/d/{{ deed.urlTitle }}">
                        <i class="fa fa-fw fa-heart"></i>
                        View Public Page
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
    
        <loading-spinner size="5x" ng-if="$ctrl.loading"></loading-spinner>
      </div>
    </div>
  `
};

export default DeedsControlPanelComponent;
