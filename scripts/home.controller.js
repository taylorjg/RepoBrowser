import app from './app.module';

class HomeController {
    constructor(GitHubApiService, RateLimitStateService, constants) {
        this.GitHubApiService = GitHubApiService;
        this.repos = [];
        this.user = null;
        this.sortBy = constants.DEFAULT_SORT_BY;
        this.sortDirection = constants.DEFAULT_SORT_DIRECTION;
        this.pageSize = constants.DEFAULT_PAGE_SIZE;
        this.numPages = 0;
        this.currentPage = null;
        this.selectedRepo = null;
        this.username = null;
        this.rateLimitState = RateLimitStateService;
    }

    onLookup(username, sortBy, sortDirection, pageSize) {
        this.username = username;
        this.sortBy = sortBy;
        this.sortDirection = sortDirection;
        this.pageSize = pageSize;
        this.currentPage = 1;
        this.getRepos();
        this.getUser(username);
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

    getUser(username) {
        this.GitHubApiService.getUser(this.username)
            .then(user => this.user = user)
            .catch(_ => this.user = null);
    }
};

HomeController.$inject = ['GitHubApiService', 'RateLimitStateService', 'constants'];

app.controller(HomeController.name, HomeController);
