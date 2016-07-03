(function () {

    'use strict';

    angular.module('appRepoBrowser')
        .controller(HomeController.name, HomeController);

    HomeController.$inject = ['$scope', 'GitHubApi', 'RateLimit'];

    function HomeController($scope, GitHubApi, RateLimit) {

        var vm = this;
        vm.repos = [];
        vm.paginationLinks = [];
        vm.getRepos = getRepos;
        vm.getReposPage = getReposPage;
        vm.rateLimit = RateLimit;
        vm.username = null;

        function getRepos(username) {
            vm.username = username;
            getReposHelper(1);
        }

        function getReposPage(page) {
            getReposHelper(page);
        }

        function getReposHelper(page) {
            GitHubApi.getRepos(vm.username, page)
                .then(function (response) {
                    vm.repos = response.data;
                    vm.paginationLinks = response.paginationLinks;
                })
                .catch(function () {
                    vm.repos = [];
                    vm.paginationLinks = [];
                });
        }
    }
} ());
