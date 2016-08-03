import * as angular from 'angular';
import AuthService from './services/auth.service';

class LogoutController {
    constructor(private authService: AuthService, private $state: any) {}

    public logout(): void {
        this.authService.logout();
        this.$state.go('home');
    }
}

export default class LogoutComponent implements angular.IComponentOptions {

    public controller: any;
    public controllerAs: string;
    public template: string;

    constructor() {
        this.controller = LogoutController;
        this.controllerAs = 'vm';
        this.template = '<a ng-click="vm.logout()"><i class="fa fa-sign-out fa-fw"></i>Log out</a>';
    }
}