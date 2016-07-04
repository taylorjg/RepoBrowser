(function () {

    'use strict';

    angular.module('appRepoBrowser')
        .controller(HomeController.name, HomeController);

    HomeController.$inject = ['GitHubApi', 'RateLimit'];

    function HomeController(GitHubApi, RateLimit) {

        var vm = this;
        vm.repos = [];
        vm.numPages = 0;
        vm.getRepos = getRepos;
        vm.currentPage = null;
        vm.onPageChanged = onPageChanged;
        vm.username = null;
        vm.rateLimit = RateLimit;

        function getRepos(username) {
            vm.username = username;
            vm.currentPage = 1;
            getReposHelper();
        }

        function onPageChanged() {
            getReposHelper();
        }

        function getReposHelper() {
            GitHubApi.getRepos(vm.username, vm.currentPage)
                .then(function (response) {
                    vm.repos = response.data;
                    vm.numPages = response.numPages;
                })
                .catch(function () {
                    vm.repos = [];
                    vm.numPages = 0;
                });
        }
    }
} ());
