import app from '../app.module';
import * as C from '../app.constants';

class Controller {
    constructor($rootScope) {
        this.show = false;
        $rootScope.$on(C.GITHUBAPI_BEGIN, this.showSpinner.bind(this));
        $rootScope.$on(C.GITHUBAPI_END, this.hideSpinner.bind(this));
    }

    showSpinner() {
        this.show = true;
    }

    hideSpinner() {
        this.show = false;
    }
};

Controller.$inject = ['$rootScope'];

const spinner = {
    selector: 'spinner',
    templateUrl: 'templates/spinner.component.html',
    controller: Controller,
    controllerAs: 'vm',
};

app.component(spinner.selector, spinner);
