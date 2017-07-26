class subnetsController {

	constructor($rootScope) {
		let ctrl=this;

		// allows global variables to be defined. 
		ctrl.$rootScope = $rootScope;

		// calling the function to get the equipment from the api endpoint
		// the getEquipments function is defined in app.services.js
		ctrl.$rootScope.getSubnets();

		// declaring a local variable to change the sorting method
		ctrl.sortReverse = false;
	};

}

export default subnetsController;