(function () {

    'use strict';

    angular.module('appRepoBrowser')
        .controller(HomeController.name, HomeController);

    HomeController.$inject = ['$scope', 'GitHubApi'];

    function HomeController($scope, GitHubApi) {

        var vm = this;
        vm.repos = [];
        vm.getRepos = getRepos;

        function getRepos(token, username, filter) {
            GitHubApi.getRepos(token, username).then(function (response) {
                vm.repos = response.data;
            });
        }
    }
} ());
