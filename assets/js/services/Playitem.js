'use strict';

angular
.module('BitDestroyerApp.services')
.constant('Playitem', [
  { type: 0, score: 0, time: 0, animation: 'fade-in' },  // it must be first
  { type: 2, score: 2, time: 2, animation: 'fade-in' },
  { type: 4, score: 4, time: 4, animation: 'fade-in' },
  { type: 8, score: 8, time: 8, animation: 'fade-in' },
  { type: 16, score: 16, time: 16, animation: 'fade-in' },
  { type: 32, score: 32, time: 32, animation: 'fade-in' },
  { type: 64, score: 64, time: 64, animation: 'fade-in' },
  { type: 128, score: 128, time: 128, animation: 'fade-in' },
  { type: 256, score: 256, time: 256, animation: 'fade-in' }
]);
