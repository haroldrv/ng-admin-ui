export default class Login {

    static $inject = ['$state', 'authService', 'loggerService'];

    loading: boolean;
    submitted: boolean;
    loginData: any;
    year: any;

    constructor(private $state: any, private authService: app.AuthService, private loggerService: app.LoggerService) {
        this.year = (new Date()).getFullYear();
        this.initialize();
    }

    initialize() {
        this.loginData = {
            username: null,
            password: null
        };
    }

    submitForm(isValid) {
        this.submitted = true;
        if (isValid) {
            this.loading = true;
            this.authService.login(this.loginData)
                .then(response => this.loginSuceeded(response))
                .catch(error => this.loginError(error));
        }
        return false;
    }

    loginSuceeded(response) {
        this.$state.go('dashboard');
    }

    loginError(error) {
        console.log(error);
        this.loading = false;
        if (error !== null && error !== undefined && error.hasOwnProperty('error_description') && error.error_description !== '') {
            this.loggerService.error(error.error_description);
        } else {
            this.loggerService.error(error);
        }
    }
}