(function() {

    'use strict';

    angular.module('appRepoBrowser')
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
