(function () {
    'use strict';

    angular
        .module('app.resources', [])
        .controller('resources', resources);

    resources.$inject = [];

    function resources() {
        /* jshint validthis:true */
        var vm = this;
        vm.navigationUrl = 'src/core/views/navigation.html';
    }
})();