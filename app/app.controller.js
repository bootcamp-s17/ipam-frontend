


class appCtrl {

	constructor($rootScope, $http, sitesService) {
		let ctrl = this;
		ctrl.sites = sitesService.get();
		console.log('sites console log');
		console.log(ctrl.sites);
		ctrl.$rootScope = $rootScope;
		// ctrl.$rootScope.getUsers = (randomUserService.getUsers().then(function(response){
		// 	ctrl.$rootScope.users = response.data.results;
		// }));

		// ctrl.$rootScope.$watch('users', function() {
		// 	console.log(ctrl.$rootScope.users);
		// })
	}
}

export default appCtrl;