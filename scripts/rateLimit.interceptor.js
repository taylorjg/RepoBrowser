import app from './app.module';

class RateLimitInterceptor {

    static factory() {
        return new RateLimitInterceptor(...arguments);
    }

    constructor($q, RateLimitStateService) {
        this.$q = $q;
        this.RateLimitStateService = RateLimitStateService;
        this.response = this.onResponse.bind(this);
        this.responseError = this.onResponseError.bind(this);
    }

    onResponse(response) {
        if (response.headers('X-RateLimit-Limit') && response.headers('X-RateLimit-Remaining')) {
            this.RateLimitStateService.limit = Number(response.headers('X-RateLimit-Limit'));
            this.RateLimitStateService.remaining = Number(response.headers('X-RateLimit-Remaining'));
            this.RateLimitStateService.reset = new Date(Number(response.headers('X-RateLimit-Reset')) * 1000);
        }
        return response;
    };

    onResponseError(rejection) {
        if (rejection.headers('X-RateLimit-Limit') && rejection.headers('X-RateLimit-Remaining')) {
            this.RateLimitStateService.limit = Number(rejection.headers('X-RateLimit-Limit'));
            this.RateLimitStateService.remaining = Number(rejection.headers('X-RateLimit-Remaining'));
            this.RateLimitStateService.reset = new Date(Number(rejection.headers('X-RateLimit-Reset')) * 1000);
        }
        return this.$q.reject(rejection);
    };
};

RateLimitInterceptor.factory.$inject = ['$q', 'RateLimitStateService'];

app.factory('rateLimitInterceptor', RateLimitInterceptor.factory);
