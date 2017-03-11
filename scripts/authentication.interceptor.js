import app from './app.module';

class AuthenticationInterceptor {

    constructor($q, AuthenticationStateService, constants) {
        this.$q = $q;
        this.AuthenticationStateService = AuthenticationStateService;
        this.constants = constants;
    }

    isGutHubApiRequest(config) {
        return config.url.startsWith(constants.GITHUBAPI_BASE_URL);
    }

    request(config) {
        if (isGutHubApiRequest(config)) {
            if (this.AuthenticationStateService.token) {
                config.headers['Authorization'] = `token ${this.AuthenticationStateService.token}`;
            }
            config.params = config.params || {};
            config.params['_'] = new Date().getTime();
        }
        return config;
    };

    response(response) {
        if (isGutHubApiRequest(response.config)) {
            if (this.AuthenticationStateService.token) {
                this.AuthenticationStateService.setTokenIsGood();
            }
            else {
                this.AuthenticationStateService.reset();
            }
        }
        return response;
    };

    responseError(rejection) {
        if (isGutHubApiRequest(rejection.config)) {
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

AuthenticationInterceptor.$inject = ['$q', 'AuthenticationStateService', 'constants'];

app.factory('authenticationInterceptor', AuthenticationInterceptor);
