export default class ConfirmCtrl {
  /* @ngInject */
  constructor($uibModalInstance, title, message) {
    Object.assign(this, { $uibModalInstance, title, message });
  }
}
