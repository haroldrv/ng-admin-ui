(function () {
    angular
        .module('app', [
            'app.core',
            'app.login',
            'app.dashboard',
            'app.resources',
            'ui.router',
            'angular-loading-bar',
            'LocalStorageModule',
            'cgNotify',
            'kendo.directives',])
        .config(configState)
        .run(function ($rootScope, $state) {
            $rootScope.$state = $state;
        });;

    function configState($stateProvider, $urlRouterProvider, $compileProvider, $httpProvider, $sceDelegateProvider, $provide) {

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
})();