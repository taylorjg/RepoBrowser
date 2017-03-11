import app from './app.module';

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
        $rootScope.$on('GITHUBAPI_BEGIN', function () {
            this.show = true;
        });

        $rootScope.$on('GITHUBAPI_END', function () {
            this.show = false;
        });
    }
};

Controller.$inject = ['$rootScope'];

app.directive('spinner', () => new Spinner);
