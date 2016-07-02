(function() {

    'use strict';

    angular.module('appRepoBrowser')
        .directive(repoDetails.name, repoDetails);

    repoDetails.$inject = [];

    function repoDetails() {
        return {
            restrict: 'E',
            templateUrl: 'templates/repoDetails.directive.html',
            replace: true,
            scope: {
                repo: '='
            },
            controller: function() {
                var vm = this;
            },
            controllerAs: 'vm',
            bindToController: true
        };
    }
}());
