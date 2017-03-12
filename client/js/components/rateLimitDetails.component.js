import app from '../app.module';

class Controller {
    constructor(RateLimitStateService) {
        this.RateLimitStateService = RateLimitStateService;
    }
};

Controller.$inject = ['RateLimitStateService'];

const rateLimitDetails = {
    selector: 'rateLimitDetails',
    templateUrl: 'templates/rateLimitDetails.component.html',
    controller: Controller,
    controllerAs: 'vm'
};

app.component(rateLimitDetails.selector, rateLimitDetails);
