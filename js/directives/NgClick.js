'use strict';

angular
.module('BitDestroyerApp.directives')
.directive('NgClick', function(NgClick) {
  return {
    restrict: "A",
    link: function($scope, element, attr) {
      var touchBroken = false,
          touchMoveCounter = 0;
        
      var applyAttribute = function() {
        if(!touchBroken) {
          $scope.$apply(attr['ngClick']);
        }
      };

      element.on('touchend', function(event) {
        touchMoveCounter = 0;
        event.preventDefault();
        applyAttribute();
        touchBroken = false;
        touchMoveCounter = 0;
      });

      element.on('touchmove', function(event) {
        if(touchBroken) {
          return true;
        }
        if(!touchBroken) {
          touchMoveCounter++;
        }
        if(touchMoveCounter > 2) {
          touchBroken = true
        }
      });
    }
  };
});