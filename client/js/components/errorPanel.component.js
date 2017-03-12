import app from '../app.module';
import * as C from '../app.constants';

class Controller {
    constructor($rootScope) {
        this.show = false;
        this.errorMessage = null;
        $rootScope.$on(C.GITHUBAPI_SET_ERROR, this.onSetError.bind(this));
        $rootScope.$on(C.GITHUBAPI_RESET_ERROR, this.onResetError.bind(this));
    }

    onSetError(_, rejection) {
        this.show = true;
        if (rejection.data && rejection.data.message) {
            this.errorMessage = rejection.data.message;
        }
        else {
            this.errorMessage = `${rejection.status}: ${rejection.statusText}`
        }
    }

    onResetError() {
        this.show = false;
        this.errorMessage = null;
    }

    onClose() {
        this.show = false;
    }
};

Controller.$inject = ['$rootScope'];

const errorPanel = {
    selector: 'errorPanel',
    templateUrl: 'templates/errorPanel.component.html',
    controller: Controller,
    controllerAs: 'vm',
};

app.component(errorPanel.selector, errorPanel);
