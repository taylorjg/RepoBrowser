import app from './app.module';
import * as C  from './app.constants';

class AuthenticationStateService {

    constructor() {
        this.tokenState = C.TOKEN_STATE_NONE;
        this.token = null;
    }

    setTokenIsValid() {
        this.tokenState = C.TOKEN_STATE_VALID;
    }

    setTokenIsInvalid() {
        this.tokenState = C.TOKEN_STATE_INVALID;
    }

    tokenIsValid() {
        return this.tokenState === C.TOKEN_STATE_VALID;
    }

    tokenIsInvalid() {
        return this.tokenState === C.TOKEN_STATE_INVALID;
    }

    reset() {
        this.tokenState = C.TOKEN_STATE_NONE;
        this.token = null;
    }
}

AuthenticationStateService.$inject = [];

app.service(AuthenticationStateService.name, AuthenticationStateService);
