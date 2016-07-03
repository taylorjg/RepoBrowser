(function () {

    'use strict';

    angular.module('appRepoBrowser')
        .controller(HomeController.name, HomeController);

    HomeController.$inject = ['$scope', 'GitHubApi'];

    function HomeController($scope, GitHubApi) {

        var vm = this;
        vm.repos = [];
        vm.paginationLinks = [];
        vm.getRepos = getRepos;
        vm.getReposPage = getReposPage;
        vm.token = null;
        vm.username = null;

        function getRepos(token, username, filter) {
            vm.token = token;
            vm.username = username;
            getReposHelper(1);
        }

        function getReposPage(page) {
            getReposHelper(page);
        }

        function getReposHelper(page) {
            GitHubApi.getRepos(vm.token, vm.username, page).then(function (response) {
                vm.repos = response.data;
                vm.paginationLinks = response.paginationLinks;
            });
        }
    }
} ());
