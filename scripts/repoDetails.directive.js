(function() {

    'use strict';

    angular.module('appTechTest1').directive('repoDetails', repoDetails);

    repoDetails.$inject = [];

    function repoDetails() {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
            },
            link: function(scope, element) {
            },
            controller: function() {
                var vm = this;
            },
            controllerAs: 'vmRepoDetails',
            bindToController: true
        };
    }
}());
