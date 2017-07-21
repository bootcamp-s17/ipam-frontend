import appComponent from './app.component';
import equipmentComponent from './components/equipment/equipment.component';
import sitesComponent from './components/sites/sites.component';
import subnetsComponent from './components/subnets/subnets.component';
import usersComponent from './components/users/users.component';
import loginComponent from './components/login/login.component';
import tabboardComponent from './components/tabboard/tabboard.component';
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
.component('tabboard', tabboardComponent)
.component('nav', navComponent)
.factory('ipamService', ipamService)
.component('equipmentform', equipmentformComponent)
.component('subnetform', subnetformComponent)
.config(config)
.run(run);

config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/components/login/login.html',
            })

            .when('/login', {
                templateUrl: 'app/components/login/login.html',
            })

            .when('/users', {
                templateUrl: 'app/components/users/users.html',
            })

            .when('/home', {
                controller: tabboardComponent.controller,
                templateUrl: 'app/components/tabboard/tabboard.html',
                controllerAs: 'ctrl'

            })

            .when('/equipment', {

                templateUrl: 'app/components/equipment/equipment.html',
            })

            .when('/equipmentform', {
                //controller: 'equipmentController',
                templateUrl: 'app/components/equipment/equipmentform/equipmentform.html'
            })

            .when('/subnetform', {
                //controller: 'equipmentController',
                templateUrl: 'app/components/subnets/subnetform/subnetform.html'
            })
            .when('/subnets', {
                //controller: 'equipmentController',
                templateUrl: 'app/components/subnets/subnets/subnets.html'
            })



            .otherwise({ redirectTo: '/login' });
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


