(function () {

    'use strict';

    angular.module('appTechTest1')
        .service("GitHubApi", GitHubApi);

    GitHubApi.$inject = ['$http', '$interpolate'];

    function GitHubApi($http, $interpolate) {

        function getRepos(token, username) {

            var url = $interpolate('https://api.github.com/users/{{username}}/repos')({ username: username });
            var authorization = $interpolate('token {{token}}')({ token: token });
            var config = { headers: { 'Authorization': authorization } };
            var promise = $http.get(url, config);

            promise.catch(function (error) {
                console.error('status: %d; statusText: %s', error.status, error.statusText);
            });

            return promise;
        }

        return {
            getRepos: getRepos
        };
    }
} ());
