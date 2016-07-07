(function () {

    'use strict';

    angular.module('appRepoBrowser')
        .factory(authenticationInterceptor.name, authenticationInterceptor);

    authenticationInterceptor.$inject = ['$interpolate', '$q', 'AuthenticationState', 'constants'];

    function authenticationInterceptor($interpolate, $q, AuthenticationState, constants) {

        function isGutHubApiRequest(config) {
            return config.url.indexOf(constants.GITHUBAPI_BASE_URL) === 0;
        }

        return {
            'request': function (config) {
                if (isGutHubApiRequest(config)) {
                    if (AuthenticationState.token) {
                        var token = AuthenticationState.token;
                        var authorization = $interpolate('token {{token}}')({ token: token });
                        config.headers['Authorization'] = authorization;
                    }
                    config.params = config.params || {};
                    config.params['_'] = new Date().getTime();
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
