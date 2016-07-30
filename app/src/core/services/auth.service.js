(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('authService', authService);

    authService.$inject = ['$http', '$q', 'localStorageService', 'appConfig'];

    function authService($http, $q, localStorageService, appConfig) {

        var siroIn = {
            username: '',
            password: '',
            success: false
        };

        var authentication = {
            isAuthenticated: false,
            username: '',
            role: ''
        };

        var service = {
            getToken: getToken,
            login: login,
            logout: logout
        };

        return service;

        function getToken(loginData) {
            var deferred = $q.defer();

            $http.post(appConfig.getBaseUrl() + '/account/verify', loginData )
                .success(function (response) {
                    siroIn.username = loginData.username;

                    deferred.resolve(siroIn);
                })
                .error(function (error) {
                    deferred.reject(siroIn);
                });

            return deferred.promise;
        }

        function login(loginData) {
            var data = 'grant_type=password&username=' + loginData.username + '&password=' + loginData.password;
            var deferred = $q.defer();

            $http.post(appConfig.getLoginUrl() + '/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' } })
                .success(function (response) {
                    localStorageService.set('authData', { 
                        token: response.access_token, 
                        username: loginData.username, 
                        role: response.role, 
                        userId: response.userId, 
                        sessionId:response.sessionId
                     });

                    authentication.isAuthenticated = true;
                    authentication.username = loginData.username;

                    deferred.resolve(response);
                })
                .error(function (error, status) {
                    deferred.reject(error);
                    logout();
                });

            return deferred.promise;
        }

        function logout() {
            var sessionId = getSessionId();
            $http
                .put(appConfig.getBaseUrl() + '/sessions/' + sessionId + '/logout')
                .then(removeSessionDetails)
                .catch(displayError);
        }
        
        function removeSessionDetails(){
            localStorageService.remove('authData');
            authentication.isAuthenticated = false;
            authentication.username = '';
        }
        
        function displayError(error){
            console.log(error);
        }

        function getSessionId() {
            var authData = localStorageService.get('authData');
            if (authData === null || authData === undefined || authData.sessionId === null) {
                return 0;
            }
            return authData.sessionId;
        }
    }
})();