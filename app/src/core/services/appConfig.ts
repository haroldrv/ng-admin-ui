export default class AppConfig {
    static get Default(): any {
        return {
            longDateFormat: 'dd/MM/yyyy hh:mm tt',
            shortDateFormat: 'dd/MM/yyyy',
            parseFormat: 'yyyy-MM-ddTHH:mm:ss',
            timeFormat: 'HH:mm',
            parseTimeFormat: ['HH:mm'],
            dateTimeParseFormats: ['dd/MM/yyyy HH:mm:ss', 'h:mm tt'],
            notifyTemplateUrl: 'src/core/views/notify.html',
            pageSize: 15,
            getBaseUrl: 'http://localhost/api' + '/api',
            getLoginUrl: 'http://localhost/api',
            unknownError: 'An error has occurred, please try again later',
            unauthorised: 'You are not authorised to perform this action',
            buttonColour: {
                edit: 'btn btn-success',
                view: 'btn btn-info'
            }
        }

    }
}