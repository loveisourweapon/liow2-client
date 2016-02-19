export default class AlertCtrl {
  constructor($uibModalInstance, title, message) {
    Object.assign(this, { $uibModalInstance, title, message });
  }
}

AlertCtrl.$inject = ['$uibModalInstance', 'title', 'message'];
