import app from './app.module';

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
    constructor(AuthenticationStateService, constants) {
        this.AuthenticationStateService = AuthenticationStateService;
        this.constants = constants;
        this.username = 'taylorjg';
        this.sortBy = constants.DEFAULT_SORT_BY;
        this.sortDirection = constants.DEFAULT_SORT_DIRECTION;
        this.pageSize = String(constants.DEFAULT_PAGE_SIZE);
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

Controller.$inject = ['AuthenticationStateService', 'constants'];

app.directive('searchForm', () => new SearchForm);
