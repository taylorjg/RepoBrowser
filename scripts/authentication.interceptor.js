(function () {

    'use strict';

    angular.module('appRepoBrowser')
        .factory(authenticationInterceptor.name, authenticationInterceptor);

    authenticationInterceptor.$inject = ['$interpolate', '$q', 'AuthenticationState'];

    function authenticationInterceptor($interpolate, $q, AuthenticationState) {
        return {
            'request': function (config) {
                if (AuthenticationState.token) {
                    var token = AuthenticationState.token;
                    var authorization = $interpolate('token {{token}}')({ token: token });
                    config.headers['Authorization'] = authorization;
                }
                return config;
            },
            'response': function (response) {
                if (AuthenticationState.token) {
                    AuthenticationState.setTokenIsGood();
                }
                else {
                    AuthenticationState.reset();
                }
                return response;
            },
            'responseError': function (rejection) {
                if (AuthenticationState.token) {
                    if (rejection.status === 401)
                        AuthenticationState.setTokenIsBad();
                    else
                        AuthenticationState.setTokenIsGood();
                }
                else {
                    AuthenticationState.reset();
                }
                return $q.reject(rejection);
            }
        };
    }
} ());
