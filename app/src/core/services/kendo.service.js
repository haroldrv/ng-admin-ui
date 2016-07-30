(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('kendoService', kendoService);

    function kendoService() {

        var service = {
            exportToExcel: exportToExcel,
        };

        return service;
        
        function exportToExcel(gridName){
            var grid = $(gridName).data('kendoGrid');
            grid.saveAsExcel();
        }
    }
})();