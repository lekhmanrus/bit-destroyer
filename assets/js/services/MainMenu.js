'use strict';

angular
.module('BitDestroyerApp.services')
.service('MainMenu', [ 'Controls', 'Playfield', 'Score', 'Timer', function(Controls, Playfield, Score, Timer) {
  var status = true,
      resume = false;

  return {
    open: function() {
      Controls.setPause();
      status = true;
      return status;
    },
    close: function() {
      Controls.unsetPause();
      if(Controls.getMode() == 'timeTrial') {
        Timer.start(function() {
          if(Timer.getTimeLeft() <= 0) {
            Controls.gameOver();
          }
        });
      }
      status = false;
      return status;
    },
    getStatus: function() {
      return status;
    },
    setResume: function() {
      resume = true;
      return resume;
    },
    unsetResume: function() {
      resume = false;
      return resume;
    },
    getResume: function() {
      return resume;
    },
    startStandart: function() {
      Playfield.regenerate();
      Controls.unsetPause();
      Controls.newGame();
      Controls.setMode('standart');
      resume = true;
      status = false;
      Timer.hide();
      Score.setToZero();
    },
    startTimeTrial: function() {
      Playfield.regenerate();
      Controls.newGame();
      Controls.setMode('timeTrial');
      resume = true;
      status = false;
      Timer.show(function() {
        Controls.unsetPause();
      },
      function() {
        if(Timer.getTimeLeft() <= 0) {
          Controls.gameOver();
        }
      });
      Score.setToZero();
    }
  };


}]);
