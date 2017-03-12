import app from './app.module';

const config = $httpProvider => {
    $httpProvider.interceptors.push('authenticationInterceptor');
    $httpProvider.interceptors.push('errorInterceptor');
    $httpProvider.interceptors.push('rateLimitInterceptor');
    $httpProvider.interceptors.push('spinnerInterceptor');
};

config.$inject = ['$httpProvider'];

app.config(config);
