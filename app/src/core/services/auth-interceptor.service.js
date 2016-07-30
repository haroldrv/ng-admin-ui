(function () {
    'use strict';

    angular
        .module('app')
        .factory('authInterceptorService', authInterceptorService);

    authInterceptorService.$inject = ['$location', '$q', '$injector', 'localStorageService'];

    function authInterceptorService($location, $q, $injector, localStorageService) {

        var service = {
            request: request,
            responseError: responseError
        };

        return service;

        function request(config) {
            config.headers = config.headers || {};

            var authData = localStorageService.get('authData');
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }

            return config;
        }

        function responseError(error) {
            if (error.status === 401) {
                $injector.get('$state').transitionTo('login');
            }
            return $q.reject(error);
        }
    }
})();
