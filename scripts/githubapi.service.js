(function () {

    'use strict';

    angular.module('appRepoBrowser')
        .service(GitHubApi.name, GitHubApi);

    GitHubApi.$inject = ['$http', '$interpolate', '$q', 'constants'];

    function GitHubApi($http, $interpolate, $q, constants) {

        function getRepos(username, pageSize, page) {

            var url = $interpolate('{{baseUrl}}/users/{{username}}/repos')({
                baseUrl: constants.GITHUBAPI_BASE_URL,
                username: username
            });

            var config = {
                params: {
                    per_page: pageSize,
                    page: page,
                    _: new Date().getTime()
                }
            };

            return $http.get(url, config).then(function (response) {
                return {
                    data: response.data,
                    numPages: getNumPages(response, page)
                };
            });
        }

        function getLanguages(repo) {
            return $http.get(repo.languages_url).then(function (response) {
                const ks = Object.keys(response.data);
                const vs = ks.map(k => response.data[k]);
                const total = vs.reduce((acc, v) => acc + v);
                return ks.map((k, i) => {
                    const percentage = vs[i] * 100 / total;
                    return {
                        name: k,
                        percentage: Math.round(percentage)
                    };
                });
            });
        }

        function getUser(username) {

            var url = $interpolate('{{baseUrl}}/users/{{username}}')({
                baseUrl: constants.GITHUBAPI_BASE_URL,
                username: username
            });

            var config = {
                params: {
                    _: new Date().getTime()
                }
            };

            return $http.get(url, config);
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
            getRepos: getRepos,
            getUser: getUser,
            getLanguages: getLanguages
        };
    }
} ());
