import app from './app.module';
import * as C from './app.constants';

class SearchForm {
    constructor() {
        this.restrict = 'E';
        this.templateUrl = 'templates/searchForm.directive.html';
        this.replace = true;
        this.scope = {
            onSubmit: '&'
        };
        this.controller = Controller;
        this.controllerAs = 'vm';
        this.bindToController = true;
    }
};

class Controller {
    constructor(AuthenticationStateService) {
        this.AuthenticationStateService = AuthenticationStateService;
        this.username = 'taylorjg';
        this.sortBy = C.DEFAULT_SORT_BY;
        this.sortDirection = C.DEFAULT_SORT_DIRECTION;
        this.pageSize = String(C.DEFAULT_PAGE_SIZE);
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

app.directive('searchForm', () => new SearchForm);
