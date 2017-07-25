class sitesformController {

	constructor($rootScope) {
		let ctrl=this;
		ctrl.$rootScope = $rootScope;
		ctrl.$rootScope.changeHash();

	};
}

export default sitesformController;