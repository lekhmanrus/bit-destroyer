'use strict';

angular
.module('BitDestroyerApp.directives')
.directive('mainMenu', function(MainMenu) {
  return {
    restrict: 'E',
    templateUrl: 'partials/directive/MainMenu.html',

    link: function($scope) {
      $scope.menu = MainMenu;
      $scope.showMenu   = MainMenu.getStatus();
      $scope.showResume = MainMenu.getResume();
      $scope.$watch(function () {
        return MainMenu.getStatus();
      },                       
      function(newVal, oldVal) {
        $scope.showMenu   = newVal;
        $scope.showResume = MainMenu.getResume();
      }, true);
    }
  };
});