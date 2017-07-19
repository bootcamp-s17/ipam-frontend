class equipmentformController {

	constructor($rootScope) {
		let ctrl=this;
		ctrl.equipshow = false;
		ctrl.$rootScope = $rootScope;

		ctrl.$rootScope.$watch('equipshow',() => {
			ctrl.equipshow = ctrl.$rootScope.equipshow;
		});

	};




}

export default equipmentformController;