import app from './app.module';

class ErrorInterceptor {

    constructor($q, $rootScope) {
        this.$q = $q;
        this.$rootScope = $rootScope;
    }

    response(response) {
        this.$rootScope.$broadcast('GITHUBAPI_CLEAR_ERROR');
        return response;
    };

    responseError(rejection) {
        this.$rootScope.$broadcast('GITHUBAPI_ERROR', rejection);
        return this.$q.reject(rejection);
    }
};

ErrorInterceptor.$inject = ['$q', '$rootScope'];

app.factory('errorInterceptor', ErrorInterceptor);
