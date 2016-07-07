import ConfirmController from './confirm.controller';

export const ConfirmComponent = {
  controller: ConfirmController,
  template: `
    <modal-header modal-title="{{ ::$ctrl.title }}"
                  on-close-click="$ctrl.$uibModalInstance.dismiss()"
                  ng-if="::$ctrl.title"></modal-header>

    <div class="modal-body" marked="::$ctrl.message"></div>

    <div class="modal-footer">
      <button type="button"
              class="btn btn-default"
              ng-click="$ctrl.$uibModalInstance.dismiss()">
        Cancel
      </button>
      <button type="button"
              class="btn btn-primary"
              ng-click="$ctrl.$uibModalInstance.close()">
        OK
      </button>
    </div><!-- .modal-footer -->
  `
};
