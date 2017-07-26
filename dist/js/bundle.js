(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _app = require('./app.html');

var _app2 = _interopRequireDefault(_app);

var _app3 = require('./app.controller');

var _app4 = _interopRequireDefault(_app3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app4.default.$inject = ['$rootScope', '$http', '$location', 'ipamService'];

var appComponent = {
	template: _app2.default,
	controller: _app4.default
};

exports.default = appComponent;

},{"./app.controller":2,"./app.html":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var appCtrl = function appCtrl($rootScope, $http, $location, ipamService) {
	_classCallCheck(this, appCtrl);

	var ctrl = this;
	ctrl.$rootScope = $rootScope;

	/*----------------------------------------------------------
 						SITES
 ----------------------------------------------------------*/

	// Setting a global function for getting ALL sites from API
	ctrl.$rootScope.getSites = function () {

		// grabs api data for all the sites with the ngresource query()
		ctrl.query = ipamService.getSites().query();

		// pushes data to sites object
		ctrl.query.$promise.then(function (data) {
			ctrl.$rootScope.sites = data;
		});
	}; // end getSites()

	ctrl.$rootScope.getSite = function (id) {
		ctrl.get = ipamService.getSites().get({ site: id });

		ctrl.get.$promise.then(function (data) {
			ctrl.$rootScope.site = data;
			console.log(ctrl.$rootScope.site);
		});
	}; // end getSite

	// add a site from form
	ctrl.$rootScope.addSite = function () {

		// instantiate new site JSON
		ctrl.newSite = {
			// grab values with JQuery from form
			"name": $('#siteName').val(),
			"abbreviation": $('#siteAbbreviation').val(),
			"address": $('#siteAddress').val(),
			"site_contact": $('#siteContact').val()

			// specific call to save from $resource
		};ipamService.addSite().save({}, ctrl.newSite).$promise
		// says wait for the data and push it to the array
		.then(function (data) {
			ctrl.$rootScope.sites.push(data);
		});
	}; //end addSite

	ctrl.$rootScope.updateSite = function (id) {

		// instantiate new site JSON
		ctrl.saveSite = {
			// grab values with JQuery from form
			"id": id,
			"name": $('#editSiteName').val(),
			"abbreviation": $('#editSiteAbbreviation').val(),
			"address": $('#editSiteAddress').val(),
			"site_contact": $('#editSiteContact').val()

			// ctrl.saveSite = {
			// 	// grab values with JQuery from form
			//   "id": id,
			//   "name": 'test2',
			//   "address": '300 Rose',
			//   "abbreviation": 'tst',
			//   "site_contact": 'david',
			// }
		};console.log(ctrl.saveSite);
		// specific call to save from $resource
		ipamService.updateSite().update({ site: id }, ctrl.saveSite).$promise
		// says wait for the data and push it to the array
		.then(function (data) {
			//pull the sites from db for fresh info with updated site
			ctrl.$rootScope.getSites();
			// console.log(data);
		});
	}; //end updateSite

	// ctrl.$rootScope.updateSite(1);

	/* ------------------------------------------------------
 						SUBNETS
 ----------------------------------------------------------*/

	// Setting a global function for getting sites from API
	ctrl.$rootScope.getSubnets = function () {
		// grabs api data for all the sites with the ngresource query()
		ctrl.query = ipamService.getSubnets().query();

		// pushes data to sites object, .then means we wait on the promise
		ctrl.query.$promise.then(function (data) {
			ctrl.$rootScope.subnets = data;
		});
	};
	ctrl.$rootScope.addSubnet = function () {
		// instantiate new subnet JSON
		ctrl.newSubnet = {
			// grab values with JQuery from form
			"site_id": $('#siteSelect').val(),
			"name": $('#subnetName').val(),
			"subnet_address": $('#subnetIpAddress').val(),
			"mask_bits": $('#subnetMaskBits').val(),
			"vLan": $('#vlanNumber').val()

			// specific call to save from $resource
		};ipamService.addSubnet().save({}, ctrl.newSubnet).$promise
		// says wait for the data and push it to the array
		.then(function (data) {
			ctrl.$rootScope.subnets.push(data);
		});
	}; // end getSubnets()
	/* ------------------------------------------------------
 						IP Adsress
 ----------------------------------------------------------*/
	// Setting a global function for getting sites from API
	ctrl.$rootScope.getIpBySubnet = function (id) {
		// grabs api data for all the sites with the ngresource query()
		ctrl.query = ipamService.getIpBySubnet().query();

		// pushes data to sites object, .then means we wait on the promise
		ctrl.query.$promise.then(function (data) {
			ctrl.$rootScope.usedIps = data;
		});
	}; // end getIpBySubnet()

	// Setting a global function for getting sites from API
	ctrl.$rootScope.getNextIp = function (id) {
		// grabs api data for all the sites with the ngresource query()
		ctrl.query = ipamService.getNextIp().query();

		// pushes data to sites object, .then means we wait on the promise
		ctrl.get.$promise.then(function (data) {
			ctrl.$rootScope.NextIp = data;
		});
	}; // end getNextUp()


	/* ------------------------------------------------------
 						EQUIPMENT
 ----------------------------------------------------------*/
	// Setting a global function for getting equipments from API
	ctrl.$rootScope.getEquipments = function () {
		// grabs api data for all the sites with the ngresource query()
		ctrl.query = ipamService.getEquipments().query();

		// pushes data to sites object, .then means we wait on the promise
		ctrl.query.$promise.then(function (data) {
			ctrl.$rootScope.equipments = data;
		});
	};

	ctrl.$rootScope.addEquipment = function () {
		// instantiate new equipment JSON
		ctrl.newEquipment = {
			// grab values with JQuery from form
			"site_id": $('#siteSelect').val(),
			"subnet_id": $('#subnetSelect').val(),
			"equipment_type_id": $('#typeId').val(),
			"name": $('#equipmentName').val(),
			"host_name": $('#hostName').val(),
			"room_id": $('#room_id').val(),
			"serial_number": $('#serialNumber').val(),
			"mac_address": $('#macAddress').val(),
			"ip_address": $('#equipaddress').val(),
			"mab": $('#mabBoxYes').val(),
			"switch_name": $('#switchName').val(),
			"switch_ip": $('#switchManagementIp').val(),
			"switch_room_number": $('#switchRoomNumber').val(),
			"printer_server": $('#printerServer').val(),
			"driver": $('#driverInput').val(),
			"printer_name": $('#printerName').val(),
			"share_name": $('#shareName').val(),
			"share_comment": $('#shareComment').val(),
			"model": $('#modelType').val(),
			"operating_system": $('#operatingSystem').val(),
			"computer_type": $('#computerType').val()
			// specific call to save from $resource
		};ipamService.addEquipment().save({}, ctrl.newEquipment).$promise
		// says wait for the data and push it to the array
		.then(function (data) {
			ctrl.$rootScope.equipments.push(data);
		});
	}; //end quipments

} // end constructor
; // end appCtrl


exports.default = appCtrl;

},{}],3:[function(require,module,exports){
module.exports = "\n\n<nav></nav>\n<ng-view></ng-view> \n\n\n";

},{}],4:[function(require,module,exports){
'use strict';

var _app = require('./app.component');

var _app2 = _interopRequireDefault(_app);

var _equipment = require('./components/equipment/equipment.component');

var _equipment2 = _interopRequireDefault(_equipment);

var _sites = require('./components/sites/sites.component');

var _sites2 = _interopRequireDefault(_sites);

var _subnets = require('./components/subnets/subnets.component');

var _subnets2 = _interopRequireDefault(_subnets);

var _users = require('./components/users/users.component');

var _users2 = _interopRequireDefault(_users);

var _login = require('./components/login/login.component');

var _login2 = _interopRequireDefault(_login);

var _sidebar = require('./components/sidebar/sidebar.component');

var _sidebar2 = _interopRequireDefault(_sidebar);

var _nav = require('./components/nav/nav.component');

var _nav2 = _interopRequireDefault(_nav);

var _appServices = require('./app.services.js');

var _appServices2 = _interopRequireDefault(_appServices);

var _equipmentform = require('./components/equipment/equipmentform/equipmentform.component');

var _equipmentform2 = _interopRequireDefault(_equipmentform);

var _subnetform = require('./components/subnets/subnetform/subnetform.component');

var _subnetform2 = _interopRequireDefault(_subnetform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

angular.module('app', ['ngRoute', 'ngCookies', 'ngResource']).component('app', _app2.default).component('equipment', _equipment2.default).component('sites', _sites2.default).component('subnets', _subnets2.default).component('users', _users2.default).component('login', _login2.default).component('nav', _nav2.default).factory('ipamService', _appServices2.default).component('equipmentform', _equipmentform2.default).component('subnetform', _subnetform2.default).component('sidebar', _sidebar2.default).config(config).run(run);

config.$inject = ['$routeProvider', '$locationProvider'];
function config($routeProvider, $locationProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'app/components/login/login.html'
    }).when('/equipmentform', {
        controller: _equipmentform2.default.controller,
        templateUrl: 'app/components/equipment/equipmentform/equipmentform.html'
    }).when('/subnetform', {
        templateUrl: 'app/components/subnets/subnetform/subnetform.html'
    }).when('/sitesform', {
        templateUrl: 'app/components/sites/sitesform/sitesform.html'
    }).when('/editsite', {
        templateUrl: 'app/components/sites/editsite/editsite.html'
    }).when('/home', {
        controller: tabboardComponent.controller,
        templateUrl: 'app/components/tabboard/tabboard.html',
        controllerAs: '$ctrl'

    }).otherwise({ redirectTo: '/home' });
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

},{"./app.component":1,"./app.services.js":5,"./components/equipment/equipment.component":6,"./components/equipment/equipmentform/equipmentform.component":9,"./components/login/login.component":12,"./components/nav/nav.component":15,"./components/sidebar/sidebar.component":18,"./components/sites/sites.component":21,"./components/subnets/subnetform/subnetform.component":24,"./components/subnets/subnets.component":27,"./components/users/users.component":30}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});


