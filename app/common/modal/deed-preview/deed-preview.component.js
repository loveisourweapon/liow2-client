import DeedPreviewController from './deed-preview.controller';

export const DeedPreviewComponent = {
  controller: DeedPreviewController,
  template: `
    <modal-header modal-title="Preview Deed"
                  on-close-click="$ctrl.$uibModalInstance.dismiss()"></modal-header>

    <div class="modal-body deed-modal">
      <div class="modal-jumbotron" ng-if="!($ctrl.loading || $ctrl.error)">
        <div class="embed-responsive embed-responsive-16by9"
             ng-if="$ctrl.deed.videoUrl">
          <youtube-video video-url="$ctrl.deed.videoUrl"
                         class="embed-responsive-item"></youtube-video>
        </div>

        <div class="deed-header clearfix">
          <img ng-src="{{ $ctrl.deed.logo || '/images/deed.png' }}"
               class="img-responsive img-circle pull-left m-t-md m-r-sm">

          <h2 class="text-uppercase pull-left m-b-none">
            {{ $ctrl.deed.title }}
          </h2>

          <h1 class="pull-right text-right m-b-none">
            {{ $ctrl.Act.counters[$ctrl.deed._id] | number }}
          </h1>
        </div>
      </div>

      <div marked="$ctrl.deed.content"
           ng-if="!($ctrl.loading || $ctrl.error)"></div>

      <loading-spinner size="5x" ng-if="$ctrl.loading"></loading-spinner>

      <uib-alert type="danger" ng-if="$ctrl.error">
        <i class="fa fa-exclamation-triangle"></i>
        {{ $ctrl.error }}
      </uib-alert>
    </div><!-- .modal-body -->

    <div class="modal-footer">
      <button type="button"
              class="btn btn-default"
              ng-click="$ctrl.$uibModalInstance.dismiss()">
        Close
      </button>
    </div><!-- .modal-footer -->
  `
};
