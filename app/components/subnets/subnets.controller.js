class subnetsController {

	constructor($rootScope) {
		let ctrl=this;
		ctrl.$rootScope = $rootScope;

		ctrl.$rootScope.getSubnets();
		// ctrl.$rootScope.$watch('sites', function() {
		// console.log(ctrl.$rootScope.sites);
		// })
	};
}

export default subnetsController;