function ipamService($resource) {
	// All of the site api functions
	var getSites = function getSites() {
		return $resource('http://localhost:7000/api/sites/:site', { site: "@site" });
	};
	var addSite = function addSite() {
		return $resource('http://localhost:7000/api/sites');
	};
	var updateSite = function updateSite() {
		return $resource('http://localhost:7000/api/sites/:site', { site: "@site" }, {
			'update': { method: 'PUT' }
		});
	};
	// console.log(updateSite().update());
	// console.log(updateSite().update());
	// All of the Subnet api functions
	var getSubnets = function getSubnets() {
		return $resource('http://localhost:7000/api/subnets/:subnet', { subnet: "@subnet" });
	};
	var addSubnet = function addSubnet() {
		return $resource('http://localhost:7000/api/subnets');
	};
	var updateSubnet = function updateSubnet() {
		return $resource('http://localhost:7000/api/subnets/:subnet', { subnet: "@subnet" }, { 'update': { metod: 'PUT' }
		});
	};
	// All of the ip endpoint api functions
	var getIpBySubnet = function getIpBySubnet() {
		return $resource('http://localhost:7000/api/ip/:subnet', { subnet: "@subnet" });
	};
	var getNextIp = function getNextIp() {
		return $resource('http://localhost:7000/api/ip/:subnet/next', { subnet: "@subnet" });
	};
	// all of the equipment api functions
	var getEquipments = function getEquipments() {
		return $resource('http://localhost:7000/api/equipment/:equipment', { equipment: "@equipment" });
	};
	var addEquipment = function addEquipment() {
		return $resource('http://localhost:7000/api/equipment');
	};
	var updateEquipment = function updateEquipment() {
		return $resource('http://localhost:7000/api/equipment/:equipment', { equipment: "@equipment" }, { 'update': { method: 'PUT' }
		});
	};

	return {
		// SITES
		getSites: getSites,
		addSite: addSite,
		updateSite: updateSite,
		// SUBNETS
		getSubnets: getSubnets,
		addSubnet: addSubnet,
		updateSubnet: updateSubnet,
		// IP ENDPOINTS
		getIpBySubnet: getIpBySubnet,
		getNextIp: getNextIp,
		// EQUIPMENT
		getEquipments: getEquipments,
		addEquipment: addEquipment,
		updateEquipment: updateEquipment

	};
};
// function subnetsService($resource) {

// 	 return $resource('http://localhost:7000/api/subnets/:subnet', 
// 		 {
// 		 	subnet: "@subnet"
// 		 }
// 	 	);
// }


exports.default = ipamService;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _equipment = require('./equipment.html');

var _equipment2 = _interopRequireDefault(_equipment);

var _equipment3 = require('./equipment.controller');

