import app from './app.module';

class SpinnerInterceptor {
    constructor($rootScope, $q) {

        this.request = config => {
            $rootScope.$broadcast('GITHUBAPI_BEGIN');
            return config;
        };

        this.requestError = rejection => {
            $rootScope.$broadcast('GITHUBAPI_END');
            return $q.reject(rejection);
        };

        this.response = response => {
            $rootScope.$broadcast('GITHUBAPI_END');
            return response;
        };

        this.responseError = rejection => {
            $rootScope.$broadcast('GITHUBAPI_END');
            return $q.reject(rejection);
        };
    }
};

function factory() { return new SpinnerInterceptor(...arguments); };
factory.$inject = ['$rootScope', '$q'];
app.factory('spinnerInterceptor', factory);
