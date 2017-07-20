class UsersController {
    constructor($rootScope, $interval, $location, UserService) {
        let ctrl = this;
        ctrl.UserService = UserService;
        ctrl.$location = $location
        // UsersController.$inject = ['UserService', '$rootScope', '$location', 'FlashService'];
    };
    register() {
        let ctrl = this;
        ctrl.dataLoading = true;
        console.log("hi");
      
        UserService.Create(ctrl.user)
            .then(function (response) {
                if (response.success) {
                    ctrl.FlashService.Success('Registration successful', true);
                    ctrl.$location.path('.app/components/login/services/user.service.js');
                } else {
                    ctrl.FlashService.Error(response.message);
                    ctrl.dataLoading = false;
                }
            });
    };
}
export default UsersController;