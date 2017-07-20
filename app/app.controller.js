


class appCtrl {

	constructor($rootScope, $http, ipamService) {

		let ctrl = this;

		ctrl.$rootScope = $rootScope;


/*----------------------------------------------------------
						SITES
----------------------------------------------------------*/

		// Setting a global function for getting ALL sites from API
		ctrl.$rootScope.getSites = () => {

			// grabs api data for all the sites with the ngresource query()
			ctrl.query = ipamService.getSites().query();

			// pushes data to sites object
			ctrl.query.$promise.then( (data) => {
				ctrl.$rootScope.sites = data;
			})	

		} // end getSites()

		ctrl.$rootScope.getSite = (id) => {
			ctrl.get = ipamService.getSites().get({site:id});

			ctrl.get.$promise.then( (data) => {
				ctrl.$rootScope.site = data;
			})

			alert(id);
		}

		// ctrl.$rootScope.$watch('site', function() {
		// 	console.log(ctrl.$rootScope.site);
		// })

		ctrl.newSite = {
		  "name": "Lexington",
		  "abbreviation": "LEX",
		  "address": "Douglas Adams Blvd",
		  "site_contact": "Douglas Adams"
		}
		// ipamService.addSite().save({}, ctrl.newSite);
		// ipamService.updateSite().update({site:1}, ctrl.newSite);




/* ------------------------------------------------------
						SUBNETS
----------------------------------------------------------*/

		// Setting a global function for getting sites from API
		ctrl.$rootScope.getSubnets = () => {
			// grabs api data for all the sites with the ngresource query()
			ctrl.query = ipamService.getSubnets().query();

			// pushes data to sites object, .then means we wait on the promise
			ctrl.query.$promise.then( (data) => {
				ctrl.$rootScope.subnets = data;
			})	

		} // end getSubnets()


	} // end constructor

} // end appCtrl

export default appCtrl;