'use strict';

angular
.module('BitDestroyerApp.services')
.service('Timer', ['ngProgress', function(ngProgress) {
  
  var timer = { };
  timer.maxTime  = 1;
  timer.timeLeft = 1;
  timer.timeLeftPercent = 100;
  timer.height = '25px';
  timer.color = '#428bca';
  timer.colorSuccess = '#5cb85c';
  timer.colorDanger  = '#d9534f';
  timer.frequencyRefresh = 100;

  var epsilon = 0.00000000005;

  var getStep = function() {
    return timer.frequencyRefresh / 1000;
  };

  var getPercentStep = function() {
    console.log((100 / timer.maxTime) * getStep());
    return (100 / timer.maxTime) * getStep();
  };

  var cahngeColor = function(time) {
    if(time <= 25) {
      ngProgress.color(timer.colorDanger);
    }
    else if(time >= 75) {
      ngProgress.color(timer.colorSuccess);
    }
    else {
      ngProgress.color(timer.color);
    }
  };

  var timeDesc = function(callback) {
    if(timer.timeLeft - epsilon <= 0) {
      return;
    }
    timer.timeLeft -= getStep();
    timer.timeLeftPercent -= getPercentStep();
    cahngeColor(timer.timeLeftPercent);
    ngProgress.set(timer.timeLeftPercent);
    if(callback) {
      callback();
    }
    setTimeout(timeDesc, timer.frequencyRefresh, callback);
  };

  timer.getTimeLeft = function() {
    var ret = timer.timeLeft < epsilon ? 0 : Math.ceil(timer.timeLeft);
    return ret;
  };

  timer.addTime = function(time) {
    timer.timeLeft += time;
    if(timer.timeLeft > timer.maxTime) {
      timer.timeLeftPercent = 100;
      ngProgress.set(timer.timeLeftPercent);
      ngProgress.color(timer.colorSuccess);
      timer.maxTime = timer.timeLeft;
    }
  };

  timer.init = function() {
    ngProgress.height(timer.height);
    ngProgress.color(timer.color);
    ngProgress.set(timer.timeLeftPercent);
  };

  timer.start = function(callback) {
    timeDesc(callback);
  };

  return timer;

}]);
