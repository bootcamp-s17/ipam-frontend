import appComponent from './app.component';
import equipmentComponent from './components/equipment/equipment.component';
import sitesComponent from './components/sites/sites.component';
import subnetsComponent from './components/subnets/subnets.component';
import usersComponent from './components/users/users.component';
import loginComponent from './components/login/login.component';
import sidebarComponent from './components/sidebar/sidebar.component';
import navComponent from './components/nav/nav.component';
import ipamService from './app.services.js';
import equipmentformComponent from './components/equipment/equipmentform/equipmentform.component';
import subnetformComponent from './components/subnets/subnetform/subnetform.component';

angular.module('app', ['ngRoute','ngCookies', 'ngResource'])
.component('app', appComponent)
.component('equipment', equipmentComponent)
.component('sites', sitesComponent)
.component('subnets', subnetsComponent)
.component('users', usersComponent)
.component('login', loginComponent)
.component('nav', navComponent)
.factory('ipamService', ipamService)
.component('equipmentform', equipmentformComponent)
.component('subnetform', subnetformComponent)
.component('sidebar', sidebarComponent)
.config(config)
.run(run);

config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'app/components/login/login.html',
            })

            .when('/equipmentform', {
                controller: equipmentformComponent.controller,
                templateUrl: 'app/components/equipment/equipmentform/equipmentform.html'
            })

            .when('/subnetform', {
                templateUrl: 'app/components/subnets/subnetform/subnetform.html'
            })

            .when('/sitesform', {
                templateUrl: 'app/components/sites/sitesform/sitesform.html'
            })


            .when('/editsite', {
                templateUrl: 'app/components/sites/editsite/editsite.html'
            })

            .when('/viewsite', {
                templateUrl: 'app/components/sites/viewsite/viewsite.html'
            })

            .when('/sites', {
                controller: sitesComponent.controller,
                templateUrl: 'app/components/sites/sites.html',
                controllerAs: '$ctrl'

            })

            .when('/editsubnet',{
                templateUrl: 'app/components/subnets/editsubnet/editsubnet.html'
            })

            .when('/viewsubnet',{
                templateUrl: 'app/components/subnets/viewsubnet/viewsubnet.html'
            })

            .when('/subnets', {
                controller: subnetsComponent.controller,
                templateUrl: 'app/components/subnets/subnets.html',
                controllerAs: '$ctrl'

            })

            .when('/viewequipment', {
                templateUrl: 'app/components/equipment/viewequipment/viewequipment.html'
            })

            .when('/editequipment', {
                templateUrl: 'app/components/equipment/editequipment/editequipment.html'
            })

            .when('/equipment', {
                controller: equipmentComponent.controller,
                templateUrl: 'app/components/equipment/equipment.html',
                controllerAs: '$ctrl'

            })

            .when('/home', {
                controller: sitesComponent.controller,
                templateUrl: 'app/components/sites/sites.html',
                controllerAs: '$ctrl'

            })

            .otherwise({ redirectTo: '/sites' });
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
        //keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['./components/login/login.html', '.components/users/users.html', '.components/equipment/equipmentform/equipmentform.html']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            //if (restrictedPage && !loggedIn) {
                //$location.path('/login');
            //}
        });
    }


