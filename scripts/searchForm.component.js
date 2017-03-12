import app from './app.module';
import * as C from './app.constants';

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
