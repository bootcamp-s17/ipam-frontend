class UsersController {

	constructor($rootScope) {
		let ctrl=this;

        ctrl.users;
        ctrl.error;

        ctrl.getUsers = function() {

            // This request will hit the index method in the AuthenticateController
            // on the Laravel side and will return the list of users
            $http.get('http://localhost:7000/oauth/clients').success(function(users) {
                ctrl.users = users;
            }).error(function(error) {
                ctrl.error = error;
            });
        }
    }

}

export default UsersController;