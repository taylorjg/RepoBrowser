(function() {

    'use strict';

    angular.module('appTechTest1')
        .service("GitHubApi", GitHubApi);

    GitHubApi.$inject = [];

    function GitHubApi() {

        var repos = [
            {name: 'Repo 1'},
            {name: 'Repo 2'},
            {name: 'Repo 3'}
        ];

        function get() {
            return repos;
        }

        return {
            get: get
        };
    } 
}());
