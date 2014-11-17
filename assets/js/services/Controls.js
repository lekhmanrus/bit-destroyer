'use strict';

angular
.module('BitDestroyerApp.services')
.service('Controls', [ 'Score', function(Score) {

  var controls = { };
  controls.pause = true;
  controls.mode  = undefined;
  controls.gameOverFlag = false;
  controls.toCircle = 5000;
  controls.toRhombus = 10000;

  var callback = undefined;

  controls.getScoreToCircle = function() {
    return controls.toCircle;
  };

  controls.getScoreToRhombus = function() {
    return controls.toRhombus;
  };

  controls.setPause = function() {
    controls.pause = true;
    return controls.pause;
  };

  controls.unsetPause = function() {
    controls.pause = false;
    return controls.pause;
  };

  controls.getPause = function() {
    return controls.pause;
  };

  controls.setMode = function(mode) {
    controls.mode = mode;
    Score.loadBestScore(mode);
    return controls.mode;
  };

  controls.getMode = function() {
    return controls.mode;
  };

  controls.gameOver = function() {
    controls.gameOverFlag = true;
    if(callback) {
      callback(controls.gameOverFlag);
    }
    return controls.gameOverFlag;
  };

  controls.newGame = function() {
    controls.gameOverFlag = false;
    if(callback) {
      callback(controls.gameOverFlag);
    }
    return controls.gameOverFlag;
  };

  controls.isGameOver = function() {
    return controls.gameOverFlag;
  };

  controls.setGameOverCallback = function(cb) {
    callback = cb;
    return true;
  };

  return controls;

}]);
