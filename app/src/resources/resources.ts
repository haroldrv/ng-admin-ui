namespace app {
    'use strict';

    class Resources {
        navigationUrl: string;
        constructor(){
            this.navigationUrl = 'src/core/views/navigation.html';
        }
    }

    angular
        .module('app.resources', [])
        .controller('resources', Resources);
}