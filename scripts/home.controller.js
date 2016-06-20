(function() {

    'use strict';

    var app = angular.module('appTechTest1')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'GitHubApi'];

    function HomeController($scope, GitHubApi) {

        var vm = this;
        vm.repos = [];

        GitHubApi.get().then(function(response) {
            vm.repos = response.data;
        });
    }        
}());
