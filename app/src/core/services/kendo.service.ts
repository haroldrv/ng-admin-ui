export default class KendoService {
    constructor() { }
    public exportToExcel(gridName: string): void {
        let grid = $(gridName).data('kendoGrid');
        grid.saveAsExcel();
    }
}