(function () {

    'use strict';

    angular.module('appRepoBrowser')
        .service(GitHubApi.name, GitHubApi);

    GitHubApi.$inject = ['$http', '$interpolate', '$q', '$log'];

    function GitHubApi($http, $interpolate, $q, $log) {

        var PAGE_SIZE = 5;
        var GITHUBAPI_BASE_URL = 'https://api.github.com';

        function getRepos(username, page) {

            var url = $interpolate('{{baseUrl}}/users/{{username}}/repos')({
                baseUrl: GITHUBAPI_BASE_URL,
                username: username
            });

            var config = {
                params: {
                    per_page: PAGE_SIZE,
                    page: page
                }
            };

            return $http.get(url, config).then(function (response) {
                return {
                    data: response.data,
                    numPages: getNumPages(response, page)
                };
            });
        }

        function getNumPages(response, page) {
            var links = parseLinkHeader(response);
            var lastLink = links.find(link => link.rel === 'last');
            var numPages = lastLink ? Number(/page=(\d+)/.exec(lastLink.href)[1]) : page;
            return numPages;
        }

        function parseLinkHeader(response) {
            var linkHeader = response.headers('link');
            return linkHeader
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
        }

        return {
            getRepos: getRepos
        };
    }
} ());
