(function() {

    'use strict';

    angular.module('appRepoBrowser')
        .directive(spinner.name, spinner);

    spinner.$inject = ['$rootScope'];

    function spinner($rootScope) {
        return {
            restrict: 'E',
            templateUrl: 'templates/spinner.directive.html',
            replace: true,
            scope: {},
            controller: function() {

                var vm = this;
                vm.show = false;

                $rootScope.$on('GITHUBAPI_BEGIN', function() {
                    vm.show = true;
                });

                $rootScope.$on('GITHUBAPI_END', function() {
                    vm.show = false;
                });
            },
            controllerAs: 'vm',
            bindToController: true
        };
    }
}());
