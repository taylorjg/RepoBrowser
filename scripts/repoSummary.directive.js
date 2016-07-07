(function() {

    'use strict';

    angular.module('appRepoBrowser')
        .directive(repoSummary.name, repoSummary);

    repoSummary.$inject = [];

    function repoSummary() {
        return {
            restrict: 'E',
            templateUrl: 'templates/repoSummary.directive.html',
            replace: true,
            scope: {
                repo: '=',
                selectedRepo: '=',
                onRepoSelected: '&'
            },
            controller: function() {
                var vm = this;
            },
            controllerAs: 'vm',
            bindToController: true
        };
    }
}());
