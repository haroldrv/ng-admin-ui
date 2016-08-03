import VehicleListController from './vehicle/vehicle-list.controller';

class Resources {
    navigationUrl: string;
    constructor() {
        this.navigationUrl = 'src/core/views/navigation.html';
    }
}

export default angular
    .module('app.resources', [])
    .controller('resources', Resources)
    .controller('vehicleListController', VehicleListController)
    .name;
