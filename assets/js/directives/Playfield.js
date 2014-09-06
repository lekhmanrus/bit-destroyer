'use strict';

angular
.module('BitDestroyerApp.directives')
.directive('playfield', function(Playfield) {
  return {
    restrict: 'E',
    templateUrl: 'partials/directive/Playfield.html',

    link: function($scope) {
      $scope.items = Playfield.field;
    }
  };
});
