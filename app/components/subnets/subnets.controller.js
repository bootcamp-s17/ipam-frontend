class subnetsController {

	constructor($rootScope) {
		let ctrl=this;
		ctrl.$rootScope = $rootScope;
		ctrl.$rootScope.getSubnets();
		ctrl.sortReverse = false;
	};

}

export default subnetsController;