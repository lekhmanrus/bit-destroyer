'use strict';

angular
.module('BitDestroyerApp.services')
.service('Timer', [ '$timeout', 'Controls', 'TimerSettings', 'ngProgress', function($timeout, Controls, TimerSettings, ngProgress) {
  
  var timer = { };

  var epsilon = 0.00000000005;

  var getStep = function() {
    return timer.frequencyRefresh / 1000;
  };

  var getPercentStep = function() {
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

  var timeDec = function(callback) {
    if(Controls.isGameOver() || Controls.getPause() || timer.timeLeft - epsilon <= 0) {
      return;
    }
    timer.timeLeft -= getStep();
    timer.timeLeftPercent -= getPercentStep();
    cahngeColor(timer.timeLeftPercent);
    ngProgress.set(timer.timeLeftPercent);
    if(callback) {
      callback();
    }
    setTimeout(timeDec, timer.frequencyRefresh, callback);
  };

  var timeSettingsToDefault = function(callback) {
    timer.maxTime  = TimerSettings.maxTime;
    timer.timeLeft = TimerSettings.timeLeft;
    timer.visibility = TimerSettings.visibility;
    timer.timeLeftPercent = TimerSettings.timeLeftPercent;
    timer.height = TimerSettings.height;
    timer.color = TimerSettings.color;
    timer.colorSuccess = TimerSettings.colorSuccess;
    timer.colorDanger  = TimerSettings.colorDanger;
    timer.frequencyRefresh = TimerSettings.frequencyRefresh;
    timer.freezeTime = TimerSettings.freezeTime;
  };

  timeSettingsToDefault();

  timer.getTimeLeft = function() {
    var ret = timer.timeLeft < epsilon ? 0 : Math.ceil(timer.timeLeft);
    return ret;
  };

  timer.getFreezeTime = function() {
    return timer.freezeTime;
  };

  timer.show = function(freezeCallback, callback) {
    timeSettingsToDefault();
    var decFT = function() {
      if(timer.freezeTime == 0) {
        timer.start(callback);
      //}
      //if(timer.freezeTime == 0) {
        freezeCallback();
      }
      timer.freezeTime--;
      if(timer.freezeTime >= 0) {
        $timeout(decFT, 1000);
      }
    };
    $timeout(decFT, 1000);
    ngProgress.height(timer.height);
    ngProgress.color(timer.color);
    ngProgress.set(timer.timeLeftPercent);
    timer.visibility = true;
    return timer.visibility;
  };

  timer.hide = function() {
    ngProgress.height('0px');
    ngProgress.set(100);
    ngProgress.stop();
    timer.visibility = false;
    return timer.visibility;
  };

  timer.getVisibility = function() {
    return timer.visibility;
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

  timer.start = function(callback) {
    setTimeout(timeDec, 100, callback);
    //timeDec(callback);
  };

  return timer;

}]);
