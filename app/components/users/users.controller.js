class UsersController {
    constructor($rootScope, $interval, $location, UserService, FlashService) {
        let ctrl = this;
        ctrl.UserService = UserService;
        console.log(ctrl.UserService);
        ctrl.FlashService = FlashService;
        ctrl.$location = $location;
        console.log('hello world');
        // UsersController.$inject = ['UserService', '$rootScope', '$location', 'FlashService'];
    };
    register() {
        let ctrl = this;
        ctrl.dataLoading = true;
        console.log("hi");
      
        ctrl.UserService.Create(ctrl.user)
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