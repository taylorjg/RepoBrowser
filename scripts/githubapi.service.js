(function () {

    'use strict';

    angular.module('appRepoBrowser')
        .service(GitHubApi.name, GitHubApi);

    GitHubApi.$inject = ['$http', '$interpolate'];

    function GitHubApi($http, $interpolate) {

        function getRepos(token, username, page) {

            var url = $interpolate('https://api.github.com/users/{{username}}/repos?per_page=10&page={{page}}')
                ({
                    username: username,
                    page: page
                });
            var authorization = $interpolate('token {{token}}')({ token: token });
            var config = { headers: { 'Authorization': authorization } };
            var promise = $http.get(url, config);

            promise.catch(function (error) {
                console.error('status: %d; statusText: %s', error.status, error.statusText);
            });

            return promise.then(function (response) {
                var linkHeader = response.headers('link');
                var links = linkHeader
                    .split(',')
                    .map(link => link.split(';').map(bit => bit.trim()))
                    .map(bits => {
                        var bit0 = bits[0];
                        var bit1 = bits[1];
                        var href = /^\<(.*)\>$/.exec(bit0)[1];
                        var rel = /^rel=\"(.*)\"$/.exec(bit1)[1];
                        return {
                            href: href,
                            rel: rel
                        };
                    });
                var lastLink = links.find(link => link.rel === 'last');
                var lastPage = Number(/page=(\d+)$/.exec(lastLink.href)[1]);
                return response;
            });
        }

        return {
            getRepos: getRepos
        };
    }
} ());
