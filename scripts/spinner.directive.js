import app from './app.module';
import * as C from './app.constants';

class Spinner {
    constructor() {
        this.restrict = 'E';
        this.templateUrl = 'templates/spinner.directive.html';
        this.replace = true;
        this.scope = {};
        this.controller = Controller;
        this.controllerAs = 'vm';
        this.bindToController = true;
    }
};

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

app.directive('spinner', () => new Spinner);
