'use strict';

angular
.module('BitDestroyerApp.directives')
.directive('playitem', function(Playfield) {
  return {
    restrict: 'E',
    templateUrl: 'partials/directive/Playitem.html',
    scope: {
      item: '='
    },

    link: function($scope) {
      
    }
  };
});
