namespace app {

    export class KendoService {
        constructor(){}
        public exportToExcel(gridName: string): void {
            let grid = $(gridName).data('kendoGrid');
            grid.saveAsExcel();
        }
    }

    angular
        .module('app.core')
        .service('kendoService', KendoService);
}