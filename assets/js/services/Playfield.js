'use strict';

angular
.module('BitDestroyerApp.services')
.service('Playfield', [ 'Playitem', function(Playitem) {

  this.rows  = 4;
  this.cols  = 4;
  this.field = [ ];
  var items = this.rows * this.cols;

  for(var i = 0; i < items; i++) {
    this.field.push(Playitem[0]);
  }

  for(var i = 0; i < items / 2; i++) {
    var index = Math.floor(Math.random() * items);
    if(!this.field[index].type) {
      var item = Math.floor(Math.random() * (Playitem.length - 1)) + 1;
      this.field[index] = Playitem[item];
    }
    else {
      i--;
    }
  }

}]);
