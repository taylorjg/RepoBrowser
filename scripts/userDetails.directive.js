(function() {

    'use strict';

    angular.module('appRepoBrowser')
        .directive(userDetails.name, userDetails);

    userDetails.$inject = [];

    function userDetails() {
        return {
            restrict: 'E',
            templateUrl: 'templates/userDetails.directive.html',
            replace: true,
            scope: {
                user: '='
            },
            controller: function() {
                var vm = this;
            },
            controllerAs: 'vm',
            bindToController: true
        };
    }
}());
