import app from './app.module';

const DEFAULT_USERNAME = 'taylorjg';
const DEFAULT_SORT_BY = 'full_name';
const DEFAULT_SORT_DIRECTION = 'asc';
const DEFAULT_PAGE_SIZE = 5;

class Controller {
    constructor(AuthenticationStateService) {
        this.AuthenticationStateService = AuthenticationStateService;
        this.username = DEFAULT_USERNAME;
        this.sortBy = DEFAULT_SORT_BY;
        this.sortDirection = DEFAULT_SORT_DIRECTION;
        this.pageSize = String(DEFAULT_PAGE_SIZE);
    }

    onFormSubmit() {
        this.onSubmit({
            username: this.username,
            sortBy: this.sortBy,
            sortDirection: this.sortDirection,
            pageSize: this.pageSize
        });
    }

    feedbackClasses() {
        return {
            'has-feedback': this.AuthenticationStateService.getTokenIsGood() || this.AuthenticationStateService.getTokenIsBad(),
            'has-success': this.AuthenticationStateService.getTokenIsGood(),
            'has-error': this.AuthenticationStateService.getTokenIsBad(),
        };
    }
};

Controller.$inject = ['AuthenticationStateService'];

const searchForm = {
    selector: 'searchForm',
    templateUrl: 'templates/searchForm.component.html',
    bindings: {
        onSubmit: '&'
    },
    controller: Controller,
    controllerAs: 'vm',
};

app.component(searchForm.selector, searchForm);
