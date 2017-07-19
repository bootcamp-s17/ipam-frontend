


class appCtrl {

	constructor($rootScope, $http, randomUserService) {
		let ctrl = this;
		ctrl.$rootScope = $rootScope;
		ctrl.$rootScope.getUsers = (randomUserService.getUsers().then(function(response){
			ctrl.$rootScope.users = response.data.results;
		}));

		ctrl.$rootScope.$watch('users', function() {
			console.log(ctrl.$rootScope.users);
		})
	}
}

export default appCtrl;