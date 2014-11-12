'use strict';

angular
.module('BitDestroyerApp.controllers')
.controller('MainCtrl', [ '$scope', 'Controls', 'MainMenu', 'Playfield', 'Score', 'Timer', function($scope, Controls, MainMenu, Playfield, Score, Timer) {

  var colorClasses = [
    'gray',
    'brown',
    'violet',
    'blue',
    'cyan',
    'green',
    'yellow',
    'red'
  ];

  $scope.scores = 0;
  $scope.best = Score.getBestScores();
  Controls.setGameOverCallback(function(isGameOver) {
    $scope.gameOver = isGameOver;
    $scope.gameOverColor = colorClasses[Math.floor(Math.random() * colorClasses.length)];
  });

  $scope.restart = function() {
    Playfield.regenerate();
    Score.setToZero();
    Controls.newGame();
    if(Controls.getMode() == 'timeTrial') {
      Controls.setPause();
      Timer.show(function() {
        Controls.unsetPause();
      },
      function() {
        if(Timer.getTimeLeft() <= 0) {
          Controls.gameOver();
        }
      });
    }
  };

  Score.setCallback(function(score) {
    $scope.scores = score;
  });

  Score.setBestScoreCallback(function(best) {
    $scope.best = best;
  });

  $scope.openMenu = function() {
    MainMenu.open();
  };
   
}]);