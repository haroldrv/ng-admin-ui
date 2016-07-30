(function () {
    'use strict';

    angular
        .module('app.resources')
        .controller('vehicleListController', vehicleListController);
    
    vehicleListController.$inject = ['$state', 'appConfig', 'kendoService', 'localStorageService'];

    function vehicleListController($state, appConfig, kendoService, localStorageService) {
        /* jshint validthis:true */
        var vm = this;
        var gridName = '#plantsGrid';
        vm.buttonColour = appConfig.buttonColour;
        vm.exportToExcel = kendoService.exportToExcel;

        initialize();

        function initialize() {
            getVehicles();
        }
        
        function getVehicles() {
            var now = new Date();

            var url = '/kendoPlants';
            var plantColumns = [
                { field: 'id', title: 'Id', width: '8%', template: '#=id#' },
                { field: 'type', title: 'Type', width: '10%', template: '#=type#' },
                { field: 'regNo', title: 'Rego', width: '7%', template: '#=regNo#' },
                { field: 'description', title: 'Description', template: '#=description#' },
                { field: 'curKM', title: 'Current KM', width: '10%', template: '#=curKM#' },
                { field: 'nextServiceAt', title: 'Next Service', width: '10%', template: '#=nextServiceAt#' },
                { field: 'regoDueDate', title: 'Rego due date', width: '10%', template: '#= kendo.toString(kendo.parseDate(regoDueDate), "' + appConfig.shortDateFormat + '")#' },
                { field: 'regoDueIn', title: 'Due in', width: '7%', template: '#: regoDueIn #' }
            ];

            var commonSettings = {
                excel: {
                    fileName: 'vehicles_' + now.toLocaleDateString(),
                    filterable: true,
                    allPages: true   
                },
                dataSource: {
                    pageSize: appConfig.pageSize,
                    serverOperation: true,
                    serverPaging: true,
                    serverSorting: true,
                    serverFiltering: true,
                    transport: {
                        read: {
                            url: appConfig.getBaseUrl() + url,
                            contentType: 'application/json',
                            beforeSend: function (req) {
                                getRequestHeader(req);
                            }
                        },
                        parameterMap: function (data, operation) {
                            return JSON.stringify(data);
                        }
                    },
                    schema: {
                        "data": "data",
                        "total": "total",
                    },
                    sort: {
                        field: 'Id',
                        dir: "desc"
                    },
                },
                dataBound: function (e) {
                    var columns = e.sender.columns;
                    var columnIndex = this.wrapper.find(".k-grid-header [data-field=" + "nextServiceAt" + "]").index();
                    var dueInIndex = this.wrapper.find(".k-grid-header [data-field=" + "regoDueIn" + "]").index();

                    // iterate the table rows and apply custom row and cell styling
                    var rows = e.sender.tbody.children();
                    for (var j = 0; j < rows.length; j++) {
                        var row = $(rows[j]);
                        var dataItem = e.sender.dataItem(row);
                        var currentKm = dataItem.get("curKM");
                        var nextServiceAt = dataItem.get("nextServiceAt");
                        var regoDueIn = dataItem.get('regoDueIn');

                        if (regoDueIn < 30) {
                            var dueInCell = row.children().eq(dueInIndex);
                            dueInCell.addClass('next-service-due');
                        }
                        if (currentKm > (nextServiceAt - 1000)) {
                            var cell = row.children().eq(columnIndex);
                            cell.addClass('next-service-due');
                        }
                    }
                },
                autoBind: true,
                sortable: true,
                pageable: {
                    refresh: true,
                    pageSizes: true,
                    buttonCount: 5
                },
                resizable: true,
                filterable: {
                    extra: false,
                },
                columns: plantColumns
            };
            vm.plantsGridOptions = commonSettings;
        }

        function daysBetween(startDate, endDate) {
            Math.floor((Date.parse(endDate) - Date.parse(startDate)) / 86400000);
        }

        function getRequestHeader(req) {
            var authData = localStorageService.get('authData');
            if (authData) {
                req.setRequestHeader('Authorization', 'Bearer ' + authData.token);
            }

            return req;
        }
    }
})();