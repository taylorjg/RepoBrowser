(function () {

    'use strict';

    angular.module('appRepoBrowser')
        .controller(HomeController.name, HomeController);

    HomeController.$inject = ['GitHubApi', 'RateLimit', 'constants'];

    function HomeController(GitHubApi, RateLimit, constants) {

        var vm = this;
        vm.repos = [];
        vm.pageSize = constants.PAGE_SIZE;
        vm.numPages = 0;
        vm.getRepos = getRepos;
        vm.currentPage = null;
        vm.selectedRepo = null;
        vm.onPageChanged = onPageChanged;
        vm.onRepoSelected = onRepoSelected; 
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

        function onRepoSelected(repo) {
            vm.selectedRepo = repo;
        }

        function getReposHelper() {
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
    }
} ());
