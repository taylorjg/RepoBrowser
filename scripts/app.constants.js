(function () {

    'use strict';

    angular.module('appRepoBrowser')
        .constant(constants.name, constants());

    function constants() {
        return {
            GITHUBAPI_BASE_URL: 'https://api.github.com',
            DEFAULT_PAGE_SIZE: 10
        };
    }
} ());
