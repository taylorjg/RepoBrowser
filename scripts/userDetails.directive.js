import app from './app.module';

class UserDetails {
    constructor() {
        this.restrict = 'E';
        this.templateUrl = 'templates/userDetails.directive.html';
        this.replace = true;
        this.scope = {
            user: '='
        };
        this.controller = function() {};
        this.controllerAs = 'vm';
        this.bindToController = true;
    };
}

app.directive('userDetails', () => new UserDetails);
