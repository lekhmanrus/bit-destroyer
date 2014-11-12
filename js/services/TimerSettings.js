'use strict';

angular
.module('BitDestroyerApp.services')
.constant('TimerSettings', {
  maxTime:  60,
  timeLeft: 60,
  visibility: false,
  timeLeftPercent: 100,
  height: '25px',
  color:  '#428bca',
  colorSuccess: '#5cb85c',
  colorDanger:  '#d9534f',
  frequencyRefresh: 100,
  freezeTime: 3
});
