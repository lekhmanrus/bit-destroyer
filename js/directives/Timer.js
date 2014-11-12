'use strict';

angular
.module('BitDestroyerApp.directives')
.directive('timer', function(Timer) {
  return {
    restrict: 'E',
    templateUrl: 'partials/directive/Timer.html',

    link: function($scope) {
      $scope.timeLeft  = Timer.getTimeLeft();
      $scope.showTimer = Timer.getVisibility();
      $scope.freezeTime = Timer.getFreezeTime();
      
      $scope.$watch(function() {
        return Timer.getTimeLeft();
      },                       
      function(newVal, oldVal) {
        $scope.timeLeft = newVal;
      }, true);

      $scope.$watch(function() {
        return Timer.getVisibility();
      },                       
      function(newVal, oldVal) {
        $scope.showTimer = newVal;
      }, true);

      $scope.$watch(function() {
        return Timer.getFreezeTime();
      },                       
      function(newVal, oldVal) {
        $scope.freezeTime = newVal;
      }, true);

    }
  };
});
