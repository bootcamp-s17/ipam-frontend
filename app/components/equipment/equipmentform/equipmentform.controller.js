class equipmentformController {

	constructor($rootScope) {
		let ctrl=this;
		ctrl.equipshow = false;
		ctrl.$rootScope = $rootScope;
		ctrl.ip = /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/;
		


		ctrl.$rootScope.$watch('equipshow',() => {
			 ctrl.equipshow = ctrl.$rootScope.equipshow ;
		});

	};

	




}

export default equipmentformController;