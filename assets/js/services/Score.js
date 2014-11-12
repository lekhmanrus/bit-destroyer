'use strict';

angular
.module('BitDestroyerApp.services')
.service('Score', [ function() {

  var score    = 0,
      best     = localStorage.getItem("bestScore") ? localStorage.getItem("bestScore") : 0,
      callback = undefined,
      bscallback = undefined;

  return {
    addScores: function(scores) {
      score += +scores;
      if(score > best) {
        best = score;
        localStorage.setItem("bestScore", best);
      }
      if(callback) {
        callback(score);
      }
      if(bscallback) {
        bscallback(best);
      }
      return score;
    },
    getScores: function() {
      return score;
    },
    setBestScores: function(bestScores) {
      best = bestScores
      return best;
    },
    getBestScores: function() {
      return best;
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
    },
    setBestScoreCallback: function(bscb) {
      bscallback = bscb;
      return true;
    }
  };

}]);
