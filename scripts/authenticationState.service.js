import app from './app.module';

class AuthenticationStateService {

    constructor() {
        this.tokenIsGood = false;
        this.tokenIsBad = false;
    }

    getTokenIsGood() {
        return this.tokenIsGood;
    }

    getTokenIsBad() {
        return this.tokenIsBad;
    }

    setTokenIsGood() {
        this.tokenIsGood = true;
        this.tokenIsBad = false;
    }

    setTokenIsBad() {
        this.tokenIsGood = false;
        this.tokenIsBad = true;
    }

    reset() {
        this.tokenIsGood = false;
        this.tokenIsBad = false;
    }
}

AuthenticationStateService.$inject = [];

app.service(AuthenticationStateService.name, AuthenticationStateService);
