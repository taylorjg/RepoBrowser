(function () {

    'use strict';

    angular.module('appRepoBrowser')
        .controller(HomeController.name, HomeController);

    HomeController.$inject = ['$scope', 'GitHubApi'];

    function HomeController($scope, GitHubApi) {

        var vm = this;
        vm.repos = [];
        vm.paginationLinks = [
            {
                pageNumber: '1',
                href: 'https://api.github.com/user/676165/repos?per_page=10&page=1'
            },
            {
                pageNumber: '4',
                href: 'https://api.github.com/user/676165/repos?per_page=10&page=4'
            },
            {
                pageNumber: '5',
                current: true
            },
            {
                pageNumber: '6',
                href: 'https://api.github.com/user/676165/repos?per_page=10&page=6'
            },
            {
                pageNumber: '14',
                href: 'https://api.github.com/user/676165/repos?per_page=10&page=14'
            },
        ];
        vm.getRepos = getRepos;

        function getRepos(token, username, filter) {
            GitHubApi.getRepos(token, username).then(function (response) {
                vm.repos = response.data;
            });
        }
    }
} ());
