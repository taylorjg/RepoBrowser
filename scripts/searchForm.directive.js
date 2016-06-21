(function () {

    'use strict';

    angular.module('appTechTest1')
        .directive('searchForm', searchForm);

    searchForm.$inject = [];

    function searchForm() {
        return {
            restrict: 'A',
            templateUrl: 'scripts/searchForm.directive.html',
            replace: true,
            scope: {
                onSubmit: '&'
            },
            controller: function () {
                var vm = this;
                vm.token = '';
                vm.username = 'taylorjg';
                vm.filter = '';
                vm.onFormSubmit = function () {
                    vm.onSubmit({
                        token: vm.token,
                        username: vm.username,
                        filter: vm.filter
                    });
                }
            },
            controllerAs: 'vm',
            bindToController: true
        };
    }
} ());
