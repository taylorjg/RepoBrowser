import app from './app.module';

class ErrorPanel {
    constructor() {
        this.restrict = 'E';
        this.templateUrl = 'templates/errorPanel.directive.html';
        this.replace = false;
        this.scope = {};
        this.controller = Controller;
        this.controllerAs = 'vm';
        this.bindToController = true;
    }
};

class Controller {
    constructor($rootScope) {
        this.show = false;
        this.errorMessage = null;
        $rootScope.$on('GITHUBAPI_ERROR', this.onError.bind(this));
        $rootScope.$on('GITHUBAPI_CLEAR_ERROR', this.onClearError.bind(this));
    }

    onError(_, rejection) {
        this.show = true;
        if (rejection.data && rejection.data.message) {
            this.errorMessage = rejection.data.message;
        }
        else {
            this.errorMessage = `${rejection.status}: ${rejection.statusText}`
        }
    }

    onClearError() {
        this.show = false;
        this.errorMessage = null;
    }

    onClose() {
        this.show = false;
    }
};

Controller.$inject = ['$rootScope'];

app.directive('errorPanel', () => new ErrorPanel);
