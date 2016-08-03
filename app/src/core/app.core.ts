import * as angular from 'angular';
import AuthService from './services/auth.service';
import AppConfig from './services/appConfig'
import LoggerService from './services/logger.service';
import KendoService from './services/kendo.service';

export default angular
    .module('app.core', [])
    .service('authService', AuthService)
    .service('loggerService', LoggerService)
    .service('kendoService', KendoService)
    .constant('appConfig', AppConfig.Default)
    .name;