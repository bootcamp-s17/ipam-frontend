class equipmentformController {

	constructor($rootScope) {
		let ctrl=this;
		console.log('this is the equipmentformController');
		ctrl.equipshow = false;
		ctrl.$rootScope = $rootScope;
		ctrl.$rootScope.getSites();
		ctrl.$rootScope.getSubnets();
		


		ctrl.$rootScope.$watch('equipshow',() => {
			 ctrl.equipshow = ctrl.$rootScope.equipshow ;
		});

	};

	




}

export default equipmentformController;