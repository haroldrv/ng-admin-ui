class Dashboard {
    navigationUrl: string;

    constructor() {
        this.navigationUrl = 'src/core/views/navigation.html';
    }
}

export default angular
    .module('app.dashboard', [])
    .controller('dashboard', Dashboard)
    .name;