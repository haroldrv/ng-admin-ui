(function () {
    'use strict';

    angular
        .module('app.login', ['app.core'])
        .controller('login', login);

    login.$inject = ['$state', 'authService', 'loggerService'];

    function login($state, authService, loggerService) {
        /* jshint validthis:true */
        var vm = this;
        vm.loading = false;
        vm.loginData = {};
        vm.submitForm = submitForm;
        vm.year = (new Date()).getFullYear();

        activate();

        function activate() {
            vm.loginData = {
                username: null,
                password: null
            };
        }

        function submitForm(isValid) {
            vm.submitted = true;
            if (isValid) {
                vm.loading = true;
                authService.login(vm.loginData).then(
                    function (response) {
                        successfulLogin(response);
                    },
                    function (error) {
                        console.log(error);
                        invalidCredentials(error);
                    }
                );
            }
            return false;
        }

        function successfulLogin(response) {
            $state.go('dashboard');
        }

        function invalidCredentials(response) {
            vm.loading = false;
            if (response !== null && response !== undefined && response.hasOwnProperty('error_description') && response.error_description !== '') {
                loggerService.error(response.error_description);
            } else {
                loggerService.error(response);
            }
        }
    }
})();