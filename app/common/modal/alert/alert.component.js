import AlertController from './alert.controller';

export const AlertComponent = {
  controller: AlertController,
  template: `
    <modal-header modal-title="{{ ::$ctrl.title }}"
                  on-close-click="$ctrl.$uibModalInstance.close()"
                  ng-if="::$ctrl.title"></modal-header>

    <div class="modal-body" marked="::$ctrl.message"></div>

    <div class="modal-footer">
      <button type="button"
              class="btn btn-primary"
              ng-click="$ctrl.$uibModalInstance.close()">
        OK
      </button>
    </div><!-- .modal-footer -->
  `
};
