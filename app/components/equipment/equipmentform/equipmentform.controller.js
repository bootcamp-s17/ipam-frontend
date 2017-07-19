class equipmentformController {

	constructor($rootScope) {
		let ctrl=this;
		ctrl.equipshow = false;
		ctrl.$rootScope = $rootScope;

		ctrl.$rootScope.$watch('equipshow',() => {
			ctrl.$rootScope.equipshow = ctrl.equipshow;
		});

	};




}

export default equipmentformController;