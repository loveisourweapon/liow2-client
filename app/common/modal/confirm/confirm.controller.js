class ConfirmController {
  /* @ngInject */
  constructor($uibModalInstance, title, message) {
    Object.assign(this, { $uibModalInstance, title, message });
  }
}

export default ConfirmController;
