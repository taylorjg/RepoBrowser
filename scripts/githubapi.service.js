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
                return {
                    data: response.data,
                    paginationLinks: getPaginationLinks(response, page)
                };
            });
        }

        function getPaginationLinks(response, page) {
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
            var firstLink = links.find(link => link.rel === 'first');
            var lastLink = links.find(link => link.rel === 'last');
            var prevLink = links.find(link => link.rel === 'prev');
            var nextLink = links.find(link => link.rel === 'next');
            var numPages = lastLink ? Number(/page=(\d+)$/.exec(lastLink.href)[1]) : page;
            function hrefOf(link) {
                return link ? link.href : undefined;
            }
            var paginationLinks = [];
            for (var pageNumber = 1; pageNumber <= numPages; pageNumber++) {
                paginationLinks.push({
                    pageNumber: pageNumber,
                    current: pageNumber === page
                });
            }
            if (prevLink) {
                paginationLinks.prev = true;
                paginationLinks.prevPageNumber = page - 1;
            }
            if (nextLink) {
                paginationLinks.next = true;
                paginationLinks.nextPageNumber = page + 1;
            }
            return paginationLinks;
        }

        return {
            getRepos: getRepos
        };
    }
} ());
