import app from './app.module';

const repoDetails = {
    selector: 'repoDetails',
    templateUrl: 'templates/repoDetails.component.html',
    bindings: {
        repo: '='
    },
    controllerAs: 'vm'
};

app.component(repoDetails.selector, repoDetails);
