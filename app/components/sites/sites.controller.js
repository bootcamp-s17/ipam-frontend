class sitesController {

	constructor($rootScope, $http) {
		let ctrl = this;
        ctrl.$http = $http;

		// $http request for sites endpoint

	};

	addNewSite() {
		alert('You want to add a new site!');
	}
}

export default sitesController;