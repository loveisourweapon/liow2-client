export default class ConfirmCtrl {
  constructor($uibModalInstance, title, message) {
    Object.assign(this, { $uibModalInstance, title, message });
  }
}

ConfirmCtrl.$inject = ['$uibModalInstance', 'title', 'message'];
