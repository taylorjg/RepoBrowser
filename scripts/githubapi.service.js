(function () {

    'use strict';

    angular.module('appRepoBrowser')
        .service(GitHubApi.name, GitHubApi);

    GitHubApi.$inject = ['$http', '$interpolate', '$q', 'constants'];

    function GitHubApi($http, $interpolate, $q, constants) {

        function getRepos(username, sortBy, sortDirection, pageSize, page) {

            const url = $interpolate('{{baseUrl}}/users/{{username}}/repos')({
                baseUrl: constants.GITHUBAPI_BASE_URL,
                username: username
            });

            const config = {
                params: {
                    sort: sortBy,
                    direction: sortDirection,
                    per_page: pageSize,
                    page: page
                }
            };

            return $http.get(url, config).then(response => ({
                data: response.data,
                numPages: getNumPages(response, page)
            }));
        }

        function getLanguages(repo) {
            return $http.get(repo.languages_url).then(response =>
                languagesObjectToLanguagesArray(response.data));
        }

        function languagesObjectToLanguagesArray(languagesObject) {
            const ks = Object.keys(languagesObject);
            const vs = ks.map(k => languagesObject[k]);
            const total = vs.reduce((acc, v) => acc + v);
            return ks.map((k, i) => ({
                name: k,
                percentage: Math.round(vs[i] * 100 / total)
            }));
        }

        function getUser(username) {

            const url = $interpolate('{{baseUrl}}/users/{{username}}')({
                baseUrl: constants.GITHUBAPI_BASE_URL,
                username: username
            });

            return $http.get(url).then(response => response.data);
        }

        function getNumPages(response, page) {
            const links = parseLinkHeader(response);
            const lastLink = links.find(link => link.rel === 'last');
            const numPages = lastLink ? Number(/page=(\d+)/.exec(lastLink.href)[1]) : page;
            return numPages;
        }

        function parseLinkHeader(response) {
            const linkHeader = response.headers('link');
            if (!linkHeader) {
                return [];
            }
            return linkHeader
                .split(',')
                .map(link => link.split(';').map(bit => bit.trim()))
                .map(bits => {
                    const bit0 = bits[0];
                    const bit1 = bits[1];
                    const href = /^\<(.*)\>$/.exec(bit0)[1];
                    const rel = /^rel=\"(.*)\"$/.exec(bit1)[1];
                    return { href, rel };
                });
        }

        return {
            getRepos,
            getUser,
            getLanguages
        };
    }
} ());
