


class sitesController {

	constructor($rootScope, $http) {
		let ctrl = this;
        ctrl.$rootScope = $rootScope;
        ctrl.$rootScope.getSites();

        ctrl.$rootScope.csite = "";

	};

	currentsite() {
		ctrl.$rootScope.csite = csite;
		
	}
}

export default sitesController;