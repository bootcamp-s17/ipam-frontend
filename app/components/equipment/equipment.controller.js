class equipmentController {

	constructor($rootScope) {
		let ctrl=this;

		// allows global variables to be defined. 
		ctrl.$rootScope = $rootScope;

		// calling the function to get the equipment from the api endpoint
		// the getEquipments function is defined in app.services.js
		ctrl.$rootScope.getEquipments();
		ctrl.$rootScope.getSubnets();

		ctrl.$rootScope.hiddenSubnets = [];

		ctrl.$rootScope.hiddenEquipments = [];


		// declaring a local variable to change the sorting method
		ctrl.sortReverse = false;

		ctrl.$rootScope.firstTime = true;

	};
}

export default equipmentController;