'use strict';

angular
.module('BitDestroyerApp.services')
.constant('Playitem', [
  { type: 0, score: 0, time: 0, animation: 'fade-in', form: 'square' },  // it must be first
  { type: 2, score: 2, time: 1, animation: 'fade-in', form: 'square' },
  { type: 4, score: 4, time: 2, animation: 'fade-in', form: 'square' },
  { type: 8, score: 8, time: 3, animation: 'fade-in', form: 'square' },
  { type: 16, score: 16, time: 4, animation: 'fade-in', form: 'square' },
  { type: 32, score: 32, time: 5, animation: 'fade-in', form: 'square' },
  { type: 64, score: 64, time: 6, animation: 'fade-in', form: 'square' },
  { type: 128, score: 128, time: 7, animation: 'fade-in', form: 'square' },
  { type: 256, score: 256, time: 8, animation: 'fade-in', form: 'square' }
]);
