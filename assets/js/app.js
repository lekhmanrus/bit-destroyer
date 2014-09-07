'use strict';

angular.module('BitDestroyerApp.controllers', []);
angular.module('BitDestroyerApp.directives', []);
angular.module('BitDestroyerApp.services', []);

angular.module('BitDestroyerApp', [
  'BitDestroyerApp.controllers',
  'BitDestroyerApp.directives',
  'BitDestroyerApp.services',
  'BitDestroyerApp.filters',
  'cfp.hotkeys',
  'ngAnimate',
  'ngProgress',
  'ngTouch'
])

.run(['hotkeys', function(hotkeys) {

  hotkeys.add({
    combo: 'left',
    description: 'This one goes to 11',
    callback: function() {
      console.log('left');
    }
  });
  hotkeys.add({
    combo: 'right',
    description: 'This one goes to 11',
    callback: function() {
      console.log('right');
    }
  });
  hotkeys.add({
    combo: 'up',
    description: 'This one goes to 11',
    callback: function() {
      console.log('up');
    }
  });
  hotkeys.add({
    combo: 'down',
    description: 'This one goes to 11',
    callback: function() {
      console.log('down');
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
          console.log('left');
        }
        else {
          console.log('right');
        }
      }
      else {
        if(delta.y > 0) {
          console.log('up');
        }
        else {
          console.log('down');
        }
      }
    }
  }, false);

}]);
