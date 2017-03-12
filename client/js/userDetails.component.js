import app from './app.module';

const userDetails = {
    selector: 'userDetails',
    templateUrl: 'templates/userDetails.component.html',
    bindings: {
        user: '='
    },
    controllerAs: 'vm'
};

app.component(userDetails.selector, userDetails);
