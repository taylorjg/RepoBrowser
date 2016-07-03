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
                vm.feedbackClasses = function () {
                    return {
                        'has-feedback': AuthenticationState.getTokenIsGood() || AuthenticationState.getTokenIsBad(),
                        'has-success': AuthenticationState.getTokenIsGood(),
                        'has-error': AuthenticationState.getTokenIsBad(),
                    };
                }
            },
            controllerAs: 'vm',
            bindToController: true
        };
    }
} ());
