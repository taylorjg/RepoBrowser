(function () {

    'use strict';

    angular.module('appRepoBrowser')
        .service(AuthenticationState.name, AuthenticationState);

    AuthenticationState.$inject = [];

    function AuthenticationState() {
        return {
            token: ''
        };
    }
} ());
