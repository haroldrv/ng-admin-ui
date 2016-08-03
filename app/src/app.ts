import * as angular from 'angular';
import * as router from 'angular-ui-router';
import 'angular-ui-router';
import 'local-storage';
import 'notify';
import 'kendo';
import appCore from './core/app.core';
import appLogin from './login/app.login';
import appDashboard from './dashboard/dashboard';
import appResources from './resources/resources';

var app = angular
    .module('app', [
        'ui.router',
        appCore,
        appLogin,
        appDashboard,
        appResources,
        //'angular-loading-bar',
        'LocalStorageModule',
        'cgNotify',
       'kendo.directives'
    ])
    .config(configState)
    .run(function ($rootScope, $state) {
        $rootScope.$state = $state;
    });

function configState(
    $stateProvider: router.IStateProvider,
    $urlRouterProvider: router.IUrlRouterProvider,
    $compileProvider: angular.ICompileProvider,
    $httpProvider: angular.IHttpProvider,
    $sceDelegateProvider: angular.ISCEDelegateProvider) {

    // Optimize load start with remove binding information inside the DOM element
    $compileProvider.debugInfoEnabled(true);

    // Set default state
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'src/login/login.html',
            controller: 'login',
            controllerAs: 'vm',
            data: {
                pageTitle: 'Landing page',
                specialClass: 'landing-page'
            }
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'src/dashboard/dashboard.html',
            controller: 'dashboard',
            controllerAs: 'vm',
            data: {
                pageTitle: 'Dashboard'
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'src/login/login.html',
            controller: 'login',
            controllerAs: 'vm'
        })
        .state('resources', {
            abstract: true,
            url: '/resources',
            templateUrl: 'src/resources/resources.html',
            controller: 'resources',
            controllerAs: 'vm',
            data: {
                pageTitle: 'Resources'
            }
        })
        .state('resources.vehicles', {
            url: '/vehicles',
            templateUrl: 'src/resources/vehicle/vehicle-list.html',
            controller: 'vehicleListController',
            controllerAs: 'vm',
            data: {
                pageTitle: 'Vehicles'
            }
        })
        .state('resources.plants.detail', {
            url: '/{id}',
            templateUrl: 'src/resources/plants/plant-details.html',
            controller: 'plantDetailsController',
            controllerAs: 'vm',
            data: {
                pageTitle: 'Vehicle details'
            }
        });
    $httpProvider.interceptors.push('authInterceptorService');
}

export default app;