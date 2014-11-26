'use strict';

angular
.module('BitDestroyerApp.services')
.constant('TimerSettings', {
  maxTime:  15,
  timeLeft: 15,
  visibility: false,
  timeLeftPercent: 100,
  height: '25px',
  color:  '#428bca',
  colorSuccess: '#5cb85c',
  colorDanger:  '#d9534f',
  frequencyRefresh: 100,
  freezeTime: 3
});
