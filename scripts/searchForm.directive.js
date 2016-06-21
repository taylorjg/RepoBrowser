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
                onSubmit2: '&'
            },
            controller: function ($scope) {
                var vm = this;
                vm.token = '';
                vm.username = 'taylorjg';
                vm.filter = '';
                vm.onSubmit = function () {
                    console.log('searchForm.onSubmit');
                    console.log(vm.onSubmit2);
                    vm.onSubmit2({
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
