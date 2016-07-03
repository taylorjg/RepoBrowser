(function () {

    'use strict';

    angular.module('appRepoBrowser')
        .service(AuthenticationState.name, AuthenticationState);

    AuthenticationState.$inject = [];

    function AuthenticationState() {

        var tokenIsGood = false;
        var tokenIsBad = false;

        return {
            token: '',
            getTokenIsGood: function () { return tokenIsGood; },
            getTokenIsBad: function () { return tokenIsBad; },
            setTokenIsGood: function () {
                tokenIsGood = true;
                tokenIsBad = false;
            },
            setTokenIsBad: function () {
                tokenIsGood = false;
                tokenIsBad = true;
            },
            reset: function() {
                tokenIsGood = false;
                tokenIsBad = false;
            }
        };
    }
} ());
