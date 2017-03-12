import app from './app.module';

const XRateLimitLimit = 'X-RateLimit-Limit';
const XRateLimitRemaining = 'X-RateLimit-Remaining';
const XRateLimitReset = 'X-RateLimit-Reset';

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
        if (response.headers(XRateLimitLimit) && response.headers(XRateLimitRemaining)) {
            this.RateLimitStateService.limit = Number(response.headers(XRateLimitLimit));
            this.RateLimitStateService.remaining = Number(response.headers(XRateLimitRemaining));
            this.RateLimitStateService.reset = new Date(Number(response.headers(XRateLimitReset)) * 1000);
        }
        return response;
    };

    onResponseError(rejection) {
        if (rejection.headers(XRateLimitLimit) && rejection.headers(XRateLimitRemaining)) {
            this.RateLimitStateService.limit = Number(rejection.headers(XRateLimitLimit));
            this.RateLimitStateService.remaining = Number(rejection.headers(XRateLimitRemaining));
            this.RateLimitStateService.reset = new Date(Number(rejection.headers(XRateLimitReset)) * 1000);
        }
        return this.$q.reject(rejection);
    };
};

RateLimitInterceptor.factory.$inject = ['$q', 'RateLimitStateService'];

app.factory('rateLimitInterceptor', RateLimitInterceptor.factory);
