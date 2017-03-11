import app from './app.module';

class RepoSummary {
    constructor() {
        this.restrict = 'E';
        this.templateUrl = 'templates/repoSummary.directive.html';
        this.replace = true;
        this.scope = {
            repo: '=',
            selectedRepo: '=',
            onRepoSelected: '&'
        };
        this.controller = function() {};
        this.controllerAs = 'vm';
        this.bindToController = true;
    };
};

app.directive('repoSummary', () => new RepoSummary);
