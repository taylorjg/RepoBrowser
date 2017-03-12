import app from './app.module';
import * as C from './app.constants';

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
            'has-feedback': this.AuthenticationStateService.tokenState !== C.TOKEN_STATE_NONE,
            'has-success': this.AuthenticationStateService.tokenState === C.TOKEN_STATE_VALID,
            'has-error': this.AuthenticationStateService.tokenState === C.TOKEN_STATE_INVALID
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
