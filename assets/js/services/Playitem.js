'use strict';

angular
.module('BitDestroyerApp.services')
.constant('Playitem', [
  { type: 0, score: 0, time: 1, animation: 'fade-in', form: 'square' },  // it must be first
  { type: 2, score: 2, time: 1, animation: 'fade-in', form: 'square' },
  { type: 4, score: 4, time: 1, animation: 'fade-in', form: 'square' },
  { type: 8, score: 8, time: 1, animation: 'fade-in', form: 'square' },
  { type: 16, score: 16, time: 1, animation: 'fade-in', form: 'square' },
  { type: 32, score: 32, time: 1, animation: 'fade-in', form: 'square' },
  { type: 64, score: 64, time: 1, animation: 'fade-in', form: 'square' },
  { type: 128, score: 128, time: 1, animation: 'fade-in', form: 'square' },
  { type: 256, score: 256, time: 1, animation: 'fade-in', form: 'square' }
]);
