(function() {

    'use strict';

    angular.module('appTechTest1').controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'GitHubApi'];

    function HomeController($scope, GitHubApi) {

        var vm = this;
        vm.token = '';
        vm.username = 'taylorjg';
        vm.repos = [];
        vm.getRepos = getRepos;

        function getRepos() {
            GitHubApi.getRepos(vm.token, vm.username).then(function(response) {
                vm.repos = response.data;
            });
        }
    }        
}());
