'use strict';

angular.module('BitDestroyerApp.controllers', []);
angular.module('BitDestroyerApp.directives', []);
angular.module('BitDestroyerApp.services', []);

angular.module('BitDestroyerApp', [
  'BitDestroyerApp.controllers',
  'BitDestroyerApp.directives',
  'BitDestroyerApp.services',
  'BitDestroyerApp.filters',
  'ngTouch',
  'ngProgress'
]);