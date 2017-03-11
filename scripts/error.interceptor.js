import app from './app.module';
import * as C from './app.constants';

class ErrorInterceptor {

    static factory() {
        return new ErrorInterceptor(...arguments);
    }

    constructor($rootScope, $q) {
        this.$rootScope = $rootScope;
        this.$q = $q;
        this.response = this.onResponse.bind(this);
        this.responseError = this.onResponseError.bind(this);
    }

    onResponse(response) {
        this.$rootScope.$broadcast(C.GITHUBAPI_CLEAR_ERROR);
        return response;
    };

    onResponseError(rejection) {
        this.$rootScope.$broadcast(C.GITHUBAPI_ERROR, rejection);
        return this.$q.reject(rejection);
    };
};

ErrorInterceptor.factory.$inject = ['$rootScope', '$q'];

app.factory('errorInterceptor', ErrorInterceptor.factory);
