'use strict';

angular.module('BitDestroyerApp.controllers', [ 'ngTouch' ]);
angular.module('BitDestroyerApp.directives', [ 'ngTouch' ]);
angular.module('BitDestroyerApp.services', [ 'ngTouch' ]);

angular.module('BitDestroyerApp', [
  'BitDestroyerApp.controllers',
  'BitDestroyerApp.directives',
  'BitDestroyerApp.services',
  'BitDestroyerApp.filters',
  'cfp.hotkeys',
  'ngProgress',
  'ngTouch'
])

.run(['MainMenu', 'Playfield', 'hotkeys', function(MainMenu, Playfield, hotkeys) {

  document.addEventListener("backbutton", function(e) {
    if(MainMenu.getStatus()) {
      e.preventDefault();
      navigator.app.exitApp();
    }
    else {
      MainMenu.open();
    }
  }, false);

  hotkeys.add({
    combo: 'left',
    callback: function() {
      Playfield.moveItems('left');
    }
  });
  hotkeys.add({
    combo: 'right',
    callback: function() {
      Playfield.moveItems('right');
    }
  });
  hotkeys.add({
    combo: 'up',
    callback: function() {
      Playfield.moveItems('up');
    }
  });
  hotkeys.add({
    combo: 'down',
    callback: function() {
      Playfield.moveItems('down');
    }
  });

  var start = { x: 0, y: 0 },
      end   = { x: 0, y: 0 },
      touch = false;

  document.addEventListener('touchstart', function(e) {
    e.preventDefault();
    touch = true;
  }, false);

  document.addEventListener('touchmove', function(e) {
    e.preventDefault();
    if(touch) {
      start.x = e.changedTouches[0].pageX;
      start.y = e.changedTouches[0].pageY;
      touch = false;
    }
    end.x = e.changedTouches[0].pageX;
    end.y = e.changedTouches[0].pageY;
  }, false);

  document.addEventListener('touchend', function(e) {
    e.preventDefault();
    var delta = { x: end.x - start.x, y: start.y - end.y },
        epsilon = 25;

    if(Math.abs(delta.x) > epsilon || Math.abs(delta.y) > epsilon) {
      if(Math.abs(delta.x) > Math.abs(delta.y)) {
        if(delta.x < 0) {
          Playfield.moveItems('left');
        }
        else {
          Playfield.moveItems('right');
        }
      }
      else {
        if(delta.y > 0) {
          Playfield.moveItems('up');
        }
        else {
          Playfield.moveItems('down');
        }
      }
    }
  }, false);

}]);
