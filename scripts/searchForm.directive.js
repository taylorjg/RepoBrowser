(function () {

    'use strict';

    angular.module('appRepoBrowser')
        .directive(searchForm.name, searchForm);

    searchForm.$inject = ['AuthenticationState'];

    function searchForm(AuthenticationState) {
        return {
            restrict: 'E',
            templateUrl: 'templates/searchForm.directive.html',
            replace: true,
            scope: {
                onSubmit: '&'
            },
            controller: function () {
                var vm = this;
                vm.authenticationState = AuthenticationState;
                vm.username = 'taylorjg';
                vm.onFormSubmit = function () {
                    vm.onSubmit({ username: vm.username });
                }
            },
            controllerAs: 'vm',
            bindToController: true
        };
    }
} ());
