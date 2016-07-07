const ModalHeaderComponent = {
  bindings: {
    modalTitle: '@',
    onCloseClick: '&',
  },
  template: `
    <div class="modal-header">
      <button type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              ng-click="$ctrl.onCloseClick()">
        <span aria-hidden="true"><i class="fa fa-times"></i></span>
      </button>
      <h4 class="modal-title">
        {{ $ctrl.modalTitle }}
      </h4>
    </div>
  `
};

export default ModalHeaderComponent;
