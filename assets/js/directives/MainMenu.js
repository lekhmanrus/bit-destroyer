'use strict';

angular
.module('BitDestroyerApp.directives')
.directive('mainMenu', function(Playfield) {
  return {
    restrict: 'E',
    templateUrl: 'partials/directive/MainMenu.html',

    link: function($scope) {
      
    }
  };
});