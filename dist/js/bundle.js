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
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var appCtrl = function appCtrl($rootScope, $http, $location, ipamService) {
	_classCallCheck(this, appCtrl);

	var ctrl = this;
	ctrl.$rootScope = $rootScope;

	// define a dashbaord variable to work with the ng-clicks
	// and to set value based on entry page
	ctrl.$rootScope.dashboard = $location.path() == '/' || $location.path() == '' ? true : false;

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
		});

		alert(id);
	};

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
	};

	// ctrl.$rootScope.getSites();
	// ipamService.updateSite().update({site:1}, ctrl.newSite);


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
			"name": $('#equipmentName').val(),
			"equipment_type_id": $('#typeId').val(),
			"room_id": $('#roomNumber').val(),
			"model": $('#modelType').val(),
			"driver": $('#driverInpur').val(),
			"ip_address": $('#equipaddress').val(),
			"site_id": $('#siteSelect').val(),
			"host_name": $('#hostName').val(),
			"mac_address": $('#macAddress').val(),
			"mab": $('#mabBoxYes').val(),
			"printer_server": $('#printerServer').val(),
			"printer_name": $('#printerName').val(),
			"share_name": $('#shareName').val(),
			"share_comment": $('#shareComment').val()
		};
		console.log($('#siteSelect').val());

		// specific call to save from $resource
		ipamService.addEquipment().save({}, ctrl.newEquipment).$promise
		// says wait for the data and push it to the array
		.then(function (data) {
			ctrl.$rootScope.equipments.push(data);
		});
	}; //end equipments

} // end constructor
; // end appCtrl


