(function () {

    'use strict';

    angular.module('appRepoBrowser')
        .directive('searchForm', searchForm);

    searchForm.$inject = [];

    function searchForm() {
        return {
            restrict: 'A',
            templateUrl: 'templates/searchForm.directive.html',
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
