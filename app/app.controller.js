


class appCtrl {

	constructor($rootScope, $http, ipamService) {
		let ctrl = this;
		ctrl.$rootScope = $rootScope;
		ctrl.query = ipamService.getSites().query();
		ctrl.query.$promise.then( (data) => {
			ctrl.$rootScope.sites = data;
		console.log(ctrl.$rootScope.sites.length);

		})
		// ctrl.$rootScope.getUsers = (randomUserService.getUsers().then(function(response){
		// 	ctrl.$rootScope.users = response.data.results;
		// }));

		// ctrl.$rootScope.$watch('users', function() {
		// 	console.log(ctrl.$rootScope.users);
		// })
	}
}

export default appCtrl;