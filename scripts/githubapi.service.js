(function () {

    'use strict';

    angular.module('appTechTest1')
        .service("GitHubApi", GitHubApi);

    GitHubApi.$inject = ['$http'];

    function GitHubApi($http) {

        function get() {
            return $http({
                method: 'GET',
                url: 'https://api.github.com/users/taylorjg/repos',
                headers: { 'Authorization': 'Basic dGF5bG9yamc6Qm9sbG9ja3Mx' }
            });
        }

        return {
            get: get
        };
    }
} ());
