import * as angular from 'angular';

export default class AuthInterceptorService {

    static $inject = ['$location', '$q', '$injector', 'localStorageService'];

    constructor(
        private $location: ng.ILocationService,
        private $q: ng.IQService,
        private $injector: any,
        private localStorageService: any) { }

    public request(config) {
        config.headers = config.headers || {};

        let authData = this.localStorageService.get('authData');
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
        }

        return config;
    }

    public responseError(error) {
        if (error.status === 401) {
            this.$injector.get('$state').transitionTo('login');
        }
        return this.$q.reject(error);
    }
}

angular
    .module('app')
    .service('authInterceptorService', AuthInterceptorService);