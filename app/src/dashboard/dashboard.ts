namespace app {
    'use strict';

    class Dashboard {
        navigationUrl: string;

        constructor() {
            this.navigationUrl = 'src/core/views/navigation.html';
        }
    }

    angular
        .module('app.dashboard', [])
        .controller('dashboard', Dashboard);
}