var _equipment4 = _interopRequireDefault(_equipment3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var equipmentComponent = {
	bindings: {},
	template: _equipment2.default,
	controller: ['$rootScope', '$interval', _equipment4.default],
	controllerAs: '$ctrl'
};

exports.default = equipmentComponent;

},{"./equipment.controller":7,"./equipment.html":8}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var equipmentController = function equipmentController($rootScope) {
	_classCallCheck(this, equipmentController);

	var ctrl = this;

	// allows global variables to be defined. 
	ctrl.$rootScope = $rootScope;

	// calling the function to get the equipment from the api endpoint
	// the getEquipments function is defined in app.services.js
	ctrl.$rootScope.getEquipments();

	// declaring a local variable to change the sorting method
	ctrl.sortReverse = false;
};

exports.default = equipmentController;

},{}],8:[function(require,module,exports){
module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <sidebar class=\"col-9\"></sidebar>\n    <a href=\"/#!/equipmentform\" class=\"col-3\"><button id=\"addEquipment\"> Add Equipment</button></a>\n  </div>\n  <div class=\"row\">\n    <div class=\"col\">\n      <table class=\"table data lowz\">\n        <thead>\n          <tr>\n            <th>\n            <!-- ng-click for sortability and reversing sort with change of variable in the controller, the sortType refers to the data points i.e. site.NAME-->\n              <a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'name'\">\n                Name\n                <!-- ng-show based on both sortReverse and sortType to show an up and down arrow -->\n                <span ng-show=\"sortReverse && sortType == 'name'\" class=\"fa fa-caret-down\"></span>\n                <span ng-show=\"!sortReverse && sortType == 'name'\" class=\"fa fa-caret-up\"></span>\n              </a>\n            </th>\n            <th>\n              <a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'type[0].name'\">\n                Type\n                <span ng-show=\"sortReverse && sortType == 'type[0].name'\" class=\"fa fa-caret-down\"></span>\n                <span ng-show=\"!sortReverse && sortType == 'type[0].name'\" class=\"fa fa-caret-up\"></span>\n              </a>\n            </th>\n            <th>\n              <a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'host_name'\">\n                Hostname\n                <span ng-show=\"sortReverse && sortType == 'host_name'\" class=\"fa fa-caret-down\"></span>\n                <span ng-show=\"!sortReverse && sortType == 'host_name'\" class=\"fa fa-caret-up\"></span>\n              </a>\n            </th>\n            <th>\n              <a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = ''\">\n                Room Number\n                <span ng-show=\"sortReverse && sortType == ''\" class=\"fa fa-caret-down\"></span>\n                <span ng-show=\"!sortReverse && sortType == ''\" class=\"fa fa-caret-up\"></span>\n              </a>\n            </th>\n            <th>\n              <a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'ip_address'\">\n              IP Address\n                <span ng-show=\"sortReverse && sortType == 'ip_address'\" class=\"fa fa-caret-down\"></span>\n                <span ng-show=\"!sortReverse && sortType == 'ip_address'\" class=\"fa fa-caret-up\"></span>\n              </a>\n            </th>\n            <th>\n              <a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'mac_address'\">\n                MAC Address\n                <span ng-show=\"sortReverse && sortType == 'mac_address'\" class=\"fa fa-caret-down\"></span>\n                <span ng-show=\"!sortReverse && sortType == 'mac_address'\" class=\"fa fa-caret-up\"></span>\n              </a></th>\n              <th>\n                <a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'mab'\">\n                  MAB\n                  <span ng-show=\"sortReverse && sortType == 'mab'\" class=\"fa fa-caret-down\"></span>\n                  <span ng-show=\"!sortReverse && sortType == 'mab'\" class=\"fa fa-caret-up\"></span>\n                </a>\n              </th>\n              <th>\n                <a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'printer_server'\">\n                  Print Server\n                  <span ng-show=\"sortReverse && sortType == 'printer_server'\" class=\"fa fa-caret-down\"></span>\n                  <span ng-show=\"!sortReverse && sortType == 'printer_server'\" class=\"fa fa-caret-up\"></span>\n                </a>\n              </th>\n              <th>\n                <a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'driver'\">\n                  Driver\n                  <span ng-show=\"sortReverse && sortType == 'driver'\" class=\"fa fa-caret-down\"></span>\n                  <span ng-show=\"!sortReverse && sortType == 'driver'\" class=\"fa fa-caret-up\"></span>\n                </a>\n              </th>\n              <th>\n                <a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'printer_name'\">\n                  Printer Name\n                  <span ng-show=\"sortReverse && sortType == 'printer_name'\" class=\"fa fa-caret-down\"></span>\n                  <span ng-show=\"!sortReverse && sortType == 'printer_name'\" class=\"fa fa-caret-up\"></span>\n                </a>\n              </th>\n              <th>\n                <a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'share_name'\">\n                  Share Name\n                  <span ng-show=\"sortReverse && sortType == 'share_name'\" class=\"fa fa-caret-down\"></span>\n                  <span ng-show=\"!sortReverse && sortType == 'share_name'\" class=\"fa fa-caret-up\"></span>\n                </a>\n              </th>\n            </tr>\n          </thead>\n          <tbody>\n            <!-- repeating the data in equipments, filtering from the search bar with a variable in the $rootScope and also by the site ID from the checkboxes, tacks on a sorting option-->\n            <tr ng-repeat=\"equipment in $ctrl.$rootScope.equipments | filter: $ctrl.$rootScope.searchText | filter:$ctrl.$rootScope.filterByid | orderBy:sortType:sortReverse\">\n              <td class=\"pr-2\">{{equipment.name}}</td>\n              <td class=\"pr-2\">{{equipment.type[0].name}}</td>\n              <td class=\"pr-2\">{{equipment.host_name}}</td>\n              <td class=\"pr-2\">ROOM NAME</td>\n              <td class=\"pr-2\">{{equipment.ip_address}}</td>\n              <td class=\"pr-2\">{{equipment.mac_address}}</td>\n              <td class=\"pr-2\">{{equipment.mab}}</td>\n              <td class=\"pr-2\">{{equipment.printer_server}}</td>\n              <td class=\"pr-2\">{{equipment.driver}}</td>\n              <td class=\"pr-2\">{{equipment.printer_name}}</td>\n              <td class=\"pr-2\">{{equipment.share_name}}</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n  </div>";

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _equipmentform = require('./equipmentform.html');

var _equipmentform2 = _interopRequireDefault(_equipmentform);

var _equipmentform3 = require('./equipmentform.controller');

var _equipmentform4 = _interopRequireDefault(_equipmentform3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var equipmentformComponent = {
	bindings: {},
	template: _equipmentform2.default,
	controller: ['$rootScope', '$interval', _equipmentform4.default],
	controllerAs: '$ctrl'
};

exports.default = equipmentformComponent;

},{"./equipmentform.controller":10,"./equipmentform.html":11}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var equipmentformController = function equipmentformController($rootScope) {
	_classCallCheck(this, equipmentformController);

	var ctrl = this;
	ctrl.$rootScope = $rootScope;

	$("#equipaddress").focusout(function () {
		ctrl.ip = $("#equipaddress").val();
		for (var i = 0; i < ctrl.$rootScope.usedIps.length - 1; i++) {
			if (ctrl.ip == ctrl.$rootScope.usedIps[i]) {
				alert('Ray just Stop!');
			}
		}
	});

	ctrl.$rootScope.$watch('equipshow', function () {
		ctrl.equipshow = ctrl.$rootScope.equipshow;
	});
};

exports.default = equipmentformController;

},{}],11:[function(require,module,exports){
module.exports = "\n\n<form id=\"eqipForm\" name=\"equipmentForm\">\n  <div class=\"container main-center\">\n    <div class=\"form-group\">\n      <label for=\"siteSelect\">Site</label>\n      <select class=\"form-control\" id=\"siteSelect\" ng-model=\"site.Select\" \" required>\n        <option ng-repeat=\"site in $ctrl.$rootScope.sites\" value=\"{{site.id}}\">{{site.name}}</option>\n      </select>\n    </div>\n    <div class=\"form-group\" >\n      <label for=\"subnetSelect\" >Subnet</label>\n      <select class=\"form-control\" id=\"subnetSelect\" ng-dropdown required \">\n        <option ng-repeat=\"subnet in $ctrl.$rootScope.subnets\" value=\"{{subnet.id}}\">{{subnet.name}}</option>\n      </select>\n    </div>\n    <div class=\"form-group\" >\n      <label for=\"typeSelect\">Type</label>\n      <select id=\"typeId\" class=\"form-control\" ng-model=\"type.Select\" ng-dropdown ng-change=\"changeme()\" required >\n        <option value=\"8\">Other</option>\n        <option value=\"1\">Printer</option>\n        <option value=\"2\">Computer</option>\n\n      </select>\n      <!-- <option ng-repeat=\"equipment_type in $ctrl.$rootScope.equipment_types\" value=\"{{equipment_type.id}}\">{{equipment_type.name}}</option> -->\n    </div>\n    \n    <div class=\"form-group\">\n      <label for=\"equipmentName\">Equipment Name</label>\n      <input class=\"form-control\" type=\"text\" id=\"equipmentName\" ng-pattern='/^[a-zA-Z][a-zA-Z0-9]*$/' required>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"hostName\">Host Name</label>\n      <input class=\"form-control\" type=\"text\" id=\"hostName\" required>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"room_id\">Room Number</label>\n      <input class=\"form-control\" type=\"number\" id=\"room_id\" required>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"serialNumber\">Serial Number</label>\n      <input class=\"form-control\" type=\"text\" id=\"serialNumber\">\n\n    </div>\n    <label for=\"macAdress\">Mac Address:</label>\n    <input id=\"macAddress\" placeholder=\"xx.xx.xx.xx.xx\" id=\"macAddress\" placeholder=\"\" type=\"text\" name=\"macaddress\" ng-model=\"macpin\" ng-pattern=\"/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/\" />\n    <span style=\"color:Red\" ng-show=\"equipmentForm.macaddress.$error.pattern\">Please Enter a Valid Mac Address</span>\n    <br>\n    <label for=\"ipaddress\">IP Address:</label>\n    <input id=\"equipaddress\" placeholder=\"xx.xxx.xxx.xxx\" type=\"text\" name=\"equipaddress\" ng-model=\"txtpin\" ng-pattern=\"/\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b/\" />\n    <span style=\"color:Red\" ng-show=\"equipmentForm.equipipaddress.$error.pattern\">Please Enter a Valid IP Address</span>\n    <div class=\"form-check\">\n      <label class=\"form-check-label\">\n        <input class=\"form-check-input\" type=\"checkbox\" id=\"mabBoxYes\"\n        value=\"1\" required> MAB\n      </label>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"notesInput\">Notes</label>\n      <textarea class=\"form-control\" type=\"textarea\" id=\"notesInput\"></textarea>\n    </div>\n    <!-- These will be additional fields -->\n    <div class=\"form-group\" ng-if=\"subnet.Select == 'true'; type.Select == 'switch'\">\n      <label for=\"switchName\">Switch Name</label>\n\n      <input class=\"form-control\" type=\"text\" id=\"switchName\" required>\n      <label for=\"switchManagementIp\">Switch Management IP</label>\n      <input class=\"form-control\" type=\"text\" id=\"switchManagementIp\" required>\n      <!-- Autofill from room number already entered -->\n      <label for=\"switchRoomNumber\">Switch Room Number</label>\n      <input class=\"form-control\" type=\"number\" id=\"switchRoomNumber\" required>\n    </div>\n    <!-- Printer fields -->\n    <div class=\"container\" ng-if=\"type.Select =='1'\">\n      <div class=\"form-group\">\n        <label for=\"printServer\">Print Server</label>\n        <input class=\"form-control\" type=\"text\" id=\"printServer\" required>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"driverInput\">Driver</label>\n        <input class=\"form-control\" type=\"text\" id=\"driverInput\" required>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"printServer\">Print Server</label>\n        <input class=\"form-control\" type=\"text\" id=\"printServer\" required>\n      </div>\n      <!-- Need to autopopulate site abrev. & -room number -->\n      <div class=\"form-group\">\n        <label for=\"printerName\">Printer Name</label>\n        <input class=\"form-control\" type=\"text\" id=\"printerName\" required>\n      </div>\n      <!-- Should autopopulate again -->\n      <div class=\"form-group\">\n        <label for=\"shareName\">Share Name</label>\n        <input class=\"form-control\" type=\"text\" id=\"shareName\" required>\n      </div>\n      <!-- should autopopulate again -->\n      <div class=\"form-group\">\n        <label for=\"shareComment\">Share Comment</label>\n        <input class=\"form-control\" type=\"text\" id=\"shareComment\" required>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"modelNumber\">Model Type</label>\n        <input class=\"form-control\" type=\"text\" id=\"modelType\" required>\n      </div>\n    </div>\n    <!-- Computer Affitional Fields -->\n    <div  ng-if=\"type.Select =='2'\">\n      <div class=\"form-group\">\n        <label for=\"operatingSystem\">Operating System</label>\n        <input class=\"form-control\" type=\"text\" id=\"operatingSystem\" required>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"computerType\">Computer Type</label>\n        <select class=\"form-control\" id=\"computerType\" required>\n          <option>Virtual Machine</option>\n          <option>Physical Computer</option>\n        </select>\n      </div>\n    </div>\n  </div>\n\n\n  <!-- Printer fields -->\n<div class=\"container\" ng-if=\"type.Select =='printer'\">\n  <div class=\"form-group\">\n    <label for=\"printServer\">Print Server</label>\n      <input class=\"form-control\" type=\"text\" id=\"printServer\" required>\n  </div>\n    <div class=\"form-group\">\n    <label for=\"driverInput\">Driver</label>\n      <input class=\"form-control\" type=\"text\" id=\"driverInput\" required>\n  </div>\n  <div class=\"form-group\">\n    <label for=\"printServer\">Print Server</label>\n      <input class=\"form-control\" type=\"text\" id=\"printServer\" required>\n  </div>\n  <!-- Need to autopopulate site abrev. & -room number -->\n  <div class=\"form-group\">\n    <label for=\"printerName\">Printer Name</label>\n      <input class=\"form-control\" type=\"text\" id=\"printerName\" required>\n  </div> \n<!-- Should autopopulate again -->\n <div class=\"form-group\">\n    <label for=\"shareName\">Share Name</label>\n      <input class=\"form-control\" type=\"text\" id=\"shareName\" required>\n  </div>\n  <!-- should autopopulate again -->\n  <div class=\"form-group\">\n    <label for=\"shareComment\">Share Comment</label>\n      <input class=\"form-control\" type=\"text\" id=\"shareComment\" required>\n  </div>\n\n  <div class=\"form-group\">\n    <label for=\"modelNumber\">Model Number</label>\n      <input class=\"form-control\" type=\"number\" id=\"modelNumber\" required>\n  </div>\n  </div>\n  <!-- Computer Additional Fields -->\n  <div  ng-if=\"type.Select =='computer'\">\n  <div class=\"form-group\">\n    <label for=\"operatingSystem\">Operating System</label>\n      <input class=\"form-control\" type=\"text\" id=\"operatingSystem\" required>\n  </div>\n  <div class=\"form-group\">\n    <label for=\"computerType\">Computer Type</label>\n      <select class=\"form-control\" id=\"computerType\" required>\n        <option>Virtual Machine</option>\n        <option>Physical Computer</option>\n      </select>\n  </div>\n  </div>\n  <div class=\"clearfix\">\n    <button class=\"btn btn-primary\" ng-click=\"$ctrl.$rootScope.addEquipment()\" type=\"submit\">Save Equipment</button>\n     <a href=\"#!/home\"><!-- <button class=\"btn btn-danger\"> -->Cancel<!-- </button> --></a>\n  </div>\n</form>\n\n\n\n";

},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _login = require('./login.html');

var _login2 = _interopRequireDefault(_login);

var _login3 = require('./login.controller');

var _login4 = _interopRequireDefault(_login3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loginComponent = {
	bindings: {},
	template: _login2.default,
	controller: ['$rootScope', '$interval', _login4.default],
	controllerAs: '$ctrl'
};

exports.default = loginComponent;

},{"./login.controller":13,"./login.html":14}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var loginController = function loginController($rootScope) {
	_classCallCheck(this, loginController);

	var ctrl = this;
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

exports.default = loginController;

},{}],14:[function(require,module,exports){
module.exports = "\n<div id=\"login\" class=\"container\">\n\t<div class=\"jumbotron main-center\">\n\t\t<h3>Login</h3>\n\t\t<form name=\"form\" ng-submit=\"ctrl.login()\" role=\"form\" id=\"form-login\">\n\t\t  <div class=\"form-group\" ng-class=\"{ 'has-error': form.email.$dirty && form.email.$error.required }\">\n\t\t    <label>Email Address</label>\n\t\t    <input type=\"text\" name=\"email\" id=\"email\" class=\"form-control\" ng-model=\"ctrl.email\" required />\n\t\t    <span ng-show=\"form.email.$dirty && form.email.$error.required\" class=\"help-block\">Email is required</span>\n\t\t  </div>\n\t\t  <div class=\"form-group\" ng-class=\"{ 'has-error': form.password.$dirty && form.password.$error.required }\">\n            <label for=\"password\">Password</label>\n            <input type=\"password\" name=\"password\" id=\"password\" class=\"form-control\" ng-model=\"ctrl.password\" required />\n            <span ng-show=\"form.password.$dirty && form.password.$error.required\" class=\"help-block\">Password is required</span>\n        </div>\n        <div class=\"clearfix\">\n\t\t<button type=\"submit\" class=\"btn btn-success\" ng-disabled=\"form.$invalid || ctrl.dataLoading\">Submit</button>\n\t\t<button type=\"button\" class=\"btn btn-secondary\">Forgot Password?</button>\n\t\t</div>\n\t\t</form>\n\t</div>\n</div>";

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _nav = require('./nav.html');

var _nav2 = _interopRequireDefault(_nav);

var _nav3 = require('./nav.controller');

var _nav4 = _interopRequireDefault(_nav3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var navComponent = {
	bindings: {},
	template: _nav2.default,
	controller: ['$rootScope', '$interval', _nav4.default],
	controllerAs: '$ctrl'
};

exports.default = navComponent;

},{"./nav.controller":16,"./nav.html":17}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var navController = function navController($rootScope) {
	_classCallCheck(this, navController);

	var ctrl = this;
};

exports.default = navController;

},{}],17:[function(require,module,exports){
module.exports = "<ul class=\"nav nav-tabs  navbar-light p-2 topNav container-fluid\">\n  <li class=\"nav-item\">\n    <a class=\"navbar-brand\" href=\"/\"><img id=\"navlogo\" src=\"../../app/assets/images/ipamlogowhite.png\" alt=\"logo\"></a>\n  </li>\n  <li class=\"nav-item\">\n    <a class=\"nav-link\" href=\"/\">Dashboard</a>\n  </li>\n  <li class=\"nav-item\">\n    <a class=\"nav-link disabled\" href=\"/\">Manage Users</a>\n  </li>\n  <li class=\"nav-item\">\n    <a class=\"nav-link\" href=\"/#!/login\">Logout</a>\n  </li>\n</ul>\n\n\n";

},{}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _sidebar = require('./sidebar.html');

var _sidebar2 = _interopRequireDefault(_sidebar);

var _sidebar3 = require('./sidebar.controller');

var _sidebar4 = _interopRequireDefault(_sidebar3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sidebarComponent = {
	bindings: {},
	template: _sidebar2.default,
	controller: ['$rootScope', '$interval', '$http', _sidebar4.default],
	controllerAs: '$ctrl'
};

exports.default = sidebarComponent;

},{"./sidebar.controller":19,"./sidebar.html":20}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sidebarController = function sidebarController($rootScope, $http) {
    var _this = this;

    _classCallCheck(this, sidebarController);

    var ctrl = this;
    ctrl.$rootScope = $rootScope;
    ctrl.$rootScope.getSites();
    ctrl.filter = {};
    ctrl.filterSub = {};

    ctrl.$rootScope.filterBySid = filterBySid;
    ctrl.$rootScope.filterByid = filterByid;
    // ctrl.getid = getid;

    function filterByid(id) {
        //console.log(id.site_id);
        return ctrl.filter[id.site_id] || noFilter(ctrl.filter);
    }

    function filterBySid(subnet) {
        console.log(subnet.site_id);
        ctrl.$rootScope.filterBySid = subnet.site_id;
        return ctrl.$rootScope.filterbySid == 1;
    }

    // function getid() {
    //     return (ctrl.sites || [])
    //     .map(function (subnet) { return subnet.site_id; })
    //     .filter(function (cat, idx, arr) { return arr.indexOf(cat) === idx; });
    // }

    function noFilter(filterObj) {
        return Object.keys(filterObj).every(function (key) {
            return !filterObj[key];
        });
    }
    ctrl.$rootScope.search = function (searchText) {
        var ctrl = _this;
        ctrl.$rootScope.searchText = searchText;
    };
}

// Functions - Definitions


;

;

exports.default = sidebarController;

},{}],20:[function(require,module,exports){
module.exports = "<div class=\"container-fluid highz\">\n\t<div class=\"row\">\n\t\t<div class=\"col-6\">\n\t\t\t<input type=\"text\" id=\"searchText\" class=\"col\" placeholder=\"Keyword Search...\" ng-change=\"$ctrl.$rootScope.search($ctrl.$rootScope.searchText)\" ng-model=\"$ctrl.$rootScope.searchText\">\n\t\t</div>\n\t\t<div class=\"col-3\">\n\t\t\t<div class=\"dropdown\">\n\t\t\t  <button class=\"btn btn-secondary dropdown-toggle\" type=\"button\" id=\"dropdownMenuButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Subnet Filter</button>\n\t\t\t  <div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\">\n\t\t\t  \t<span ng-repeat=\"site in $ctrl.$rootScope.sites\" class=\"dropdown-item\">\n\t\t\t  \t<input type=\"checkbox\" ng-model=\"$ctrl.filterSub[site.id]\" ng-value=\"site.id\" class=\"filterbox\">{{site.id}}</input><br />\n\t\t\t  \t</span>\n\t\t\t  </div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"col-3\">\n\t\t\t<div class=\"dropdown\">\n\t\t\t  <button class=\"btn btn-secondary dropdown-toggle\" type=\"button\" id=\"dropdownMenuButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Equipment Filter</button>\n\t\t\t  <div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\">\n\t\t\t  \t<span ng-repeat=\"site in $ctrl.$rootScope.sites\" class=\"dropdown-item\">\n\t\t\t  \t<input type=\"checkbox\" ng-model=\"$ctrl.filter[site.id]\" ng-value=\"site.id\" class=\"filterbox\">{{site.name}}</input><br />\n\t\t\t  \t</span>\n\t\t\t  </div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n\t\n";

},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _sites = require('./sites.html');

var _sites2 = _interopRequireDefault(_sites);

var _sites3 = require('./sites.controller');

var _sites4 = _interopRequireDefault(_sites3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sitesComponent = {
	bindings: {},
	template: _sites2.default,
	controller: ['$rootScope', '$interval', '$http', _sites4.default],
	controllerAs: '$ctrl'
};

exports.default = sitesComponent;

},{"./sites.controller":22,"./sites.html":23}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sitesController = function () {
	function sitesController($rootScope, $http) {
		_classCallCheck(this, sitesController);

		var ctrl = this;
		ctrl.$rootScope = $rootScope;
		ctrl.$rootScope.getSites();

		// $http request for sites endpoint
	}

	_createClass(sitesController, [{
		key: 'addNewSite',
		value: function addNewSite() {
			alert('You want to add a new site!');
		}
	}]);

	return sitesController;
}();

exports.default = sitesController;

},{}],23:[function(require,module,exports){
module.exports = "\r\n<div class=\"container\">\r\n\t<div class=\"row\">\r\n\t\t<div  class=\"col-4\" ng-repeat=\"site in $ctrl.$rootScope.sites\">\r\n\t\t\t<div class=\"card card-block\" >\r\n\t\t\t\t<div class=\"card-title\">\r\n\t\t\t\t\t\t<h4 class=\"col-8\" ng-click=\"\">{{site.name}}</h4>\r\n\t\t\t\t\t\t<h5 class=\"col-4\">{{site.abbreviation}}</h5>\r\n\t\t\t\t</div>\r\n\t\t\t\t<ul class=\"list-group list-group-flush\">\r\n\t\t\t\t\t<li class=\"list-group-item\">Address: {{site.address}} </li>\r\n\t\t\t\t\t<li class=\"list-group-item btn\"><a href='/#!/editsite' ng-click=\"$ctrl.$rootScope.getSite(site.id) \">Edit Site</a></li>\t\r\n\t\t\t\t</ul>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<div class=\"col-4\">\r\n\t\t\t<a href='/#!/sitesform' class=\"text-center\">\r\n\t\t\t<div class=\"card card-block\">\r\n\t\t\t\t<div class=\"card-title\">\r\n\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t<h4 class=\"col text-center\">Add New Site</h4>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t<div class=\"col text-center\">\r\n\t\t\t\t\t\t<i class=\"fa fa-plus fa-5x text-center\"></i>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t</a>\r\n\t\t</div>\r\n\r\n\r\n\r\n\t</div> <!-- end main row -->\r\n\r\n\r\n</div> <!-- end container -->\r\n\r\n";

},{}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _subnetform = require('./subnetform.html');

var _subnetform2 = _interopRequireDefault(_subnetform);

var _subnetform3 = require('./subnetform.controller');

var _subnetform4 = _interopRequireDefault(_subnetform3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var subnetformComponent = {
	bindings: {},
	template: _subnetform2.default,
	controller: ['$rootScope', '$interval', _subnetform4.default],
	controllerAs: '$ctrl'
};

exports.default = subnetformComponent;

},{"./subnetform.controller":25,"./subnetform.html":26}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var subnetformController = function subnetformController($rootScope) {
	_classCallCheck(this, subnetformController);

	var ctrl = this;
	ctrl.subshow = false;
	ctrl.$rootScope = $rootScope;

	ctrl.$rootScope.$watch('subshow', function () {
		ctrl.subshow = ctrl.$rootScope.subshow;
	});
};

exports.default = subnetformController;

},{}],26:[function(require,module,exports){
module.exports = "<form id=\"subnetForm\">\n<div class=\"container main-center\" >\n<h1>Add A Subnet</h1>\n  <div class=\"\" >\n      <label for=\"siteSelect\">Sites</label>\n      <select class=\"form-control form-inline mr-2\" id=\"siteSelect\" ng-model=\"site.Select\" \" required>\n      <option ng-repeat=\"site in $ctrl.$rootScope.sites\" value=\"{{site.id}}\">{{site.name}}</option>\n    </select>\n    </div>\n\n    <div >\n      <label for=\"subnetName\">Subnet Name</label>\n        <input class=\"form-control form-inline\" type=\"text\" id=\"subnetName\" required>\n    </div>\n<div >\n  <div >                                                                    \n      <label for=\"subnetIpAddress\">Subnet Ip Address</label>\n      <input class=\"form-control\" type=\"text\" id=\"subnetIpAddress\" required>\n  </div>\n  <div >\n    <label for=\"subnetMaskBits\">Subnet Mask Bits</label>\n      <input class=\"form-control\" type=\"number\" id=\"subnetMaskBits\" required>\n  </div>\n</div>\n<div >\n  <div >\n    <label for=\"vlanNumber\">VLAN Number</label>\n      <input class=\"form-control\" type=\"number\" id=\"vlanNumber\">\n  </div>\n  <div >\n    <label for=\"leaseTime\">Lease Time</label>\n      <input class=\"form-control\" type=\"time\" id=\"leaseTime\">\n  </div>\n</div>\n<div >\n  <div >\n    <label for=\"subnetNotes\">Notes</label>\n      <textarea class=\"form-control\" type=\"text\" id=\"subnetNotes\"></textarea>\n  </div>\n</div>\n\n  <div class=\"clearfix\">\n  <a href=\"/home\" ><button class=\"btn btn-danger  \"><class=\"\">Cancel</button></a>\n    <button ng-click=\"$ctrl.$rootScope.addSubnet()\" class=\"btn btn-primary\" type=\"submit\">Save Subnet</button>\n  </div>\n  </form>\n</div>";

},{}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _subnets = require('./subnets.html');

var _subnets2 = _interopRequireDefault(_subnets);

var _subnets3 = require('./subnets.controller');

var _subnets4 = _interopRequireDefault(_subnets3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var subnetsComponent = {
	bindings: {},
	template: _subnets2.default,
	controller: ['$rootScope', '$interval', 'ipamService', _subnets4.default],
	controllerAs: '$ctrl'
};

exports.default = subnetsComponent;

},{"./subnets.controller":28,"./subnets.html":29}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var subnetsController = function subnetsController($rootScope) {
	_classCallCheck(this, subnetsController);

	var ctrl = this;

	// allows global variables to be defined. 
	ctrl.$rootScope = $rootScope;

	// calling the function to get the equipment from the api endpoint
	// the getEquipments function is defined in app.services.js
	ctrl.$rootScope.getSubnets();

	// declaring a local variable to change the sorting method
	ctrl.sortReverse = false;
};

exports.default = subnetsController;

},{}],29:[function(require,module,exports){
module.exports = "<div class=\"container-fluid\">\n\t<div class=\"row\">\n\t\t<sidebar class=\"col-9\"></sidebar>\n\t\t<a href=\"/#!/subnetform\" class=\"col-3\"><button id=\"addSubnet\"> Add Subnet</button></a>\n\t</div>\n\t<div class=\"row\">\n\t\t<div class= \"col\">\n\t\t\t<table class=\"data\">\n\t\t\t\t<thead>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<th>\n\t\t\t\t\t\t\t<!-- ng-click for sortability and reversing sort with change of variable in the controller, the sortType refers to the data points i.e. site.NAME -->\n\t\t\t\t\t\t\t<a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'name'\">\n\t\t\t\t\t\t\tName\n\t\t\t\t\t\t\t\t<!-- ng-show based on both sortReverse and sortType to show an up and down arrow -->\n\t\t\t\t\t\t\t\t<span ng-show=\"sortReverse && sortType == 'name'\" class=\"fa fa-caret-down\"></span>\n\t\t\t\t\t\t\t\t<span ng-show=\"!sortReverse && sortType == 'name'\" class=\"fa fa-caret-up\"></span>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</th>\n\t\t\t\t\t\t<th>\n\t\t\t\t\t\t\t<a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'site[0].name'\">\n\t\t\t\t\t\t\tSite Name\n\t\t\t\t\t\t\t\t<span ng-show=\"sortReverse && sortType == 'site[0].name'\" class=\"fa fa-caret-down\"></span>\n\t\t\t\t\t\t\t\t<span ng-show=\"!sortReverse && sortType == 'site[0].name'\" class=\"fa fa-caret-up\"></span>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</th>\n\t\t\t\t\t\t<th>\n\t\t\t\t\t\t\t<a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'subnet_address'\">\n\t\t\t\t\t\t\tSub Address\n\t\t\t\t\t\t\t\t<span ng-show=\"sortReverse && sortType == 'subnet_address'\" class=\"fa fa-caret-down\"></span>\n\t\t\t\t\t\t\t\t<span ng-show=\"!sortReverse && sortType == 'subnet_address'\" class=\"fa fa-caret-up\"></span>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</th>\n\t\t\t\t\t\t<th>\n\t\t\t\t\t\t\t<a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'mask_bits'\">\n\t\t\t\t\t\t\tMask Bits\n\t\t\t\t\t\t\t\t<span ng-show=\"sortReverse && sortType == 'mask_bits'\" class=\"fa fa-caret-down\"></span>\n\t\t\t\t\t\t\t\t<span ng-show=\"!sortReverse && sortType == 'mask_bits'\" class=\"fa fa-caret-up\"></span>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</th>\n\t\t\t\t\t\t<th>\n\t\t\t\t\t\t\t<a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'vLan'\">\n\t\t\t\t\t\t\tvLan\n\t\t\t\t\t\t\t\t<span ng-show=\"sortReverse && sortType == 'vLan'\" class=\"fa fa-caret-down\"></span>\n\t\t\t\t\t\t\t\t<span ng-show=\"!sortReverse && sortType == 'vLan'\" class=\"fa fa-caret-up\"></span>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</th>\n\t\t\t\t\t\t<th>\n\t\t\t\t\t\t\t<a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'lease_time'\">\n\t\t\t\t\t\t\tLease Time\n\t\t\t\t\t\t\t\t<span ng-show=\"sortReverse && sortType == 'lease_time'\" class=\"fa fa-caret-down\"></span>\n\t\t\t\t\t\t\t\t<span ng-show=\"!sortReverse && sortType == 'lease_time'\" class=\"fa fa-caret-up\"></span>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</th>\n\t\t\t\t\t\t<th>\n\t\t\t\t\t\t\t<a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'note[0].text'\">\n\t\t\t\t\t\t\tNotes\n\t\t\t\t\t\t\t\t<span ng-show=\"sortReverse && sortType == 'note[0].text'\" class=\"fa fa-caret-down\"></span>\n\t\t\t\t\t\t\t\t<span ng-show=\"!sortReverse && sortType == 'note[0].text'\" class=\"fa fa-caret-up\"></span>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</th>\n\t\t\t\t\t</tr>\n\t\t\t\t</thead>\n\t\t\t\t<tbody>\n\t\t\t\t<!-- repeating the data in equipments, filtering from the search bar with a variable in the $rootScope and also by the site ID from the checkboxes, tacks on a sorting option-->\n\t\t\t\t\t<tr ng-repeat=\"subnet in $ctrl.$rootScope.subnets | filter: $ctrl.$rootScope.searchText | filter: $ctrl.$rootScope.filterBySid | orderBy:sortType:sortReverse\">\n\t\t\t\t\t\t<td class=\"pr-2\">{{subnet.name}}</td>\n\t\t\t\t\t\t<td class=\"pr-2\">{{subnet.site[0].name}}</td>\n\t\t\t\t\t\t<td class=\"pr-2\">{{subnet.subnet_address}}</td>\n\t\t\t\t\t\t<td class=\"pr-2\">{{subnet.mask_bits}}</td>\n\t\t\t\t\t\t<td class=\"pr-2\">{{subnet.vLan}}</td>\n\t\t\t\t\t\t<td class=\"pr-2\">{{subnet.lease_time}}</td>\n\t\t\t\t\t\t<td class=\"pr-2\">{{subnet.notes[0].text | limitTo: 50}}...</td>\n\t\t\t\t\t</tr>\n\t\t\t\t</tbody>\n\t\t\t</table>\n\t\t</div>\n\t</div>\n</div>";

},{}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _users = require('./users.html');

var _users2 = _interopRequireDefault(_users);

var _users3 = require('./users.controller');

var _users4 = _interopRequireDefault(_users3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var usersComponent = {
	bindings: {},
	template: _users2.default,
	controller: ['$rootScope', '$interval', _users4.default],
	controllerAs: '$ctrl'
};

exports.default = usersComponent;

},{"./users.controller":31,"./users.html":32}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UsersController = function UsersController($rootScope) {
	_classCallCheck(this, UsersController);

	var ctrl = this;
};

exports.default = UsersController;

},{}],32:[function(require,module,exports){
module.exports = "<div class=\"col-md-6 col-md-offset-3\">\n    <h2>Manage Users</h2>\n    <form name=\"form\" ng-submit=\"ctrl.user()\" role=\"form\">\n        <div class=\"form-group\" ng-class=\"{ 'has-error': form.firstName.$dirty && form.firstName.$error.required }\">\n            <label for=\"username\">First name</label>\n            <input type=\"text\" name=\"firstName\" id=\"firstName\" class=\"form-control\" ng-model=\"ctrl.user.firstName\" required />\n            <span ng-show=\"form.firstName.$dirty && form.firstName.$error.required\" class=\"help-block\">First name is required</span>\n        </div>\n        <div class=\"form-group\" ng-class=\"{ 'has-error': form.lastName.$dirty && form.lastName.$error.required }\">\n            <label for=\"username\">Last name</label>\n            <input type=\"text\" name=\"lastName\" id=\"Text1\" class=\"form-control\" ng-model=\"ctrl.user.lastName\" required />\n            <span ng-show=\"form.lastName.$dirty && form.lastName.$error.required\" class=\"help-block\">Last name is required</span>\n        </div>\n        <div class=\"form-group\" ng-class=\"{ 'has-error': form.username.$dirty && form.username.$error.required }\">\n            <label for=\"username\">Username</label>\n            <input type=\"text\" name=\"username\" id=\"username\" class=\"form-control\" ng-model=\"ctrl.user.username\" required />\n            <span ng-show=\"form.username.$dirty && form.username.$error.required\" class=\"help-block\">Username is required</span>\n        </div>\n        <div class=\"form-group\" ng-class=\"{ 'has-error': form.password.$dirty && form.password.$error.required }\">\n            <label for=\"password\">Password</label>\n            <input type=\"password\" name=\"password\" id=\"password\" class=\"form-control\" ng-model=\"ctrl.user.password\" required />\n            <span ng-show=\"form.password.$dirty && form.password.$error.required\" class=\"help-block\">Password is required</span>\n        </div>\n        <div class=\"form-actions\">\n            <button type=\"submit\" ng-disabled=\"form.$invalid || ctrl.dataLoading\" class=\"btn btn-primary\">Register</button>\n            \n            <a href=\"#!/login\" class=\"btn btn-link\">Cancel</a>\n        </div>\n    </form>\n</div>";

},{}]},{},[4]);
