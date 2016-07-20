import loadingSpinnerTemplate from './loading-spinner.html';

const LoadingSpinnerComponent = {
  bindings: {
    size: '@',
    classes: '@',
  },
  transclude: true,
  template: loadingSpinnerTemplate,
};

export default LoadingSpinnerComponent;
