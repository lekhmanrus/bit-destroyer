'use strict';

angular
.module('BitDestroyerApp.controllers')
.controller('MainCtrl', [ '$scope', 'Timer', function($scope, Timer) {

  Timer.init();

  $scope.timeLeft = Timer.timeLeft;

  $scope.start = function() {
    //Timer.addTime(10);
    Timer.start(function() {
      $scope.timeLeft = Timer.getTimeLeft();
      if($scope.timeLeft <= 0) {
        console.log('Game over!');
      }
    });
  };

  $scope.addTime = function() {
    Timer.addTime(20);
  };


}]);