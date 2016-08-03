import KendoService from './../../core/services/kendo.service';

export default class VehicleListController {

    static $inject = ['$state', 'appConfig', 'kendoService', 'localStorageService'];
    gridName: string;
    buttonColour: string;
    plantsGridOptions: any;

    constructor(
        private $state: any,
        private appConfig: any,
        private kendoService: KendoService,
        private localStorageService: any
    ) {
        this.gridName = '#plantsGrid';
        this.buttonColour = appConfig.buttonColour;

        this.initialize();
    }

    initialize() {
        this.getVehicles();
    }

    exportToExcel() {
        this.kendoService.exportToExcel(this.gridName);
    }

    getVehicles() {
        let now = new Date();

        let url = '/kendoPlants';
        let plantColumns = [
            { field: 'id', title: 'Id', width: '8%', template: '#=id#' },
            { field: 'type', title: 'Type', width: '10%', template: '#=type#' },
            { field: 'regNo', title: 'Rego', width: '7%', template: '#=regNo#' },
            { field: 'description', title: 'Description', template: '#=description#' },
            { field: 'curKM', title: 'Current KM', width: '10%', template: '#=curKM#' },
            { field: 'nextServiceAt', title: 'Next Service', width: '10%', template: '#=nextServiceAt#' },
            { field: 'regoDueDate', title: 'Rego due date', width: '10%', template: '#= kendo.toString(kendo.parseDate(regoDueDate), "' + this.appConfig.shortDateFormat + '")#' },
            { field: 'regoDueIn', title: 'Due in', width: '7%', template: '#: regoDueIn #' }
        ];

        let commonSettings = {
            excel: {
                fileName: 'vehicles_' + now.toLocaleDateString(),
                filterable: true,
                allPages: true
            },
            dataSource: {
                pageSize: this.appConfig.pageSize,
                serverOperation: true,
                serverPaging: true,
                serverSorting: true,
                serverFiltering: true,
                transport: {
                    read: {
                        url: this.appConfig.getBaseUrl + url,
                        contentType: 'application/json',
                        beforeSend: (req) => {
                            this.getRequestHeader(req);
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
                let columns = e.sender.columns;
                let columnIndex = this.wrapper.find(".k-grid-header [data-field=" + "nextServiceAt" + "]").index();
                let dueInIndex = this.wrapper.find(".k-grid-header [data-field=" + "regoDueIn" + "]").index();

                // iterate the table rows and apply custom row and cell styling
                let rows = e.sender.tbody.children();
                for (let j = 0; j < rows.length; j++) {
                    let row = $(rows[j]);
                    let dataItem = e.sender.dataItem(row);
                    let currentKm = dataItem.get("curKM");
                    let nextServiceAt = dataItem.get("nextServiceAt");
                    let regoDueIn = dataItem.get('regoDueIn');

                    if (regoDueIn < 30) {
                        let dueInCell = row.children().eq(dueInIndex);
                        dueInCell.addClass('next-service-due');
                    }
                    if (currentKm > (nextServiceAt - 1000)) {
                        let cell = row.children().eq(columnIndex);
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
        this.plantsGridOptions = commonSettings;
    }

    daysBetween(startDate, endDate) {
        Math.floor((Date.parse(endDate) - Date.parse(startDate)) / 86400000);
    }

    getRequestHeader(req) {
        let authData = this.localStorageService.get('authData');
        if (authData) {
            req.setRequestHeader('Authorization', 'Bearer ' + authData.token);
        }

        return req;
    }
}