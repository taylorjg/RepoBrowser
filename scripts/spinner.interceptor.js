import app from './app.module';

class SpinnerInterceptor {

    constructor($rootScope, $q) {
        console.log('SpinnerInterceptor constructor');
        this.$rootScope = $rootScope;
        this.$q = $q;
    }

    request(config) {
        this.$rootScope.$broadcast('GITHUBAPI_BEGIN');
        return config;
    };

    requestError(rejection) {
        this.$rootScope.$broadcast('GITHUBAPI_END');
        return this.$q.reject(rejection);
    };

    response(response) {
        this.$rootScope.$broadcast('GITHUBAPI_END');
        return response;
    };

    responseError(rejection) {
        this.$rootScope.$broadcast('GITHUBAPI_END');
        return this.$q.reject(rejection);
    };
};

SpinnerInterceptor.$inject = ['$rootScope', '$q'];

app.factory('spinnerInterceptor', SpinnerInterceptor);
