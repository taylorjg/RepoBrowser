import app from '../app.module';
import * as C from '../app.constants';

class SpinnerInterceptor {

    static factory() {
        return new SpinnerInterceptor(...arguments);
    }
    
    constructor($rootScope, $q) {
        this.$rootScope = $rootScope;
        this.$q = $q;
        this.request = this.onRequest.bind(this);
        this.requestError = this.onRequestError.bind(this);
        this.response = this.onResponse.bind(this);
        this.responseError = this.onResponseError.bind(this);
    }

    onRequest(config) {
        this.$rootScope.$broadcast(C.GITHUBAPI_BEGIN);
        return config;
    };

    onRequestError(rejection) {
        this.$rootScope.$broadcast(C.GITHUBAPI_END);
        return this.$q.reject(rejection);
    };

    onResponse(response) {
        this.$rootScope.$broadcast(C.GITHUBAPI_END);
        return response;
    };

    onResponseError(rejection) {
        this.$rootScope.$broadcast(C.GITHUBAPI_END);
        return this.$q.reject(rejection);
    };
};

SpinnerInterceptor.factory.$inject = ['$rootScope', '$q'];

app.factory('spinnerInterceptor', SpinnerInterceptor.factory);
