import app from './app.module';

class AuthenticationInterceptor {

    static factory() {
        return new AuthenticationInterceptor(...arguments);
    }

    constructor($q, AuthenticationStateService, constants) {
        this.$q = $q;
        this.AuthenticationStateService = AuthenticationStateService;
        this.constants = constants;
        this.request = this.onRequest.bind(this);
        this.response = this.onResponse.bind(this);
        this.responseError = this.onResponseError.bind(this);
    }

    isGutHubApiRequest(config) {
        return config.url.startsWith(this.constants.GITHUBAPI_BASE_URL);
    }

    onRequest(config) {
        if (this.isGutHubApiRequest(config)) {
            if (this.AuthenticationStateService.token) {
                config.headers['Authorization'] = `token ${this.AuthenticationStateService.token}`;
            }
            config.params = config.params || {};
            config.params['_'] = new Date().getTime();
        }
        return config;
    };

    onResponse(response) {
        if (this.isGutHubApiRequest(response.config)) {
            if (this.AuthenticationStateService.token) {
                this.AuthenticationStateService.setTokenIsGood();
            }
            else {
                this.AuthenticationStateService.reset();
            }
        }
        return response;
    };

    onResponseError(rejection) {
        if (this.isGutHubApiRequest(rejection.config)) {
            if (this.AuthenticationStateService.token) {
                if (rejection.status === 401)
                    this.AuthenticationStateService.setTokenIsBad();
                else
                    this.AuthenticationStateService.setTokenIsGood();
            }
            else {
                this.AuthenticationStateService.reset();
            }
        }
        return this.$q.reject(rejection);
    };
};

AuthenticationInterceptor.factory.$inject = ['$q', 'AuthenticationStateService', 'constants'];

app.factory('authenticationInterceptor', AuthenticationInterceptor.factory);