exports.default = appCtrl;

},{}],3:[function(require,module,exports){
module.exports = "\n\n<nav></nav>\n<ng-view></ng-view> \n<tabboard ng-if=\"$ctrl.$rootScope.dashboard\"></tabboard>\n\n\n";

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

var _tabboard = require('./components/tabboard/tabboard.component');

var _tabboard2 = _interopRequireDefault(_tabboard);

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

angular.module('app', ['ngRoute', 'ngCookies', 'ngResource']).component('app', _app2.default).component('equipment', _equipment2.default).component('sites', _sites2.default).component('subnets', _subnets2.default).component('users', _users2.default).component('login', _login2.default).component('tabboard', _tabboard2.default).component('nav', _nav2.default).factory('ipamService', _appServices2.default).component('equipmentform', _equipmentform2.default).component('subnetform', _subnetform2.default).component('sidebar', _sidebar2.default).config(config).run(run);

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
    }).when('/side', {
        controller: _sidebar2.default.controller,
        templateUrl: 'app/components/sidebar/sidebar.html',
        controllerAs: '$ctrl'
    }).otherwise({ redirectTo: '/' });
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

},{"./app.component":1,"./app.services.js":5,"./components/equipment/equipment.component":6,"./components/equipment/equipmentform/equipmentform.component":9,"./components/login/login.component":12,"./components/nav/nav.component":15,"./components/sidebar/sidebar.component":18,"./components/sites/sites.component":21,"./components/subnets/subnetform/subnetform.component":24,"./components/subnets/subnets.component":27,"./components/tabboard/tabboard.component":30,"./components/users/users.component":33}],5:[function(require,module,exports){
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
			update: { method: 'PUT' }
		});
	};
	// All of the Subnet api functions
	var getSubnets = function getSubnets() {
		return $resource('http://localhost:7000/api/subnets/:subnet', { subnet: "@subnet" });
	};
	var addSubnet = function addSubnet() {
		return $resource('http://localhost:7000/api/subnets');
	};
	var updateSubnet = function updateSubnet() {
		return $resource('http://localhost:7000/api/subnets/:subnet', { subnet: "@subnet" }, { upadte: { metod: 'PUT' }
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
		return $resource('http://localhost:7000/api/equipment/:equipment', { equipment: "@equipment" }, { update: { method: 'PUT' }
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
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var equipmentController = function () {
	function equipmentController($rootScope, ModalService) {
		_classCallCheck(this, equipmentController);

		var ctrl = this;
		ctrl.$rootScope = $rootScope;
		ctrl.$rootScope.getEquipments();

		// vm.openModal = openModal;
		// vm.closeModal = closeModal;

		// initcontroller();

		// function initcontroller(){
		// 	vm.bodyText = 'This is working!';
		// };
		// function openModal(id){
		// 	ModalService.Open(id);
		// 	console.log('Clicked!')
		// };	
		// function closeModal(id){
		// 	ModalService.close(id);
		// };
	}

	_createClass(equipmentController, [{
		key: 'click',
		value: function click() {
			var ctrl = this;
			console.log('hello from equipmentForm');
			console.log(ctrl.$rootScope.equipshow);
			ctrl.$rootScope.equipshow = true;
		}
	}]);

	return equipmentController;
}();

exports.default = equipmentController;

},{}],8:[function(require,module,exports){
module.exports = "\n<a href=\"/#!/equipmentform\" ng-click=\"$ctrl.$rootScope.dashboard = false\"><button id=\"addEquipment\"> Add Equipment</button></a>\n\n<div class=\"container-fluid\">\n<div class=\"row\">\n<!-- <div class=\"col-3\">\n<sidebar></sidebar>\n</div> -->\n<div class=\"col-9\">\n<table class=\"table data\">\n  <thead>\n    <tr>\n      <th>Name</th>\n      <th>Type</th>\n      <th>Hostname</th>\n      <th>Room Number</th>\n      <th>IP Address</th>\n      <th>MAC Address</th>\n      <th>MAB</th>\n      <th>Print Server</th>\n      <th>Driver</th>\n      <th>Printer Name</th>\n      <th>Share Name</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr ng-repeat=\"equipment in $ctrl.$rootScope.equipments | filter: $ctrl.$rootScope.searchText | filter:$ctrl.$rootScope.filterByid\"\">\n      <td class=\"pr-2\">{{equipment.name}}</td>\n      <td class=\"pr-2\">{{equipment.type[0].name}}</td>\n      <td class=\"pr-2\">{{equipment.host_name}}</td>\n      <td class=\"pr-2\">ROOM NAME</td>\n      <td class=\"pr-2\">{{equipment.ip_address}}</td>\n      <td class=\"pr-2\">{{equipment.mac_address}}</td>\n      <td class=\"pr-2\">{{equipment.mab}}</td>\n      <td class=\"pr-2\">{{equipment.printer_server}}</td>\n      <td class=\"pr-2\">{{equipment.driver}}</td>\n      <td class=\"pr-2\">{{equipment.printer_name}}</td>\n      <td class=\"pr-2\">{{equipment.share_name}}</td>\n    </tr>\n  </tbody>\n</table>\n</div>\n</div>\n</div>\n\n\n";

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

console.log('equipmentform.component');

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
	$("#equipipaddress").focusout(function () {
		ctrl.ip = $("#equipipaddress").val();
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
module.exports = "<a href=\"/\" ng-click=\"$ctrl.$rootScope.dashboard = true\"><button><i class=\"fa fa-close fa-3x\"></i></button></a>\n<form name=\"equipmentForm\">\n<div class=\"container\">\n\n\n  <div class=\"form-group\">\n    <label for=\"siteSelect\">Site</label>\n    <select class=\"form-control\" id=\"siteSelect\" ng-model=\"site.Select\" \" required>\n      <option ng-repeat=\"site in $ctrl.$rootScope.sites\" value=\"{{site.id}}\">{{site.name}}</option>\n    </select>\n  </div> \n\n      <div class=\"form-group\" >\n      <label for=\"subnetSelect\" >Subnet</label>\n      <select class=\"form-control\"  ng-dropdown required \">\n        <option ng-repeat=\"subnet in $ctrl.$rootScope.subnets\" value=\"{{subnet.id}}\">{{subnet.name}}</option>\n        \n      </select>\n    </div>\n\n     <div class=\"form-group\" >\n      <label for=\"typeSelect\">Type</label>\n      <select id=\"typeId\" class=\"form-control\" ng-model=\"type.Select\" ng-dropdown ng-change=\"changeme()\" required >\n        <option ng-option value=\"8\">Other</option>\n        <option ng-option value=\"1\">Printer</option>\n        <option ng-option value=\"2\">Computer</option>\n        <option ng-option value=\"8\">Switch</option>\n      </select>\n    </div>\n \n\n  <div class=\"form-group\">\n    <label for=\"equipmentName\">Equipment Name</label>\n      <input class=\"form-control\" type=\"text\" id=\"equipmentName\" ng-pattern='/^[a-zA-Z][a-zA-Z0-9]*$/' required>\n  </div>\n\n  <div class=\"form-group\">\n    <label for=\"hostName\">Host Name</label>\n      <input class=\"form-control\" type=\"text\" id=\"hostName\" required>\n  </div>\n\n  <div class=\"form-group\">\n    <label for=\"roomNumber\">Room Number</label>\n      <input class=\"form-control\" type=\"number\" id=\"roomNumber\" required>\n  </div>\n\n  <div class=\"form-group\">\n    <label for=\"serialNumber\">Serial Number</label>\n      <input class=\"form-control\" type=\"text\" id=\"serialNumber\">\n  </div>\n\nMac Address:<label for=\"macAdress\">Mac Address</label>\n  <input id=\"macAddress\" placeholder=\"xx.xx.xx.xx.xx\" id=\"macAddress\" placeholder=\"\" type=\"text\" name=\"macaddress\" ng-model=\"macpin\" ng-pattern=\"/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/\" />\n<span style=\"color:Red\" ng-show=\"equipmentForm.macaddress.$error.pattern\">Please Enter a Valid Mac Address</span>\n<br>\n\nIp Address:<label for=\"ipaddress\">IP Address</label>\n  <input id=\"equipipaddress\" placeholder=\"xx.xxx.xxx.xxx\" type=\"text\" name=\"equipipaddress\" ng-model=\"txtpin\" ng-pattern=\"/\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b/\" />\n<span style=\"color:Red\" ng-show=\"equipmentForm.equipipaddress.$error.pattern\">Please Enter a Valid IP Address</span>\n\n  <div class=\"form-check\">\n    <label class=\"form-check-label\">\n      <input class=\"form-check-input\" type=\"checkbox\" id=\"mabBoxYes\"\n      value=\"option1\" required> MAB\n    </label>\n  </div>\n\n  <div class=\"form-group\">\n    <label for=\"notesInput\">Notes</label>\n      <input class=\"form-control\" type=\"textarea\" id=\"notesInput\" >\n  </div>\n  <!-- These will be additional fields -->\n  <div class=\"form-group\" ng-if=\"subnet.Select == 'true'; type.Select == 'switch'\">\n    <label for=\"switchName\">Switch Name</label>\n      <input class=\"form-control\" type=\"text\" id=\"switchName\" required>\n    <label for=\"switchManagementIp\">Switch Management IP</label>\n      <input class=\"form-control\" type=\"text\" id=\"switchManagementIp\" required>\n      <!-- Autofill from room number already entered -->\n    <label for=\"switchRoomNumber\">Switch Room Number</label>\n      <input class=\"form-control\" type=\"number\" id=\"switchRoomNumber\" required>\n  </div>\n\n  <!-- Printer fields -->\n<div class=\"container\" ng-if=\"type.Select =='printer'\">\n  <div class=\"form-group\">\n    <label for=\"printServer\">Print Server</label>\n      <input class=\"form-control\" type=\"text\" id=\"printServer\" required>\n  </div>\n    <div class=\"form-group\">\n    <label for=\"driverInput\">Driver</label>\n      <input class=\"form-control\" type=\"text\" id=\"driverInput\" required>\n  </div>\n  <div class=\"form-group\">\n    <label for=\"printServer\">Print Server</label>\n      <input class=\"form-control\" type=\"text\" id=\"printServer\" required>\n  </div>\n  <!-- Need to autopopulate site abrev. & -room number -->\n  <div class=\"form-group\">\n    <label for=\"printerName\">Printer Name</label>\n      <input class=\"form-control\" type=\"text\" id=\"printerName\" required>\n  </div> \n<!-- Should autopopulate again -->\n <div class=\"form-group\">\n    <label for=\"shareName\">Share Name</label>\n      <input class=\"form-control\" type=\"text\" id=\"shareName\" required>\n  </div>\n  <!-- should autopopulate again -->\n  <div class=\"form-group\">\n    <label for=\"shareComment\">Share Comment</label>\n      <input class=\"form-control\" type=\"text\" id=\"shareComment\" required>\n  </div>\n\n  <div class=\"form-group\">\n    <label for=\"modelNumber\">Model Type</label>\n      <input class=\"form-control\" type=\"text\" id=\"modelType\" required>\n  </div>\n  </div>\n  <!-- Computer Affitional Fields -->\n  <div  ng-if=\"type.Select =='computer'\">\n  <div class=\"form-group\">\n    <label for=\"operatingSystem\">Operating System</label>\n      <input class=\"form-control\" type=\"text\" id=\"operatingSystem\" required>\n  </div>\n  <div class=\"form-group\">\n    <label for=\"computerType\">Computer Type</label>\n      <select class=\"form-control\" id=\"computerType\" required>\n        <option>Virtual Machine</option>\n        <option>Physical Computer</option>\n      </select>\n  </div>\n  </div>\n<button  ng-click='$ctrl.$rootScope.addEquipment()' class=\"btn btn-primary\" type=\"submit\">Save Equipment</button>\n</div>\n</form>\n\n";

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
module.exports = "\n<div class=\"container\">\n\t<div class=\"jumbotron\">\n\t\t<h3>Login</h3>\n\t\t<form name=\"form\" ng-submit=\"ctrl.login()\" role=\"form\" id=\"form-login\">\n\t\t  <div class=\"form-group\" ng-class=\"{ 'has-error': form.email.$dirty && form.email.$error.required }\">\n\t\t    <label>Email Address</label>\n\t\t    <input type=\"text\" name=\"email\" id=\"email\" class=\"form-control\" ng-model=\"ctrl.email\" required />\n\t\t    <span ng-show=\"form.email.$dirty && form.email.$error.required\" class=\"help-block\">Email is required</span>\n\t\t  </div>\n\t\t  <div class=\"form-group\" ng-class=\"{ 'has-error': form.password.$dirty && form.password.$error.required }\">\n            <label for=\"password\">Password</label>\n            <input type=\"password\" name=\"password\" id=\"password\" class=\"form-control\" ng-model=\"ctrl.password\" required />\n            <span ng-show=\"form.password.$dirty && form.password.$error.required\" class=\"help-block\">Password is required</span>\n        </div>\n        <div class=\"form-actions\">\n\t\t<button type=\"submit\" class=\"btn btn-success\" ng-disabled=\"form.$invalid || ctrl.dataLoading\">Submit</button>\n\t\t<button type=\"button\" class=\"btn btn-secondary\">Forgot Password?</button>\n\t\t</div>\n\t\t</form>\n\t</div>\n</div>";

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
module.exports = "<ul class=\"nav nav-tabs  navbar-light\" style=\"background-color: #DDD;\">\n  <li class=\"nav-item\">\n    <a class=\"navbar-brand\" href=\"../login/login.html\">IPAM</a>\n  </li>\n  <li class=\"nav-item\">\n    <a class=\"nav-link\" href=\"../../app.html\">Dashboard</a>\n  </li>\n  <li class=\"nav-item\">\n    <a class=\"nav-link disabled\" href=\"../users/users.html\">Manage Users</a>\n  </li>\n  <li class=\"nav-item\">\n    <a class=\"nav-link\" href=\"../login/login.html\">Logout</a>\n  </li>\n</ul>\n\n";

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

    ctrl.$rootScope.filterByid = filterByid;
    ctrl.getid = getid;

    function filterByid(site) {
        return ctrl.filter[site.id] || noFilter(ctrl.filter);
    }

    function getid() {
        return (ctrl.sites || []).map(function (site) {
            return site.id;
        }).filter(function (cat, idx, arr) {
            return arr.indexOf(cat) === idx;
        });
    }

    function noFilter(filterObj) {
        return Object.keys(filterObj).every(function (key) {
            return !filterObj[key];
        });
    }
    ctrl.$rootScope.test = function () {
        console.log("hi from sidebarController");
    };

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
module.exports = "\t<div>\n\t<input type=\"text\" id=\"searchText\" class=\"col\" ng-change=\"$ctrl.$rootScope.search($ctrl.$rootScope.searchText)\" ng-model=\"$ctrl.$rootScope.searchText\">\n\t<span ng-repeat=\"site in $ctrl.$rootScope.sites\">\n\t<input type=\"checkbox\" ng-model=\"$ctrl.filter[site.id]\" ng-value=\"site.id\" class=\"filterbox\">{{site.name}}</input><br /></span>\n\t</div>\n\t<!-- <div class=\"col-9\">\n\t\t<table class=\"data\" >\n\t\t  <tr>\n\t\t    <th>Entry Header 1</th>\n\t\t    <th>Entry Header 2</th>\n\t\t    <th>Entry Header 3</th>\n\t\t    <th>Entry Header 4</th>\n\t\t  </tr>\n\t\t  <tr ng-repeat=\"site in $ctrl.$rootScope.sites | filter: $ctrl.searchText | filter:$ctrl.filterByid\">\n\t\t  \t<td>{{site.name}}</td>\n\t\t  \t<td>{{site.site_contact}}</td>\n\t\t  \t<td>{{site.address}}</td>\n\t\t  \t<td>{{site.abbreviation}}</td>\n\t\t  </tr>\n\t</div> -->\n\t<!-- </table> -->\n\t\n";

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
module.exports = "\r\n<div class=\"container\">\r\n\t<div class=\"row\">\r\n\t\t<div  class=\"col-4\" ng-repeat=\"site in $ctrl.$rootScope.sites\">\r\n\t\t\t<div class=\"card card-block\" >\r\n\t\t\t\t<div class=\"card-title\">\r\n\t\t\t\t\t\t<h4 class=\"col-8\" ng-click=\"$ctrl.$rootScope.getSite(site.id)\">{{site.name}}</h4>\r\n\t\t\t\t\t\t<h5 class=\"col-4\">{{site.abbreviation}}</h5>\r\n\t\t\t\t</div>\r\n\t\t\t\t<ul class=\"list-group list-group-flush\">\r\n\t\t\t\t\t<li class=\"list-group-item\">Address: {{site.address}} </li>\r\n\t\t\t\t\t<li class=\"list-group-item\">Contact: {{site.site_contact}} </li>\r\n\t\t\t\t</ul>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<div class=\"col-4\">\r\n\t\t\t<a href='/#!/sitesform'  ng-click=\"$ctrl.$rootScope.dashboard = false\" class=\"text-center\">\r\n\t\t\t<div class=\"card card-block\">\r\n\t\t\t\t<div class=\"card-title\">\r\n\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t<h4 class=\"col text-center\">Add New Site</h4>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t<div class=\"col text-center\">\r\n\t\t\t\t\t\t<i class=\"fa fa-plus fa-5x text-center\"></i>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t</a>\r\n\t\t</div>\r\n\r\n\r\n\r\n\t</div> <!-- end main row -->\r\n\r\n\r\n</div> <!-- end container -->\r\n\r\n";

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

console.log('subnetform.component');

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
module.exports = "<a href=\"/\"  ng-click=\"$ctrl.$rootScope.dashboard = true\"><button><i class=\"fa fa-close fa-3x\"></i></button></a>\n<form>\n<div class=\"container\" >\n<div class=\"form-inline\">\n  <div class=\"form-group\">\n    <label for=\"siteSelect\">Site</label>\n    <select class=\"form-control\" id=\"siteSelect\" ng-model=\"site.Select\" \" required>\n      <option ng-repeat=\"site in $ctrl.$rootScope.sites\" value=\"{{site.id}}\">{{site.name}}</option>\n    </select>\n  </div> \n    <div >\n      <label for=\"subnetName\">Subnet Name</label>\n        <input class=\"form-control form-inline\" type=\"text\" id=\"subnetName\" required>\n    </div>\n</div>\n<div >\n  <div >\n    <label for=\"subnetIpAdress\">Subnet Ip Adress</label>\n      <input class=\"form-control\" type=\"text\" id=\"subnetIpAdress\" required>\n  </div>\n  <div >\n    <label for=\"subnetMaskBits\">Subnet Mask Bits</label>\n      <input class=\"form-control\" type=\"number\" id=\"subnetMaskBits\" required>\n  </div>\n</div>\n<div >\n  <div >\n    <label for=\"vlanNumber\">VLAN Number</label>\n      <input class=\"form-control\" type=\"number\" id=\"vlanNumber\">\n  </div>\n  <div >\n    <label for=\"leaseTime\">Lease Time</label>\n      <input class=\"form-control\" type=\"time\" id=\"leaseTime\">\n  </div>\n</div>\n<div >\n  <div >\n    <label for=\"subnetNotes\">Notes</label>\n      <input class=\"form-control\" type=\"text\" id=\"subnetNotes\">\n  </div>\n</div>\n\n  <button ng-click=\"$ctrl.$rootScope.addSubnet()\" class=\"btn btn-primary\" type=\"submit\">Save Subnet</button></form>\n</div>";

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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var subnetsController = function () {
	function subnetsController($rootScope) {
		_classCallCheck(this, subnetsController);

		var ctrl = this;

		ctrl.$rootScope = $rootScope;

		ctrl.$rootScope.getSubnets();
		// ctrl.$rootScope.$watch('sites', function() {
		// console.log(ctrl.$rootScope.sites);
		// })
	}

	_createClass(subnetsController, [{
		key: "subnet",
		value: function subnet() {
			var ctrl = this;
			console.log("hello from subnet");
			ctrl.$rootScope.subshow = true;
		}
	}]);

	return subnetsController;
}();

exports.default = subnetsController;

},{}],29:[function(require,module,exports){
module.exports = "\n<a href=\"/#!/subnetform\"  ng-click=\"$ctrl.$rootScope.dashboard = false\"><button id=\"addSubnet\">Add Subnet</button></a>\n<button ng-click=\"$ctrl.$rootScope.sidebar = !$ctrl.$rootScope.sidebar\">\n\t<i class=\"fa fa-arrow-left\" ng-show=\"$ctrl.$rootScope.sidebar\"></i>\n\t<i class=\"fa fa-arrow-right\" ng-show=\"!$ctrl.$rootScope.sidebar\"></i>\n</button>\n<div class=\"container-fluid\">\n<div class=\"row\">\n<div class=\"col-3\" ng-show=\"$ctrl.$rootScope.sidebar\" ng-init=\"$ctrl.$rootScope.sidebar = true\">\n<sidebar></sidebar>\n</div>\n<table class=\"data\">\n\t<thead>\n\t\t<tr>\n\t\t\t<th>Name</th>\n\t\t\t<th>Site Id</th>\n\t\t\t<th>Address</th>\n\t\t\t<th>Mask Bits</th>\n\t\t\t<th>vLan</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t<tr ng-repeat=\"subnet in $ctrl.$rootScope.subnets | filter: $ctrl.$rootScope.searchText | filter:$ctrl.$rootScope.filterByid\"\">\n\t\t\t<td class=\"pr-2\">{{subnet.name}}</td>\n\t\t\t<td class=\"pr-2\">{{subnet.site_id}}</td>\n\t\t\t<td class=\"pr-2\">{{subnet.subnet_address}}</td>\n\t\t\t<td class=\"pr-2\">{{subnet.mask_bits}}</td>\n\t\t\t<td class=\"pr-2\">{{subnet.vLan}}</td>\n\t\t</tr>\n\t</tbody>\n</table>\n<button ng-click=\"$ctrl.$rootScope.test()\">Test</button>\n</div>\n</div>\n</div>\n\n\n";

},{}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _tabboard = require('./tabboard.html');

var _tabboard2 = _interopRequireDefault(_tabboard);

var _tabboard3 = require('./tabboard.controller');

var _tabboard4 = _interopRequireDefault(_tabboard3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tabboardComponent = {
	bindings: {},
	template: _tabboard2.default,
	controller: ['$rootScope', '$interval', '$http', '$q', _tabboard4.default],
	controllerAs: '$ctrl'
};

exports.default = tabboardComponent;

},{"./tabboard.controller":31,"./tabboard.html":32}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tabboardController = function () {
	function tabboardController($rootScope, $http, $q, $interval) {
		_classCallCheck(this, tabboardController);

		var ctrl = this;
		ctrl.$rootScope = $rootScope;
		ctrl.sitesTab = $('#sitesTab').attr('id');
		ctrl.subnetsTab = $('#subnetsTab').attr('id');
		ctrl.equipmentTab = $('#equipmentTab').attr('id');
		ctrl.showTab = 'sites';

		$(".nav-link").on("click", function () {
			$(".nav-link").removeClass("active");
			$(this).addClass("active");
		});
	}

	_createClass(tabboardController, [{
		key: 'switchTabView',


		//tab logic
		value: function switchTabView(event) {
			var ctrl = this;
			var showTab = ctrl.$rootScope.showTab;
			var currentTab = $(event.target).attr('id');
			switch (currentTab) {
				case 'sitesTab':
					ctrl.showTab = 'sites';
					break;
				case 'subnetsTab':
					ctrl.showTab = 'subnets';
					break;
				case 'equipmentTab':
					ctrl.showTab = 'equipment';
					break;
			}
		} //end tab logic


	}]);

	return tabboardController;
}();

exports.default = tabboardController;

},{}],32:[function(require,module,exports){
module.exports = "\n<ul class=\"nav nav-tabs\"> <!-- Tabs -->\n  <li class=\"nav-item\">\n    <a class=\"nav-link active\" id=\"sitesTab\" value=\"sites\" ng-click=\"$ctrl.switchTabView($event)\" href=\"#\">Sites</a>\n  </li>\n  <li class=\"nav-item\">\n    <a class=\"nav-link\" id=\"subnetsTab\" ng-click=\"$ctrl.switchTabView($event)\" href=\"#\">Subnets</a>\n  </li>\n  <li class=\"nav-item\">\n    <a class=\"nav-link\" id=\"equipmentTab\" ng-click=\"$ctrl.switchTabView($event)\" href=\"#\">Equipment</a>\n  </li>\n</ul> <!-- End Tabs -->\n\n<sites ng-show=\"$ctrl.showTab == 'sites'\"></sites>\n<subnets ng-show=\"$ctrl.showTab == 'subnets'\"></subnets>\n<equipment ng-show=\"$ctrl.showTab == 'equipment'\"></equipment>";

},{}],33:[function(require,module,exports){
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

},{"./users.controller":34,"./users.html":35}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
module.exports = "<div class=\"col-md-6 col-md-offset-3\">\n    <h2>Manage Users</h2>\n    <form name=\"form\" ng-submit=\"ctrl.user()\" role=\"form\">\n        <div class=\"form-group\" ng-class=\"{ 'has-error': form.firstName.$dirty && form.firstName.$error.required }\">\n            <label for=\"username\">First name</label>\n            <input type=\"text\" name=\"firstName\" id=\"firstName\" class=\"form-control\" ng-model=\"ctrl.user.firstName\" required />\n            <span ng-show=\"form.firstName.$dirty && form.firstName.$error.required\" class=\"help-block\">First name is required</span>\n        </div>\n        <div class=\"form-group\" ng-class=\"{ 'has-error': form.lastName.$dirty && form.lastName.$error.required }\">\n            <label for=\"username\">Last name</label>\n            <input type=\"text\" name=\"lastName\" id=\"Text1\" class=\"form-control\" ng-model=\"ctrl.user.lastName\" required />\n            <span ng-show=\"form.lastName.$dirty && form.lastName.$error.required\" class=\"help-block\">Last name is required</span>\n        </div>\n        <div class=\"form-group\" ng-class=\"{ 'has-error': form.username.$dirty && form.username.$error.required }\">\n            <label for=\"username\">Username</label>\n            <input type=\"text\" name=\"username\" id=\"username\" class=\"form-control\" ng-model=\"ctrl.user.username\" required />\n            <span ng-show=\"form.username.$dirty && form.username.$error.required\" class=\"help-block\">Username is required</span>\n        </div>\n        <div class=\"form-group\" ng-class=\"{ 'has-error': form.password.$dirty && form.password.$error.required }\">\n            <label for=\"password\">Password</label>\n            <input type=\"password\" name=\"password\" id=\"password\" class=\"form-control\" ng-model=\"ctrl.user.password\" required />\n            <span ng-show=\"form.password.$dirty && form.password.$error.required\" class=\"help-block\">Password is required</span>\n        </div>\n        <div class=\"form-actions\">\n            <button type=\"submit\" ng-disabled=\"form.$invalid || ctrl.dataLoading\" class=\"btn btn-primary\">Register</button>\n            \n            <a href=\"#!/login\" class=\"btn btn-link\">Cancel</a>\n        </div>\n    </form>\n</div>";

},{}]},{},[4]);
