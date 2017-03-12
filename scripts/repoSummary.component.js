import app from './app.module';

const repoSummary = {
    selector: 'repoSummary',
    templateUrl: 'templates/repoSummary.component.html',
    bindings: {
        repo: '=',
        selectedRepo: '=',
        onRepoSelected: '&'
    },
    controllerAs: 'vm'
};

app.component(repoSummary.selector, repoSummary);
