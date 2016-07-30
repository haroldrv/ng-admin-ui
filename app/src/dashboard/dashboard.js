(function () {
    'use strict';

    angular
        .module('app.dashboard', [])
        .controller('dashboard', dashboard);

    dashboard.$inject = []; 

    function dashboard() {
        /* jshint validthis:true */
        var vm = this;
        vm.navigationUrl = 'src/core/views/navigation.html';
    }
})();