'use strict';

angular
.module('BitDestroyerApp.services')
.service('Playfield', [ '$timeout', 'Controls', 'Playitem', 'Score', 'Timer', function($timeout, Controls, Playitem, Score, Timer) {


  var playfield = { };

  playfield.rows  = 4;
  playfield.cols  = 4;
  playfield.field = [ ];

  var items  = playfield.rows * playfield.cols,
      startItemsCount = items / 4;

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

  var changeItemsForm = function(form) {
    playfield.field.forEach(function(e) {
      e.form = form;
    });
  };

  var isNearSameItems = function() {
    var ret = false,
        prev;
    for(var i = 0; i < playfield.rows; i++) {
      prev = playfield.getItem(i, 0);
      for(var j = 1; j < playfield.cols; j++) {
        var cur = playfield.getItem(i, j);
        if(prev) {
          if(prev.type == cur.type) {
            return true;
          }
          prev = cur;
        }
      }
    }
    for(var j = 0; j < playfield.rows; j++) {
      prev = playfield.getItem(i, 0);
      for(var i = 1; i < playfield.cols; i++) {
        var cur = playfield.getItem(i, j);
        if(prev) {
          if(prev.type == cur.type) {
            return true;
          }
          prev = cur;
        }
      }
    }
    return false;
  };

  var init = function() {
    for(var i = 0; i < items; i++) {
      var obj = angular.copy(Playitem[0]);
      obj.animation = 'fade-in';
      playfield.field.push(obj);
    }

    for(var i = 0; i < startItemsCount; i++) {
      if(!addItem()) {
        i--;
      }
    }
  };

  init();

  playfield.regenerate = function() {
    for(var i = 0; i < items; i++) {
      var obj = angular.copy(Playitem[0]);
      obj.animation = 'fade-in';
      playfield.field[i] = obj;
    }

    for(var i = 0; i < startItemsCount; i++) {
      if(!addItem()) {
        i--;
      }
    }
  };

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
    if(Controls.pause) {
      return false;
    }
    var isMove = false;
    if(direction === 'left') {
      for(var i = 0; i < playfield.rows; i++) {
        var counter = 0;
        for(var j = 0; j < playfield.cols; j++) {
          var item = playfield.getItem(i, j);
          if(item.type) {
            if(j > 0) {
              var k    = j - 1,
                  prev = playfield.getItem(i, k);
              for(; k > 0 && !prev.type; k--, prev = playfield.getItem(i, k));
              if(prev.type === item.type) {
                isMove = true;
                playfield.setNullItem(i, j);
                playfield.setNullItem(i, k);
                counter -= 2;
                Score.addScores(item.score);
                Timer.addTime(item.time);
              }
              else if(j !== counter) {
                isMove = true;
                item.animation = 'my-slide my-slide-left-' + (j - counter);
                playfield.setNullItem(i, j);
                playfield.setItem(i, counter, item);
              }
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
            if(j > 0) {
              var k    = j - 1,
                  prev = playfield.getItem(i, playfield.cols - 1 - k);
              for(; k > 0 && !prev.type; k--, prev = playfield.getItem(i, playfield.cols - 1 - k));
              if(prev.type === item.type) {
                isMove = true;
                playfield.setNullItem(i, playfield.cols - 1 - j);
                playfield.setNullItem(i, playfield.cols - 1 - k);
                counter -= 2;
                Score.addScores(item.score);
                Timer.addTime(item.time);
              }
              else if(j !== counter) {
                isMove = true;
                item.animation = 'my-slide my-slide-right-' + (j - counter);
                playfield.setNullItem(i, playfield.cols - 1 - j);
                playfield.setItem(i, playfield.cols - 1 - counter, item);
              }
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
            if(i > 0) {
              var k    = i - 1,
                  prev = playfield.getItem(k, j);
              for(; k > 0 && !prev.type; k--, prev = playfield.getItem(k, j));
              if(prev.type === item.type) {
                isMove = true;
                playfield.setNullItem(i, j);
                playfield.setNullItem(k, j);
                counter -= 2;
                Score.addScores(item.score);
                Timer.addTime(item.time);
              }
              else if(i !== counter) {
                isMove = true;
                item.animation = 'my-slide my-slide-up-' + (i - counter);
                playfield.setNullItem(i, j);
                playfield.setItem(counter, j, item);
              }
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
            if(i > 0) {
              var k    = i - 1,
                  prev = playfield.getItem(playfield.rows - 1 - k, j);
              for(; k > 0 && !prev.type; k--, prev = playfield.getItem(playfield.rows - 1 - k, j));
              if(prev.type === item.type) {
                isMove = true;
                playfield.setNullItem(playfield.rows - 1 - i, j);
                playfield.setNullItem(playfield.rows - 1 - k, j);
                counter -= 2;
                Score.addScores(item.score);
                Timer.addTime(item.time);
              }
              else if(i !== counter) {
                isMove = true;
                item.animation = 'my-slide my-slide-down-' + (i - counter);
                playfield.setNullItem(playfield.cols - 1 - i, j);
                playfield.setItem(playfield.rows - 1 - counter, j, item);
              }
            }
            counter++;
          }
        }
      }
    }
    else {
      throw new RangeError("Direction must be among 'left', 'right', 'up', 'down'.");
    }
    if(isMove && playfield.getFilledItems().length < playfield.field.length) {
      while(!addItem());
    }
    if(!isMove && playfield.getFilledItems().length == playfield.field.length && !isNearSameItems()) {
      Controls.gameOver();
    }
    /*var m = '';
    for(var i in playfield.field) {
      if(i > 0 && i % 4 == 0) {
        console.log(m);
        m = '';
      }
      m += playfield.field[i].score + '  ';
    }
    console.log(m);*/
    if(Score.getScores() >= Controls.getScoreToCircle() && Score.getScores() < Controls.getScoreToRhombus()) {
      changeItemsForm('circle');
    }
    else if(Score.getScores() >= Controls.getScoreToRhombus()) {
      changeItemsForm('rhombus');
    }
    $timeout(angular.noop);
  };

  return playfield;

}]);
