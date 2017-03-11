import app from './app.module';

class RateLimitStateService {
    constructor() {
        this.limit = 0;
        this.remaining = 0;
        this.reset = new Date(0);
    }
}

RateLimitStateService.$inject = [];

app.service(RateLimitStateService.name, RateLimitStateService);
