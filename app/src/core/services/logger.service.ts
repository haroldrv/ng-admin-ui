import AppConfig from './appConfig.ts';

export default class LoggerService {
    static $inject = ['$state', 'appConfig', 'notify'];

    constructor(private $state: any, private appConfig: any, private notify: any) {
    }
    
    public error(message) {
        this.notify({ message: this.getErrorMessage(message), classes: 'alert-danger', templateUrl: this.appConfig.notifyTemplateUrl, position: 'center', duration: 5000 });
        console.log('Error: ' + this.getErrorMessage(message));
    }

    public info(message) {
        this.notify({ message: message, classes: 'alert-info', templateUrl: this.appConfig.notifyTemplateUrl, position: 'center' });
        console.log('Info: ' + message);
    }

    public success(message) {
        this.notify({ message: message, classes: 'alert-success', templateUrl: this.appConfig.notifyTemplateUrl, position: 'center' });
        console.log('Success: ' + message);
    }

    public warning(message, data, title) {
        this.notify({ message: message, classes: 'alert-warning', templateUrl: this.appConfig.notifyTemplateUrl, position: 'center' });
        console.log('Warning: ' + message, data);
    }

    private getErrorMessage(response) {
        if (typeof response === 'object' && response !== null) {
            if (response.hasOwnProperty('status') && response.status === 500) {
                if (response.data !== undefined && response.data.hasOwnProperty('exceptionMessage') && response.data.exceptionMessage !== '') {
                    return response.data.exceptionMessage;
                } else {
                    return this.appConfig.unknownError;
                }
            } else if (response.hasOwnProperty('status') && response.status === 400) {
                if (response.data !== undefined && response.data.hasOwnProperty('modelState') && response.data.modelState !== '') {
                    let message = '';
                    let errors = response.data.modelState;
                    for (let er in errors) {
                        if (errors.hasOwnProperty(er)) {
                            message += errors[er][0];
                        }
                    }
                    return message;
                } else {
                    return this.appConfig.unknownError;
                }
            } else if (response.status === 401) {
                return this.appConfig.unauthorised;
            }
        } else {
            return response === null ? this.appConfig.unknownError : response;
        }
    }
}