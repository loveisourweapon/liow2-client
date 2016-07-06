const LoadingSpinnerComponent = {
  bindings: {
    size: '@',
    classes: '@',
  },
  transclude: true,
  template: `
    <p class="text-center">
      <i class="fa fa-fw fa-cog fa-{{ $ctrl.size }} fa-spin {{ $ctrl.classes }}"></i>
      <ng-transclude></ng-transclude>
    </p>
  `
};

export default LoadingSpinnerComponent;
