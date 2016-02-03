export default class DeedCtrl {
  constructor($routeParams) {
    console.log('DeedCtrl', $routeParams);

    this.name = $routeParams.deed;
  }
}

DeedCtrl.$inject = ['$routeParams'];
