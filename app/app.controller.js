


class appCtrl {

	constructor($rootScope, $http, ipamService) {

		let ctrl = this;

		ctrl.$rootScope = $rootScope;

		// grabs api data for sites
		ctrl.query = ipamService.getSites().query();

		// pushes data to sites object
		ctrl.query.$promise.then( (data) => {
			ctrl.$rootScope.sites = data;
		})

		ctrl.$rootScope.$watch('sites', function() {
			ctrl.$rootScope.sites;
		})
	}
}

export default appCtrl;