class loginController {
	constructor($rootScope) {
		let ctrl=this;
		    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
		    function LoginController($location, AuthenticationService, FlashService) {
		 
		        ctrl.login = login;
		 
		        (function initController() {
		            // reset login status
		            AuthenticationService.ClearCredentials();
		        })();
		 
		        function login() {
		            ctrl.dataLoading = true;
		            AuthenticationService.Login(ctrl.email, ctrl.password, function (response) {
		                if (response.success) {
		                    AuthenticationService.SetCredentials(ctrl.email, ctrl.password);
		                    $location.path('/');
		                } else {
		                    FlashService.Error(response.message);
		                    ctrl.dataLoading = false;
		                }
		            });
		        };
		    }

	};
}

export default loginController;