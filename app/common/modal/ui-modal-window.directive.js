import angular from 'angular';
import first from 'lodash/first';

// Fixes to UI Bootstrap Modal
class UiModalWindowDirective {
  constructor($window) {
    Object.assign(this, { $window });

    this.priority = 1;
  }

  link($scope, $element) {
    // Set max-height on modal-body
    let modalBody = first($element.querySelectorAll('.modal-body'));
    let window = angular.element(this.$window);
    window.on('resize', () => setMaxHeight(this.$window.innerHeight));
    $scope.$on('$destroy', () => window.off('resize', () => setMaxHeight(this.$window.innerHeight)));
    setMaxHeight(this.$window.innerHeight);

    function setMaxHeight(windowInnerHeight) {
      let maxHeight = windowInnerHeight
          - 62 /* margins + border */
          - 120 /* header + footer */
        ;

      modalBody.style.maxHeight = `${maxHeight}px`;
    }
  }
}

export default UiModalWindowDirective;
