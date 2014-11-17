'use strict';

angular
.module('BitDestroyerApp.services')
.service('Score', [ function() {

  var score = 0,
      best  = 0,
      callback   = undefined,
      bscallback = undefined,
      mode = undefined;

  return {
    addScores: function(scores) {
      score += +scores;
      if(score > best) {
        best = score;
        if(mode == 'standart') {
          localStorage.setItem("bestStandart", best);
        }
        else if(mode == 'timeTrial') {
          localStorage.setItem("bestTimeTrial", best);
        }
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
    loadBestScore: function(m) {
      if(m == 'standart') {
        best = localStorage.getItem("bestStandart") ? localStorage.getItem("bestStandart") : 0;
      }
      else if(m == 'timeTrial') {
        best = localStorage.getItem("bestTimeTrial") ? localStorage.getItem("bestTimeTrial") : 0;
      }
      else {
        best = 0;
      }
      if(bscallback) {
        bscallback(best);
      }
      mode = m;
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
