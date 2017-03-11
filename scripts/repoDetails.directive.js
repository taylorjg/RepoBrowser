import app from './app.module';

class RepoDetails {
    constructor() {
        this.restrict = 'E';
        this.templateUrl = 'templates/repoDetails.directive.html';
        this.replace = true;
        this.scope = {
            repo: '='
        };
        this.controller = function() {};
        this.controllerAs = 'vm';
        this.bindToController = true;
    };
}

app.directive('repoDetails', () => new RepoDetails);
