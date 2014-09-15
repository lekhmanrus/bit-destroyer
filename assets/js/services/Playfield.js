'use strict';

angular
.module('BitDestroyerApp.services')
.service('Playfield', [ 'Playitem', function(Playitem) {

  var playfield = { };

  playfield.rows  = 4;
  playfield.cols  = 4;
  playfield.field = [ ];

  var items  = playfield.rows * playfield.cols;

  var addItem = function() {
    var index = Math.floor(Math.random() * items);
    if(!playfield.field[index].type) {
      var item = Math.floor(Math.random() * (Playitem.length - 1)) + 1;
      var obj  = angular.copy(Playitem[item]);
      obj.animation = 'fade-in';
      playfield.field[index] = obj;
      return true;
    }
    return false;
  };

  var setDefaultAnimation = function() {
    playfield.field.forEach(function(e) {
      e.animation = 'fade-in';
    });
  };

  for(var i = 0; i < items; i++) {
    var obj = angular.copy(Playitem[0]);
    obj.animation = 'fade-in';
    playfield.field.push(obj);
  }

  for(var i = 0; i < items / 4; i++) {
    if(!addItem()) {
      i--;
    }
  }

  playfield.getFilledItems = function() {
    return playfield.field.filter(function(e) {
      return e.type
    });
  };

  playfield.getItem = function(row, col) {
    return playfield.field[row * 4 + col];
  };

  playfield.setItem = function(row, col, item) {
    playfield.field[row * 4 + col] = item;
    return item;
  };

  playfield.setNullItem = function(row, col) {
    var item = angular.copy(Playitem[0]);
    item.animation = 'fade-in';
    playfield.setItem(row, col, item);
    return item;
  };

  playfield.moveItems = function(direction) {
    if(direction === 'left') {
      for(var i = 0; i < playfield.rows; i++) {
        var counter = 0;
        for(var j = 0; j < playfield.cols; j++) {
          var item = playfield.getItem(i, j);
          if(item.type) {
            if(j > 0 && j != counter) {
              item.animation = 'my-slide my-slide-left-' + (j - counter);
              playfield.setNullItem(i, j);
              playfield.setItem(i, counter, item);
            }
            counter++;
          }
        }
      }
    }
    else if(direction === 'right') {
      for(var i = 0; i < playfield.rows; i++) {
        var counter = 0;
        for(var j = 0; j < playfield.cols; j++) {
          var item = playfield.getItem(i, playfield.cols - 1 - j);
          if(item.type) {
            if(j > 0 && j != counter) {
              item.animation = 'my-slide my-slide-right-' + (j - counter);
              playfield.setNullItem(i, playfield.cols - 1 - j);
              playfield.setItem(i, playfield.cols - 1 - counter, item);
            }
            counter++;
          }
        }
      }
    }
    else if(direction === 'up') {
      for(var j = 0; j < playfield.cols; j++) {
        var counter = 0;
        for(var i = 0; i < playfield.rows; i++) {
          var item = playfield.getItem(i, j);
          if(item.type) {
            if(i > 0 && i != counter) {
              item.animation = 'my-slide my-slide-up-' + (i - counter);
              playfield.setNullItem(i, j);
              playfield.setItem(counter, j, item);
            }
            counter++;
          }
        }
      }
    }
    else if(direction === 'down') {
      for(var j = 0; j < playfield.cols; j++) {
        var counter = 0;
        for(var i = 0; i < playfield.rows; i++) {
          var item = playfield.getItem(playfield.rows - 1 - i, j);
          if(item.type) {
            if(i > 0 && i != counter) {
              item.animation = 'my-slide my-slide-down-' + (i - counter);
              playfield.setNullItem(playfield.cols - 1 - i, j);
              playfield.setItem(playfield.rows - 1 - counter, j, item);
            }
            counter++;
          }
        }
      }
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
