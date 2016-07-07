(function () {

    'use strict';

    angular.module('appRepoBrowser')
        .controller(HomeController.name, HomeController);

    HomeController.$inject = ['GitHubApi', 'RateLimitState', 'constants'];

    function HomeController(GitHubApi, RateLimitState, constants) {

        var vm = this;
        vm.repos = [];
        vm.user = null;
        vm.sortBy = constants.DEFAULT_SORT_BY;
        vm.sortDirection = constants.DEFAULT_SORT_DIRECTION;
        vm.pageSize = constants.DEFAULT_PAGE_SIZE;
        vm.numPages = 0;
        vm.currentPage = null;
        vm.selectedRepo = null;
        vm.username = null;
        vm.rateLimitState = RateLimitState;
        vm.onLookup = onLookup;
        vm.onRepoSelected = onRepoSelected;
        vm.onPageChanged = onPageChanged;

        function onLookup(username, sortBy, sortDirection, pageSize) {
            vm.username = username;
            vm.sortBy = sortBy;
            vm.sortDirection = sortDirection;
            vm.pageSize = pageSize;
            vm.currentPage = 1;
            getRepos(username);
            getUser(username);
        }

        function onRepoSelected(repo) {
            vm.selectedRepo = repo;
            if (!vm.selectedRepo.languages) {
                GitHubApi.getLanguages(vm.selectedRepo)
                    .then(function (languages) {
                        vm.selectedRepo.languages = languages;
                    });
            }
        }

        function onPageChanged() {
            getRepos();
        }

        function getRepos() {
            GitHubApi.getRepos(vm.username, vm.sortBy, vm.sortDirection, vm.pageSize, vm.currentPage)
                .then(function (response) {
                    vm.repos = response.data;
                    vm.numPages = response.numPages;
                    onRepoSelected(vm.repos[0]);
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
