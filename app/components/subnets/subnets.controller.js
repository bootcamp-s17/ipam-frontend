class subnetsController {

	constructor($rootScope) {
		let ctrl=this;
		ctrl.$rootScope = $rootScope;
		ctrl.$rootScope.getSubnets();
		console.log(ctrl.$rootScope);
	};

}

export default subnetsController;