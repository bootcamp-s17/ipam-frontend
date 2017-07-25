class subnetformController {

	constructor($rootScope) {
		let ctrl=this;
		ctrl.subshow = false;
		ctrl.$rootScope=$rootScope;
		
		ctrl.$rootScope.changeHash();

	ctrl.$rootScope.$watch('subshow',() => {
			ctrl.subshow = ctrl.$rootScope.subshow;
		})
	};
}

export default subnetformController;