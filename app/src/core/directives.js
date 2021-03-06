angular
    .module('app.core')
    .directive('sideNavigation', sideNavigation)
    .directive('pageTitle', pageTitle)
    .directive("appLogout", appLogout);

function sideNavigation($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element) {
            // Call the metsiMenu plugin and plug it to sidebar navigation
            element.metisMenu();
        }
    };
}

function pageTitle($rootScope, $timeout) {
    return {
        link: function(scope, element) {
            var listener = function(event, toState, toParams, fromState, fromParams) {
                // Default title
                var title = '{ ng-admin-ui }';
                // Create your own title pattern
                if (toState.data && toState.data.pageTitle) title = '{ ng-admin-ui } | ' + toState.data.pageTitle;
                $timeout(function() {
                    element.text(title);
                });
            };
            $rootScope.$on('$stateChangeStart', listener);
        }
    };
}

function appLogout() {
    return {
        restrict: 'E',
        replace: true,
        template: '<a ng-click="vm.logout()"><i class="fa fa-sign-out fa-fw"></i>Log out</a>',
        controller: function(authService, $state) {
            var vm = this;
            vm.logout = function() {
                authService.logout();
                $state.go('home');
            };
        },
        controllerAs: 'vm'
    };
}