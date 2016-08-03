export default class AuthService {

    static $inject = ['$http', '$q', 'localStorageService', 'appConfig'];
    siroIn: any;
    authentication: any;

    constructor(
        private $http: any,
        private $q: ng.IQService,
        private localStorageService: any,
        private appConfig: any
    ) {
        this.siroIn = {
            username: '',
            password: '',
            success: false
        };

        this.authentication = {
            isAuthenticated: false,
            username: '',
            role: ''
        };
    }

    public login(loginData) {
        let data = 'grant_type=password&username=' + loginData.username + '&password=' + loginData.password;
        let deferred = this.$q.defer();

        this.$http.post(this.appConfig.getLoginUrl + '/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json' } })
            .success(response => {
                this.localStorageService.set('authData', {
                    token: response.access_token,
                    username: loginData.username,
                    role: response.role,
                    userId: response.userId,
                    sessionId: response.sessionId
                });

                this.authentication.isAuthenticated = true;
                this.authentication.username = loginData.username;

                deferred.resolve(response);
            })
            .error(function (error, status) {
                deferred.reject(error);
                this.logout();
            });

        return deferred.promise;
    }

    public logout() {
        let sessionId = this.getSessionId();
        this.$http
            .put(this.appConfig.getBaseUrl + '/sessions/' + sessionId + '/logout', null)
            .then(() => this.removeSessionDetails)
            .catch(error => this.displayError);
    }

    public removeSessionDetails() {
        this.localStorageService.remove('authData');
        this.authentication.isAuthenticated = false;
        this.authentication.username = '';
    }

    public displayError(error) {
        console.log(error);
    }

    public getSessionId() {
        let authData = this.localStorageService.get('authData');
        if (authData === null || authData === undefined || authData.sessionId === null) {
            return 0;
        }
        return authData.sessionId;
    }
}