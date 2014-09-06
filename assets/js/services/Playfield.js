'use strict';

angular
.module('BitDestroyerApp.services')
.service('Playfield', [ function() {

  this.rows = 4;
  this.cols = 4;

  this.field = [
    32,
    43,
    54,
    65,
    87,
    243,
    546,
    434,
    61,
    23,
    0,
    4324,
    1,
    31,
    41,
    51
  ];

}]);
