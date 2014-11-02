'use strict';

angular
.module('BitDestroyerApp.services')
.service('Score', [ function() {
  var score    = 0,
      callback = undefined;

  return {
    addScores: function(scores) {
      score += +scores;
      if(callback) {
        callback(score);
      }
      return score;
    },
    getScores: function() {
      return score;
    },
    setToZero: function() {
      score = 0;
      if(callback) {
        callback(score);
      }
      return score;
    },
    setCallback: function(cb) {
      callback = cb;
      return true;
    }
  };

}]);
