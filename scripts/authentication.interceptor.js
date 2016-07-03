(function () {

    'use strict';

    angular.module('appRepoBrowser')
        .factory(authenticationInterceptor.name, authenticationInterceptor);

    authenticationInterceptor.$inject = ['$interpolate', 'AuthenticationState'];

    function authenticationInterceptor($interpolate, AuthenticationState) {
        return {
            'request': function (config) {
                if (AuthenticationState.token) {
                    var token = AuthenticationState.token;
                    var authorization = $interpolate('token {{token}}')({ token: token });
                    config.headers['Authorization'] = authorization;
                }
                return config;
            }
        };
    }
} ());
