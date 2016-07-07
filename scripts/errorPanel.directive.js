(function() {

    'use strict';

    angular.module('appRepoBrowser')
        .directive(errorPanel.name, errorPanel);

    errorPanel.$inject = ['$rootScope', '$interpolate'];

    function errorPanel($rootScope, $interpolate) {
        return {
            restrict: 'E',
            templateUrl: 'templates/errorPanel.directive.html',
            replace: false,
            scope: {},
            controller: function() {

                var vm = this;
                vm.show = false;
                vm.errorMessage = null;
                vm.onClose = onClose;

                function onClose() {
                    vm.show = false;
                }

                $rootScope.$on('GITHUBAPI_ERROR', function(_, rejection) {
                    vm.show = true;
                    if (rejection.data && rejection.data.message) {
                        vm.errorMessage = rejection.data.message;
                    }
                    else {
                        vm.errorMessage = $interpolate('{{ status }}: {{ statusText }}')({
                            status: rejection.status,
                            statusText: rejection.statusText
                        }); 
                    }
                });

                $rootScope.$on('GITHUBAPI_CLEAR_ERROR', function() {
                    vm.show = false;
                    vm.errorMessage = null;
                });
            },
            controllerAs: 'vm',
            bindToController: true
        };
    }
}());
