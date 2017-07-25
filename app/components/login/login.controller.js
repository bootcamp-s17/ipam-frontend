class loginController {
    constructor($rootScope, $auth, $http) {
        let ctrl=this;
        ctrl.$rootScope = $rootScope;

        ctrl.login = function() {

            var credentials = {
                grant_type: 'password',
                client_id: 1,
                client_secret: 'sdAg9SX5KsdKzxngrpFbnvgk5v4iki8MevI14kvj',
                username: ctrl.email,
                password: ctrl.password
            }

            // Use Satellizer's $auth service to login
            $auth.login(credentials).then(function(data) {
                ctrl.$rootScope.token = data.data.access_token;
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + ctrl.$rootScope.token;
                $http.defaults.headers.common['Accept'] = 'application/json';

                console.log($http.defaults.headers.common);
                // If login is successful, redirect to the users state
                window.location.href = "#!/home";
            })
        }

    };
}

export default loginController;