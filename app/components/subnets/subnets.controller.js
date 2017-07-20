class subnetsController {

	constructor($rootScope) {
		let ctrl=this;

		ctrl.$rootScope = $rootScope;

		ctrl.$rootScope.getSubnets();
		// ctrl.$rootScope.$watch('sites', function() {
		// console.log(ctrl.$rootScope.sites);
		// })

	};
	subnet(){
		let ctrl=this; 
		console.log("hello from subnet");
		ctrl.$rootScope.subshow=true;
	}

}

export default subnetsController;