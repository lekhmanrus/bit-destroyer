'use strict';

angular
.module('BitDestroyerApp.services')
.service('Playfield', [ 'Playitem', function(Playitem) {

  var playfield = { };

  playfield.rows  = 4;
  playfield.cols  = 4;
  playfield.field = [ ];
  playfield.animation = 'am-fade';

  var items  = playfield.rows * playfield.cols;

  var addItem = function() {
    var index = Math.floor(Math.random() * items);
    if(!playfield.field[index].type) {
      var item = Math.floor(Math.random() * (Playitem.length - 1)) + 1;
      playfield.field[index] = Playitem[item];
      return true;
    }
    return false;
  };

  for(var i = 0; i < items; i++) {
    playfield.field.push(Playitem[0]);
  }

  for(var i = 0; i < items / 2; i++) {
    if(!addItem()) {
      i--;
    }
  }

  playfield.getFilledItems = function() {
    return playfield.field.filter(function(e) {
      return e.type
    });
  };

  playfield.moveItems = function(direction) {
    if(direction === 'left') {
      console.log('left');
    }
    else if(direction === 'right') {
      console.log('right');
    }
    else if(direction === 'up') {
      console.log('up');
    }
    else if(direction === 'down') {
      console.log('down');
    }
    else {
      throw new RangeError("Direction must be among 'left', 'right', 'up', 'down'.");
    }
    if(playfield.getFilledItems().length < playfield.field.length) {
      while(!addItem());
    }
  };

  return playfield;

}]);
