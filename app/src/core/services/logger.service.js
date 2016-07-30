(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('loggerService', loggerService);

    loggerService.$inject = ['$state', 'appConfig', 'notify'];

    function loggerService($state, appConfig, notify) {

        var service = {
            error: error,
            info: info,
            success: success,
            warning: warning,
            alert: alert,
        };

        return service;

        function error(message) {
            notify({ message: getErrorMessage(message), classes: 'alert-danger', templateUrl: appConfig.notifyTemplateUrl, position: 'center', duration: 5000 });
            console.log('Error: ' + getErrorMessage(message));
        }

        function info(message) {
            notify({ message: message, classes: 'alert-info', templateUrl: appConfig.notifyTemplateUrl, position: 'center' });
            console.log('Info: ' + message);
        }

        function success(message) {
            notify({ message: message, classes: 'alert-success', templateUrl: appConfig.notifyTemplateUrl, position: 'center' });
            console.log('Success: ' + message);
        }

        function warning(message, data, title) {
            notify({ message: message, classes: 'alert-warning', templateUrl: appConfig.notifyTemplateUrl, position: 'center' });
            console.log('Warning: ' + message, data);
        }

        function alert(sAlert) {
            sweetAlert.swal({
                title: sAlert.title,
                text: sAlert.text,
                type: sAlert.type
            }, function () {
                if (sAlert.hasOwnProperty('state') && sAlert.state) {
                    $state.go(sAlert.state, {}, { reload: true });
                }
            });
        }

        function getErrorMessage(response) {
            if (typeof response === 'object' && response !== null) {
                if (response.hasOwnProperty('status') && response.status === 500) {
                    if (response.data !== undefined && response.data.hasOwnProperty('exceptionMessage') && response.data.exceptionMessage !== '') {
                        return response.data.exceptionMessage;
                    } else {
                        return appConfig.unknownError;
                    }
                } else if (response.hasOwnProperty('status') && response.status === 400) {
                    if (response.data !== undefined && response.data.hasOwnProperty('modelState') && response.data.modelState !== '') {
                        var message = '';
                        var errors = response.data.modelState;
                        for (var er in errors) {
                            if (errors.hasOwnProperty(er)) {
                                message += errors[er][0];
                            }
                        }
                        return message;
                    } else {
                        return appConfig.unknownError;
                    }
                } else if (response.status === 401) {
                    return appConfig.unauthorised;
                }
            } else {
                return response === null ? appConfig.unknownError :  response;
            }
        }
    }
})();