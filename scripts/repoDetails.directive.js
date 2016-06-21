(function() {

    'use strict';

    angular.module('appTechTest1')
        .directive(repoDetails.name, repoDetails);

    repoDetails.$inject = [];

    function repoDetails() {
        return {
            restrict: 'A',
            replace: true,
            scope: {
            },
            controller: function() {
                var vm = this;
            },
            controllerAs: 'vm',
            bindToController: true
        };
    }
}());
