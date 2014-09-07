'use strict';

angular
.module('BitDestroyerApp.services')
.constant('Playitem', [
  { type: 0, score: 0, time: 0 },  // it must be first
  { type: 2, score: 2, time: 2 },
  { type: 4, score: 4, time: 4 },
  { type: 8, score: 8, time: 8 },
  { type: 16, score: 16, time: 16 },
  { type: 32, score: 32, time: 32 },
  { type: 64, score: 64, time: 64 },
  { type: 128, score: 128, time: 128 },
  { type: 256, score: 256, time: 256 }
]);
