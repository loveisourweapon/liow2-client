export default class AlertCtrl {
  /* @ngInject */
  constructor($uibModalInstance, title, message) {
    Object.assign(this, { $uibModalInstance, title, message });
  }
}
