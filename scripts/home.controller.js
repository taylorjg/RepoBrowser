(function () {

    'use strict';

    angular.module('appRepoBrowser')
        .controller(HomeController.name, HomeController);

    HomeController.$inject = ['GitHubApi', 'RateLimit', 'constants'];

    function HomeController(GitHubApi, RateLimit, constants) {

        var vm = this;
        vm.repos = [];
        vm.user = null;
        vm.pageSize = constants.PAGE_SIZE;
        vm.numPages = 0;
        vm.currentPage = null;
        vm.selectedRepo = null;
        vm.username = null;
        vm.rateLimit = RateLimit;
        vm.onLookup = onLookup;
        vm.onRepoSelected = onRepoSelected; 
        vm.onPageChanged = onPageChanged;

        function onLookup(username) {
            vm.username = username;
            vm.currentPage = 1;
            getRepos(username);
            getUser(username);
        }

        function onRepoSelected(repo) {
            vm.selectedRepo = repo;
        }

        function onPageChanged() {
            getRepos();
        }

        function getRepos() {
            GitHubApi.getRepos(vm.username, vm.currentPage)
                .then(function (response) {
                    vm.repos = response.data;
                    vm.numPages = response.numPages;
                    vm.selectedRepo = vm.repos[0];
                })
                .catch(function () {
                    vm.repos = [];
                    vm.numPages = 0;
                    vm.selectedRepo = null;
                });
        }

        function getUser(username) {
            GitHubApi.getUser(vm.username)
                .then(function (response) {
                    vm.user = response.data;
                })
                .catch(function () {
                    vm.user = null;
                });
        }
    }
} ());
