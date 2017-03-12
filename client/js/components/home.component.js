import app from '../app.module';
import * as C from '../app.constants';

class Controller {
    constructor(GitHubApiService) {
        this.GitHubApiService = GitHubApiService;
        this.numPages = 0;
        this.currentPage = null;
        this.selectedRepo = null;
        this.user = null;
        this.repos = [];
    }

    onLookup(username, sortBy, sortDirection, pageSize) {
        this.username = username;
        this.sortBy = sortBy;
        this.sortDirection = sortDirection;
        this.pageSize = pageSize;
        this.currentPage = 1;
        this.getRepos();
        this.getUser();
    }

    onRepoSelected(repo) {
        this.selectedRepo = repo;
        if (!this.selectedRepo.languages) {
            this.GitHubApiService.getLanguages(this.selectedRepo)
                .then(languages => this.selectedRepo.languages = languages);
        }
    }

    onPageChanged() {
        this.getRepos();
    }

    getRepos() {
        this.GitHubApiService.getRepos(this.username, this.sortBy, this.sortDirection, this.pageSize, this.currentPage)
            .then(response => {
                this.repos = response.data;
                this.numPages = response.numPages;
                this.onRepoSelected(this.repos[0]);
            })
            .catch(_ => {
                this.repos = [];
                this.numPages = 0;
                this.selectedRepo = null;
            });
    }

    getUser() {
        this.GitHubApiService.getUser(this.username)
            .then(user => this.user = user)
            .catch(_ => this.user = null);
    }
};

Controller.$inject = ['GitHubApiService'];

const home = {
    selector: 'home',
    templateUrl: 'templates/home.component.html',
    controller: Controller,
    controllerAs: 'vm'
};

app.component(home.selector, home);
