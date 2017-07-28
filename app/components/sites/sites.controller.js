


class sitesController {

	constructor($rootScope, $http) {
		let ctrl = this;
        ctrl.$rootScope = $rootScope;
        ctrl.$rootScope.getSites();

        ctrl.$rootScope.csite = -1;

	};

	
}

export default sitesController;