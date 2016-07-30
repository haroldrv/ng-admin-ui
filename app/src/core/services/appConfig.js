(function () {
    'use strict';

    angular
        .module('app.core')
        .service('appConfig', appConfig);

    appConfig.$inject = [];

    function appConfig() {
        var baseUrl = 'http://localhost/api';
        var constant = {};
        constant.longDateFormat = 'dd/MM/yyyy hh:mm tt';
        constant.shortDateFormat = 'dd/MM/yyyy';
        constant.parseFormat = 'yyyy-MM-ddTHH:mm:ss';
        constant.timeFormat = 'HH:mm';
        constant.parseTimeFormat = ['HH:mm'];
        constant.dateTimeParseFormats = ['dd/MM/yyyy HH:mm:ss', 'h:mm tt'];
        constant.notifyTemplateUrl = 'src/core/views/notify.html';
        constant.pageSize = 15;

        // methods
        constant.getBaseUrl = getBaseUrl;
        constant.getLoginUrl = getLoginUrl;

        // Messages
        constant.unknownError = 'An error has occurred, please try again later';
        constant.unauthorised = 'You are not authorised to perform this action';

        //styles
        constant.buttonColour = {
            edit: 'btn btn-success',
            view: 'btn btn-info'
        };

        return constant;

        function getBaseUrl() {
            return baseUrl + '/api';
        }

        function getLoginUrl() {
            return baseUrl;
        }
    }
})();