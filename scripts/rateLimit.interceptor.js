import app from './app.module';

class RateLimitInterceptor {

    constructor($q, RateLimitStateService) {
        this.$q = $q;
        this.RateLimitStateService = RateLimitStateService;
    }

    response(response) {
        if (response.headers('X-RateLimit-Limit') && response.headers('X-RateLimit-Remaining')) {
            this.RateLimitStateService.limit = Number(response.headers('X-RateLimit-Limit'));
            this.RateLimitStateService.remaining = Number(response.headers('X-RateLimit-Remaining'));
            this.RateLimitStateService.reset = new Date(Number(response.headers('X-RateLimit-Reset')) * 1000);
        }
        return response;
    };

    responseError(rejection) {
        if (rejection.headers('X-RateLimit-Limit') && rejection.headers('X-RateLimit-Remaining')) {
            this.RateLimitStateService.limit = Number(rejection.headers('X-RateLimit-Limit'));
            this.RateLimitStateService.remaining = Number(rejection.headers('X-RateLimit-Remaining'));
            this.RateLimitStateService.reset = new Date(Number(rejection.headers('X-RateLimit-Reset')) * 1000);
        }
        return this.$q.reject(rejection);
    };
};

RateLimitInterceptor.$inject = ['$q', 'RateLimitStateService'];

app.factory('rateLimitInterceptor', RateLimitInterceptor);
