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
	ctrl.$rootScope.alert = '';
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
			ctrl.$rootScope.currentSubnets = data.subnets;
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
			"site_contact": $('#siteContact').val(),
			"notes": $('#siteNotes').val()

			// specific call to save from $resource
		};ipamService.addSite().save({}, ctrl.newSite).$promise
		// says wait for the data and push it to the array
		.then(function (data) {
			ctrl.$rootScope.sites.push(data);
			ctrl.$rootScope.getSites();
			ctrl.$rootScope.alert = data.message;
			console.log(ctrl.$rootScope.alert);
		}, function (error) {
			ctrl.$rootScope.alert = error.message;
			console.log(error.message);
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
			// specific call to save from $resource
		};ipamService.updateSite().update({ site: id }, ctrl.saveSite).$promise
		// says wait for the data and push it to the array
		.then(function (data) {
			//pull the sites from db for fresh info with updated site
			ctrl.$rootScope.getSites();
			// console.log(data);
		});
	}; //end updateSite

	ctrl.$rootScope.currentSite = function (siteid) {
		ctrl.$rootScope.csite = siteid;
	};

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
	ctrl.$rootScope.getSubnet = function (id) {
		ctrl.get = ipamService.getSubnets().get({ subnet: id });

		ctrl.get.$promise.then(function (data) {
			ctrl.$rootScope.subnet = data;
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
			"vLan": $('#vlanNumber').val(),
			"notes": $('#subnetNotes').val()

			// specific call to save from $resource
		};ipamService.addSubnet().save({}, ctrl.newSubnet).$promise
		// says wait for the data and push it to the array
		.then(function (data) {
			ctrl.$rootScope.subnets.push(data);
			ctrl.$rootScope.alert = data.message;
		}, function (error) {
			ctrl.$rootScope.alert = error.message;
		});
	};
	ctrl.$rootScope.updateSubnet = function (id) {

		// instantiate new site JSON
		ctrl.saveSubnet = {
			// grab values with JQuery from form
			"id": id,
			"site_id": $('#editSubnetSiteId').val(),
			"name": $('#editSubnetName').val(),
			"subnet_address": $('#editSubnetIpAddress').val(),
			"mask_bits": $('#editSubnetMaskBits').val(),
			"vLan": $('#editSubnetVlan').val()

			// specific call to save from $resource
		};ipamService.updateSubnet().update({ subnet: id }, ctrl.saveSubnet).$promise
		// says wait for the data and push it to the array
		.then(function (data) {
			//pull the sites from db for fresh info with updated site
			ctrl.$rootScope.getSubnets();
		});
	};
	// end getSubnets()
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
		ctrl.get = ipamService.getNextIp().get({ subnet: id });

		// pushes data to sites object, .then means we wait on the promise
		ctrl.get.$promise.then(function (data) {

			ctrl.$rootScope.NextIp = data;

			ctrl.length = Object.values(data).length;

			ctrl.$rootScope.NextIp = Object.values(ctrl.$rootScope.NextIp).join('').slice(0, ctrl.length - 2);

			// console.log('data');
			// console.log(Object.values(data).join('').slice(0, ctrl.length-2));

			// console.log('next');
			// console.log(ctrl.$rootScope.NextIp);
		});
	}; // end getNextUp()

	//Check ip input for availability
	ctrl.$rootScope.checkIp = function (id, ip) {
		ctrl.get = ipamService.checkIp().get({ subnet: id, checkIp: ip });
		ctrl.get.$promise.then(function (data) {});
	}; // end checkIp()

	/* ------------------------------------------------------
 						MAC ADDRESS
 ----------------------------------------------------------*/

	//Check if Mac Address is available
	ctrl.$rootScope.checkMac = function (address) {
		ipamService.checkMac().get({ mac: address }).$promise.then(function (data) {});
	}; //end checkMac

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
	ctrl.$rootScope.getEquipment = function (id) {
		ctrl.get = ipamService.getEquipments().get({ equipment: id });

		ctrl.get.$promise.then(function (data) {
			ctrl.$rootScope.equipment = data;
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
			"computer_type": $('#computerType').val(),
			"notes": $('#notesInput').val()

			// specific call to save from $resource
		};ipamService.addEquipment().save({}, ctrl.newEquipment).$promise
		// says wait for the data and push it to the array
		.then(function (data) {
			ctrl.$rootScope.equipments.push(data);
			ctrl.$rootScope.alert = data.message;
		}, function (error) {
			ctrl.$rootScope.alert = error.message;
		});
	}; //end equipments

	// ctrl.$rootScope.addEquipment();

	ctrl.$rootScope.getEquipmentTypes = function () {
		ipamService.getEquipmentTypes().query().$promise.then(function (data) {
			ctrl.$rootScope.equipmentTypes = data;
		});
	}; //end get eqiupment types

	ctrl.$rootScope.updateEquipment = function (id) {

		// instantiate new site JSON
		ctrl.saveEquipment = {
			// grab values with JQuery from form
			"id": id,
			"site_id": $('#editEquipmentSite').val(),
			"subnet_id": $('#subnetSelect').val(),
			"equipment_type_id": $('#editEquipmentType').val(),
			"name": $('#editEquipmentName').val(),
			"host_name": $('#editHostName').val(),
			"room_id": $('#editRoom_Id').val(),
			"serial_number": $('#editSerialNumber').val(),
			"mac_address": $('#editMacAddress').val(),
			"ip_address": $('#editEquipaddress').val(),
			"mab": $('#editMabBoxYes').val(),
			"switch_name": $('#editSwitchName').val(),
			"switch_ip": $('#editSwitchManagementIp').val(),
			"switch_room_number": $('#editSwitchRoomNumber').val(),
			"printer_server": $('#editPrinterServer').val(),
			"driver": $('#editDriverInput').val(),
			"printer_name": $('#editPrinterName').val(),
			"share_name": $('#editShareName').val(),
			"share_comment": $('#editShareComment').val(),
			"model": $('#editModelType').val(),
			"operating_system": $('#editOperatingSystem').val(),
			"computer_type": $('#editComputerType').val()
			// specific call to save from $resource
		};ipamService.updateEquipment().update({ equipment: id }, ctrl.saveEquipment).$promise
		// says wait for the data and push it to the array
		.then(function (data) {
			//pull the sites from db for fresh info with updated site
			ctrl.$rootScope.getEquipments();
		});
	}; //end quipments


	//run this function on page load to populate type list once
	ctrl.$rootScope.getEquipmentTypes();
} // end constructor
; // end appCtrl


exports.default = appCtrl;

},{}],3:[function(require,module,exports){
module.exports = "<nav></nav>\n<ng-view></ng-view> \n\n\n";

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

var _viewequipment = require('./components/equipment/viewequipment/viewequipment.component');

var _viewequipment2 = _interopRequireDefault(_viewequipment);

var _editequipment = require('./components/equipment/editequipment/editequipment.component');

var _editequipment2 = _interopRequireDefault(_editequipment);

var _editsubnet = require('./components/subnets/editsubnet/editsubnet.component');

var _editsubnet2 = _interopRequireDefault(_editsubnet);

var _viewsubnet = require('./components/subnets/viewsubnet/viewsubnet.component');

var _viewsubnet2 = _interopRequireDefault(_viewsubnet);

var _editsite = require('./components/sites/editsite/editsite.component');

var _editsite2 = _interopRequireDefault(_editsite);

var _viewsite = require('./components/sites/viewsite/viewsite.component');

var _viewsite2 = _interopRequireDefault(_viewsite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

angular.module('app', ['ngRoute', 'ngCookies', 'ngResource']).component('app', _app2.default).component('equipment', _equipment2.default).component('sites', _sites2.default).component('subnets', _subnets2.default).component('users', _users2.default).component('login', _login2.default).component('nav', _nav2.default).factory('ipamService', _appServices2.default).component('equipmentform', _equipmentform2.default).component('subnetform', _subnetform2.default).component('sidebar', _sidebar2.default).component('viewequipment', _viewequipment2.default).component('editequipment', _editequipment2.default).component('editsubnet', _editsubnet2.default).component('viewsubnet', _viewsubnet2.default).component('editsite', _editsite2.default).component('viewsite', _viewsite2.default).config(config).run(run);

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
    }).when('/viewsite', {
        templateUrl: 'app/components/sites/viewsite/viewsite.html'
    }).when('/sites', {
        controller: _sites2.default.controller,
        templateUrl: 'app/components/sites/sites.html',
        controllerAs: '$ctrl'

    }).when('/editsubnet', {
        templateUrl: 'app/components/subnets/editsubnet/editsubnet.html'
    }).when('/viewsubnet', {
        templateUrl: 'app/components/subnets/viewsubnet/viewsubnet.html'
    }).when('/subnets', {
        controller: _subnets2.default.controller,
        templateUrl: 'app/components/subnets/subnets.html',
        controllerAs: '$ctrl'

    }).when('/viewequipment', {
        templateUrl: 'app/components/equipment/viewequipment/viewequipment.html'
    }).when('/editequipment', {
        templateUrl: 'app/components/equipment/editequipment/editequipment.html'
    }).when('/equipment', {
        controller: _equipment2.default.controller,
        templateUrl: 'app/components/equipment/equipment.html',
        controllerAs: '$ctrl'

    }).when('/home', {
        controller: _sites2.default.controller,
        templateUrl: 'app/components/sites/sites.html',
        controllerAs: '$ctrl'

    }).otherwise({ redirectTo: '/sites' });
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

},{"./app.component":1,"./app.services.js":5,"./components/equipment/editequipment/editequipment.component":6,"./components/equipment/equipment.component":9,"./components/equipment/equipmentform/equipmentform.component":12,"./components/equipment/viewequipment/viewequipment.component":17,"./components/login/login.component":18,"./components/nav/nav.component":21,"./components/sidebar/sidebar.component":24,"./components/sites/editsite/editsite.component":27,"./components/sites/sites.component":30,"./components/sites/viewsite/viewsite.component":33,"./components/subnets/editsubnet/editsubnet.component":36,"./components/subnets/subnetform/subnetform.component":39,"./components/subnets/subnets.component":42,"./components/subnets/viewsubnet/viewsubnet.component":45,"./components/users/users.component":48}],5:[function(require,module,exports){
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
	var checkIp = function checkIp() {
		return $resource('http://localhost:7000/api/ip/:subnet/check/:checkIp', { subnet: "@subnet", checkIp: "@checkIp" });
	};

	// Mac Addresss endpoints
	var checkMac = function checkMac() {
		return $resource('http://localhost:7000/api/mac_address/:mac', { mac: "@mac" });
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
	var getEquipmentTypes = function getEquipmentTypes() {
		return $resource('http://localhost:7000/api/equipment_types');
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
		checkIp: checkIp,
		// MAC ADDRESS
		checkMac: checkMac,
		// EQUIPMENT
		getEquipments: getEquipments,
		addEquipment: addEquipment,
		updateEquipment: updateEquipment,
		getEquipmentTypes: getEquipmentTypes

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

var _editequipment = require('./editequipment.html');

var _editequipment2 = _interopRequireDefault(_editequipment);

var _editequipment3 = require('./editequipment.controller');

var _editequipment4 = _interopRequireDefault(_editequipment3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var editEquipmentComponent = {
	bindings: {},
	template: _editequipment2.default,
	controller: ['$rootScope', '$interval', _editequipment4.default],
	controllerAs: '$ctrl'
};

exports.default = editEquipmentComponent;

},{"./editequipment.controller":7,"./editequipment.html":8}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var editEquipmentController = function editEquipmentController($rootScope) {
	_classCallCheck(this, editEquipmentController);

	var ctrl = this;
};

exports.default = editEquipmentController;

},{}],8:[function(require,module,exports){
module.exports = "<form id=\"editEquipment\" name=\"editEquipment\">\n<div class=\"container main-center\">\n  <h1>Edit Equipment</h1>\n     <div class=\"form-group\" >\n          <label for=\"subnetSelect\" >Subnet</label>\n          <select class=\"form-control\" id=\"subnetSelect\" ng-dropdown required \">\n            <option ng-repeat=\"subnet in $ctrl.$rootScope.subnets\" value=\"{{subnet.id}}\">{{subnet.name}}</option>\n          </select>\n       </div>\n    <div class=\"form-group\">\n      <label for=\"editEquipmentType\">Equipment Type</label>\n        <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.equipment.equipment_type_id}}\" id=\"editEquipmentType\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"editEquipmentName\">Equipment Name</label>\n        <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.equipment.name}}\" id=\"editEquipmentName\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"editHostName\">Host Name</label>\n        <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.equipment.host_name}}\" id=\"editHostName\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"editRoom_Id\">Room Id</label>\n        <input class=\"form-control\" type=\"number\" value=\"{{$ctrl.$rootScope.equipment.room_id}}\" id=\"editRoom_Id\">\n    </div>\n     <div class=\"form-group\">\n      <label for=\"editSerialNumber\">Serial Number</label>\n        <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.equipment.serial_number}}\" id=\"editSerialNumber\">\n    </div>\n     <div class=\"form-group\">\n      <label for=\"editMacAddress\">Mac Address</label>\n        <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.equipment.mac_address}}\" id=\"editMacAddress\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"editEquipaddress\">Equipment Ip Address</label>\n        <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.equipment.ip_address}}\" id=\"editEquipaddress\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"editPrinterServer\">Printer Server</label>\n        <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.equipment.printer_server}}\" id=\"editPrinterServer\">\n    </div> \n    <div class=\"form-group\">\n      <label for=\"editDriverInput\">Driver</label>\n        <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.equipment.driver}}\" id=\"editDriverInput\">\n    </div>\n     <div class=\"form-group\">\n      <label for=\"editPrinterName\">Printer Name</label>\n        <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.equipment.printer_name}}\" id=\"editPrinterName\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"editShareName\">Share Name</label>\n        <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.equipment.share_name}}\" id=\"editShareName\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"editShareComment\">Share Comment</label>\n        <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.equipment.share_comment}}\" id=\"editShareComment\">\n    </div>\n\n    <div class=\"form-group\">\n      <label for=\"editModelType\">Model Type</label>\n        <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.equipment.model}}\" id=\"editModelType\">\n    </div>\n     <div class=\"form-group\">\n      <label for=\"editEquipmentNotes\">Notes</label>\n        <textarea class=\"form-control\" type=\"textarea\" value=\"\" id=\"editEquipmentNotes\" ></textarea>\n    </div>\n    <!-- <div class=\"clearfix\">\n      <a href=\"/#!/editequipment\"><button>Edit Equipment</button></a>\n      <a href=\"/#!/equipment\"><button>Cancel</button></a>\n    </div> -->\n    <div class=\"clearfix\">\n      <a href=\"#!/equipment\"><button class=\"btn btn-danger\">Cancel</button></a>\n      <a href=\"/#!/equipment\"><button class=\"btn btn-primary\">Save Equipment</button></a>\n    </div>\n</div>\n</form>";

},{}],9:[function(require,module,exports){
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

},{"./equipment.controller":10,"./equipment.html":11}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\">\n    <ul class=\"nav nav-tabs\"> <!-- Tabs -->\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" id=\"sitesTab\" value=\"sites\" href=\"#!/sites\">Sites</a>\n      </li>\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" id=\"subnetsTab\" href=\"#!/subnets\">Subnets</a>\n      </li>\n      <li class=\"nav-item\">\n        <a class=\"nav-link active\" id=\"equipmentTab\" href=\"#!/equipment\">Equipment</a>\n      </li>\n\n    </ul>\n        <sidebar class=\"col-6\"></sidebar>\n        <a href=\"/#!/equipmentform\" class=\"col-3 text-right\"><button id=\"addEquipment\">Add Equipment</button></a>\n  </div>  \n <!--  <div class=\"row\">\n    <sidebar class=\"col-9\"></sidebar> \n    <a href=\"/#!/equipmentform\" class=\"col-3\"><button id=\"addEquipment\"> Add Equipment</button></a>\n  </div> -->\n      <div class=\"alert alert-success text-center\" role=\"alert\" ng-if=\"$ctrl.$rootScope.alert !== ''\">{{$ctrl.$rootScope.alert}}</div>\n  <div class=\"row\">\n    <div class=\"col\">\n      <table class=\"table data lowz\">\n        <thead>\n          <tr>\n            <th>\n            <!-- ng-click for sortability and reversing sort with change of variable in the controller, the sortType refers to the data points i.e. site.NAME-->\n              <a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'name'\">\n                Name\n                <!-- ng-show based on both sortReverse and sortType to show an up and down arrow -->\n                <span ng-show=\"sortReverse && sortType == 'name'\" class=\"fa fa-caret-down\"></span>\n                <span ng-show=\"!sortReverse && sortType == 'name'\" class=\"fa fa-caret-up\"></span>\n              </a>\n            </th>\n            <th>\n              <a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'type[0].name'\">\n                Type\n                <span ng-show=\"sortReverse && sortType == 'type[0].name'\" class=\"fa fa-caret-down\"></span>\n                <span ng-show=\"!sortReverse && sortType == 'type[0].name'\" class=\"fa fa-caret-up\"></span>\n              </a>\n            </th>\n            <th>\n              <a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'host_name'\">\n                Hostname\n                <span ng-show=\"sortReverse && sortType == 'host_name'\" class=\"fa fa-caret-down\"></span>\n                <span ng-show=\"!sortReverse && sortType == 'host_name'\" class=\"fa fa-caret-up\"></span>\n              </a>\n            </th>\n            <th>\n              <a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = ''\">\n                Room Number\n                <span ng-show=\"sortReverse && sortType == ''\" class=\"fa fa-caret-down\"></span>\n                <span ng-show=\"!sortReverse && sortType == ''\" class=\"fa fa-caret-up\"></span>\n              </a>\n            </th>\n            <th>\n              <a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'ip_address'\">\n              IP Address\n                <span ng-show=\"sortReverse && sortType == 'ip_address'\" class=\"fa fa-caret-down\"></span>\n                <span ng-show=\"!sortReverse && sortType == 'ip_address'\" class=\"fa fa-caret-up\"></span>\n              </a>\n            </th>\n            <th>\n              <a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'mac_address'\">\n                MAC Address\n                <span ng-show=\"sortReverse && sortType == 'mac_address'\" class=\"fa fa-caret-down\"></span>\n                <span ng-show=\"!sortReverse && sortType == 'mac_address'\" class=\"fa fa-caret-up\"></span>\n              </a></th>\n              <th>\n                <a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'mab'\">\n                  MAB\n                  <span ng-show=\"sortReverse && sortType == 'mab'\" class=\"fa fa-caret-down\"></span>\n                  <span ng-show=\"!sortReverse && sortType == 'mab'\" class=\"fa fa-caret-up\"></span>\n                </a>\n              </th>\n              <th>\n                <a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'printer_server'\">\n                  Print Server\n                  <span ng-show=\"sortReverse && sortType == 'printer_server'\" class=\"fa fa-caret-down\"></span>\n                  <span ng-show=\"!sortReverse && sortType == 'printer_server'\" class=\"fa fa-caret-up\"></span>\n                </a>\n              </th>\n              <th>\n                <a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'driver'\">\n                  Driver\n                  <span ng-show=\"sortReverse && sortType == 'driver'\" class=\"fa fa-caret-down\"></span>\n                  <span ng-show=\"!sortReverse && sortType == 'driver'\" class=\"fa fa-caret-up\"></span>\n                </a>\n              </th>\n              <th>\n                <a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'printer_name'\">\n                  Printer Name\n                  <span ng-show=\"sortReverse && sortType == 'printer_name'\" class=\"fa fa-caret-down\"></span>\n                  <span ng-show=\"!sortReverse && sortType == 'printer_name'\" class=\"fa fa-caret-up\"></span>\n                </a>\n              </th>\n              <th>\n                <a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'share_name'\">\n                  Share Name\n                  <span ng-show=\"sortReverse && sortType == 'share_name'\" class=\"fa fa-caret-down\"></span>\n                  <span ng-show=\"!sortReverse && sortType == 'share_name'\" class=\"fa fa-caret-up\"></span>\n                </a>\n              </th>\n            </tr>\n          </thead>\n          <tbody>\n            <!-- repeating the data in equipments, filtering from the search bar with a variable in the $rootScope and also by the site ID from the checkboxes, tacks on a sorting option-->\n            <tr ng-repeat=\"equipment in $ctrl.$rootScope.equipments | filter: $ctrl.$rootScope.searchText | filter:$ctrl.$rootScope.filterByid | orderBy:sortType:sortReverse\">\n              <td class=\"pr-2\"><a href='/#!/viewequipment' ng-click=\"$ctrl.$rootScope.getEquipment(equipment.id) \">{{equipment.name}}</a></td>\n              <td class=\"pr-2\">{{equipment.type[0].name}}</td>\n              <td class=\"pr-2\">{{equipment.host_name}}</td>\n              <td class=\"pr-2\">ROOM NAME</td>\n              <td class=\"pr-2\">{{equipment.ip_address}}</td>\n              <td class=\"pr-2\">{{equipment.mac_address}}</td>\n              <td class=\"pr-2\">{{equipment.mab}}</td>\n              <td class=\"pr-2\">{{equipment.printer_server}}</td>\n              <td class=\"pr-2\">{{equipment.driver}}</td>\n              <td class=\"pr-2\">{{equipment.printer_name}}</td>\n              <td class=\"pr-2\">{{equipment.share_name}}</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n  </div>";

},{}],12:[function(require,module,exports){
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

},{"./equipmentform.controller":13,"./equipmentform.html":14}],13:[function(require,module,exports){
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

		ctrl.$rootScope.checkIp(ctrl.currentSubnetId, ctrl.ip);
	});

	$("#macAddress").focusout(function () {
		ctrl.mac = $("#macAddress").val();
		console.log(ctrl.mac);
		ctrl.$rootScope.checkMac(ctrl.mac);
	});

	$('#equipaddress').prop('disabled', true);

	$("#siteSelect").change(function () {
		ctrl.currentSiteId = $("#siteSelect")[0].value;
		ctrl.$rootScope.getSite(ctrl.currentSiteId);
	});

	//
	$("#subnetSelect").change(function () {
		ctrl.currentSubnetId = $("#subnetSelect")[0].value;
		console.log(ctrl.currentSubnetId);
		ctrl.$rootScope.getNextIp(ctrl.currentSubnetId);

		$('#equipaddress').prop('disabled', false);
	});

	ctrl.$rootScope.$watch('equipshow', function () {
		ctrl.equipshow = ctrl.$rootScope.equipshow;
	});
};

exports.default = equipmentformController;

},{}],14:[function(require,module,exports){
module.exports = "<form id=\"eqipForm\" name=\"equipmentForm\">\n  <div class=\"container main-center\">\n    <div class=\"form-group\">\n      <label for=\"siteSelect\">Site:</label>\n      <select class=\"form-control\" id=\"siteSelect\" ng-model=\"$ctrl.rootScope.site.name\" \" required>\n        <option ng-repeat=\"site in $ctrl.$rootScope.sites\" value=\"{{site.id}}\">{{site.name}}</option>\n      </select>\n    </div>\n    <div class=\"form-group\" >\n      <label for=\"subnetSelect\" >Subnet:</label>\n      <select class=\"form-control\" id=\"subnetSelect\" ng-dropdown required \">\n        <option value=\"none\">Select a Subnet</option>\n        <option ng-repeat=\"subnet in $ctrl.$rootScope.currentSubnets\" value=\"{{subnet.id}}\">{{subnet.name}}</option>\n      </select>\n    </div>\n    <div class=\"form-group\" >\n      <label for=\"typeSelect\">Type:</label>\n      <select id=\"typeId\" class=\"form-control\" ng-model=\"type.Select\" ng-dropdown ng-change=\"changeme()\" required >\n        <option>Select a Type:</option>\n        <option ng-repeat=\"type in $ctrl.$rootScope.equipmentTypes\" value=\"{{type.id}}\">{{type.name}}</option>\n      </select>\n      <!-- <option ng-repeat=\"equipment_type in $ctrl.$rootScope.equipment_types\" value=\"{{equipment_type.id}}\">{{equipment_type.name}}</option> -->\n    </div>\n    \n    <div class=\"form-group\">\n      <label for=\"equipmentName\">Equipment Name:</label>\n      <input class=\"form-control\" type=\"text\" id=\"equipmentName\" ng-pattern='/^[a-zA-Z][a-zA-Z0-9]*$/' required>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"hostName\">Host Name:</label>\n      <input class=\"form-control\" type=\"text\" id=\"hostName\" required>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"room_id\">Room Number:</label>\n      <input class=\"form-control\" type=\"number\" id=\"room_id\" required>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"serialNumber\">Serial Number:</label>\n      <input class=\"form-control\" type=\"text\" id=\"serialNumber\">\n\n    </div>\n    <label for=\"macAdress\">Mac Address:</label>\n    <input id=\"macAddress\" placeholder=\"xx-xx-xx-xx-xx\" placeholder=\"\" type=\"text\" name=\"macaddress\" ng-model=\"macpin\" ng-pattern=\"/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/\" />\n    <span style=\"color:Red\" ng-show=\"equipmentForm.macaddress.$error.pattern\">Please Enter a Valid Mac Address</span>\n    <br>\n    \n    <label for=\"ipaddress\">IP Address:</label>\n    <input id=\"equipaddress\" placeholder=\"Please Select A Site And Subnet\" type=\"text\" name=\"equipaddress\" ng-model=\"$ctrl.$rootScope.NextIp\" ng-pattern=\"/\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b/\" />\n    <span style=\"color:Red\" ng-show=\"equipmentForm.equipaddress.$error.pattern\">Please Enter a Valid IP Address</span>\n    <div class=\"form-check\">\n      <label class=\"form-check-label\">\n        <input class=\"form-check-input\" type=\"checkbox\" id=\"mabBoxYes\"\n        value=\"1\" required> MAB\n      </label>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"notesInput\">Notes:</label>\n      <textarea class=\"form-control\" type=\"textarea\" id=\"notesInput\"></textarea>\n    </div>\n    <!-- These will be additional fields -->\n    <div class=\"form-group\" ng-if=\"subnet.Select == 'true'; type.Select == 'switch'\">\n      <label for=\"switchName\">Switch Name:</label>\n\n      <input class=\"form-control\" type=\"text\" id=\"switchName\" required>\n      <label for=\"switchManagementIp\">Switch Management IP:</label>\n      <input class=\"form-control\" type=\"text\" id=\"switchManagementIp\" required>\n      <!-- Autofill from room number already entered -->\n      <label for=\"switchRoomNumber\">Switch Room Number:</label>\n      <input class=\"form-control\" type=\"number\" id=\"switchRoomNumber\" required>\n    </div>\n    <!-- Printer fields -->\n    <div class=\"container\" ng-if=\"type.Select =='1'\">\n        <div class=\"form-group\">\n          <label for=\"printServer\">Print Server:</label>\n          <input class=\"form-control\" type=\"text\" id=\"printServer\" required>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"driverInput\">Driver:</label>\n          <input class=\"form-control\" type=\"text\" id=\"driverInput\" required>\n        </div>\n        <!-- Need to autopopulate site abrev. & -room number -->\n        <div class=\"form-group\">\n          <label for=\"printerName\">Printer Name:</label>\n          <input class=\"form-control\" type=\"text\" id=\"printerName\" required>\n        </div>\n        <!-- Should autopopulate again -->\n        <div class=\"form-group\">\n          <label for=\"shareName\">Share Name:</label>\n          <input class=\"form-control\" type=\"text\" id=\"shareName\" required>\n        </div>\n        <!-- should autopopulate again -->\n        <div class=\"form-group\">\n          <label for=\"shareComment\">Share Comment:</label>\n          <input class=\"form-control\" type=\"text\" id=\"shareComment\" required>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"modelNumber\">Model Type:</label>\n          <input class=\"form-control\" type=\"text\" id=\"modelType\" required>\n        </div>\n      </div>\n      <!-- Computer Affitional Fields -->\n      <div  ng-if=\"type.Select =='2'\">\n        <div class=\"form-group\">\n          <label for=\"operatingSystem\">Operating System:</label>\n          <input class=\"form-control\" type=\"text\" id=\"operatingSystem\" required>\n        </div>\n        <div class=\"form-group\">\n          <label for=\"computerType\">Computer Type:</label>\n          <select class=\"form-control\" id=\"computerType\" required>\n            <option>Virtual Machine</option>\n            <option>Physical Computer</option>\n          </select>\n        </div>\n      </div>\n  \n\n\n  <!-- Printer fields -->\n    <div class=\"container\" ng-if=\"type.Select =='printer'\">\n      <div class=\"form-group\">\n        <label for=\"printServer\">Print Server</label>\n          <input class=\"form-control\" type=\"text\" id=\"printServer\" required>\n      </div>\n        <div class=\"form-group\">\n        <label for=\"driverInput\">Driver</label>\n          <input class=\"form-control\" type=\"text\" id=\"driverInput\" required>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"printServer\">Print Server</label>\n          <input class=\"form-control\" type=\"text\" id=\"printServer\" required>\n      </div>\n      <!-- Need to autopopulate site abrev. & -room number -->\n      <div class=\"form-group\">\n        <label for=\"printerName\">Printer Name</label>\n          <input class=\"form-control\" type=\"text\" id=\"printerName\" required>\n      </div> \n    <!-- Should autopopulate again -->\n     <div class=\"form-group\">\n        <label for=\"shareName\">Share Name</label>\n          <input class=\"form-control\" type=\"text\" id=\"shareName\" required>\n      </div>\n      <!-- should autopopulate again -->\n      <div class=\"form-group\">\n        <label for=\"shareComment\">Share Comment</label>\n          <input class=\"form-control\" type=\"text\" id=\"shareComment\" required>\n      </div>\n\n      <div class=\"form-group\">\n        <label for=\"modelNumber\">Model Number</label>\n          <input class=\"form-control\" type=\"number\" id=\"modelNumber\" required>\n      </div>\n      </div>\n      <!-- Computer Additional Fields -->\n      <div  ng-if=\"type.Select =='computer'\">\n      <div class=\"form-group\">\n        <label for=\"operatingSystem\">Operating System</label>\n          <input class=\"form-control\" type=\"text\" id=\"operatingSystem\" required>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"computerType\">Computer Type</label>\n          <select class=\"form-control\" id=\"computerType\" required>\n            <option>Virtual Machine</option>\n            <option>Physical Computer</option>\n          </select>\n      </div>\n      </div>\n      <div class=\"clearfix\">\n          <a href=\"/\" ng-click=\"$ctrl.$rootScope.dashboard = true\"><button class=\"btn btn-danger\">Cancel</button></a>\n          <button class=\"btn btn-primary\" type=\"submit\">Save Equipment</button>\n      </div>\n  </div>\n</form>\n\n\n\n\n\n\n";

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var viewEquipmentController = function viewEquipmentController($rootScope) {
	_classCallCheck(this, viewEquipmentController);

	var ctrl = this;
};

exports.default = viewEquipmentController;

},{}],16:[function(require,module,exports){
module.exports = "<form id=\"viewEquipment\" name=\"viewEquipmentForm\">\n<div class=\"container main-center\">\n  <h1>View Equipment</h1>   \n    <div class=\"form-group\">\n      <label for=\"editEquipmentSubnet\">Subnet ID</label>\n        <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.equipment.subnet_id}}\" id=\"editEquipmentSubnet\" disabled=\"\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"editEquipmentType\">Equipment Type</label>\n        <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.equipment.equipment_type_id}}\" id=\"editEquipmentType\" disabled=\"\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"editEquipmentName\">Equipment Name</label>\n        <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.equipment.name}}\" id=\"editEquipmentName\" disabled=\"\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"editHostName\">Host Name</label>\n        <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.equipment.host_name}}\" id=\"editHostName\" disabled=\"\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"editRoom_Id\">Room ID</label>\n        <input class=\"form-control\" type=\"number\" value=\"{{$ctrl.$rootScope.equipment.room_id}}\" id=\"editRoom_Id\" disabled=\"\"> \n    </div>\n     <div class=\"form-group\">\n      <label for=\"editSerialNumber\">Serial Number</label>\n        <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.equipment.serial_number}}\" id=\"editSerialNumber\" disabled=\"\">\n    </div>\n     <div class=\"form-group\">\n      <label for=\"editMacAddress\">Mac Address</label>\n        <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.equipment.mac_address}}\" id=\"editMacAddress\" disabled=\"\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"editEquipaddress\">Equipment Ip Address</label>\n        <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.equipment.ip_address}}\" id=\"editEquipaddress\" disabled=\"\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"editPrinterServer\">Printer Server</label>\n        <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.equipment.printer_server}}\" id=\"editPrinterServer\" disabled=\"\">\n    </div> \n    <div class=\"form-group\">\n      <label for=\"editDriverInput\">Driver</label>\n        <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.equipment.driver}}\" id=\"editDriverInput\" disabled=\"\">\n    </div>\n     <div class=\"form-group\">\n      <label for=\"editPrinterName\">Printer Name</label>\n        <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.equipment.printer_name}}\" id=\"editPrinterName\" disabled=\"\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"editShareName\">Share Name</label>\n        <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.equipment.share_name}}\" id=\"editShareName\" disabled=\"\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"editShareComment\">Share Comment</label>\n        <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.equipment.share_comment}}\" id=\"editShareComment\" disabled=\"\">\n    </div>\n\n    <div class=\"form-group\">\n      <label for=\"editModelType\">Model Type</label>\n        <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.equipment.model}}\" id=\"editModelType\" disabled=\"\">\n    </div>\n     <div class=\"form-group\">\n      <label for=\"editEquipmentNotes\">Notes</label>\n        <textarea class=\"form-control\" type=\"textarea\" value=\"\" id=\"editEquipmentNotes\"  disabled=\"\"></textarea>\n    </div>\n    <!-- <div class=\"clearfix\">\n      <a href=\"/#!/editequipment\"><button class=\"btn btn-primary\">Edit Equipment</button></a>\n      <a href=\"/#!/equipment\"><button class=\"btn btn-danger\">Cancel</button></a>\n    </div> -->\n    <div class=\"clearfix\">\n      <a href=\"#!/equipment\"><button class=\"btn btn-danger\">Cancel</button></a>\n      <a href=\"/#!/editequipment\"><button class=\"btn btn-primary\">Edit Equipment</button></a>\n    </div>\n</div>\n</form>";

},{}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _viewEquipment = require('./viewEquipment.html');

var _viewEquipment2 = _interopRequireDefault(_viewEquipment);

var _viewEquipment3 = require('./viewEquipment.controller');

var _viewEquipment4 = _interopRequireDefault(_viewEquipment3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var viewEquipmentComponent = {
	bindings: {},
	template: _viewEquipment2.default,
	controller: ['$rootScope', '$interval', _viewEquipment4.default],
	controllerAs: '$ctrl'
};

exports.default = viewEquipmentComponent;

},{"./viewEquipment.controller":15,"./viewEquipment.html":16}],18:[function(require,module,exports){
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

},{"./login.controller":19,"./login.html":20}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
module.exports = "\n<div id=\"login\" class=\"container\">\n\t<div class=\"jumbotron main-center\">\n\t\t<h3>Login</h3>\n\t\t<form name=\"form\" ng-submit=\"ctrl.login()\" role=\"form\" id=\"form-login\">\n\t\t  <div class=\"form-group\" ng-class=\"{ 'has-error': form.email.$dirty && form.email.$error.required }\">\n\t\t    <label>Email Address</label>\n\t\t    <input type=\"text\" name=\"email\" id=\"email\" class=\"form-control\" ng-model=\"ctrl.email\" required />\n\t\t    <span ng-show=\"form.email.$dirty && form.email.$error.required\" class=\"help-block\">Email is required</span>\n\t\t  </div>\n\t\t  <div class=\"form-group\" ng-class=\"{ 'has-error': form.password.$dirty && form.password.$error.required }\">\n            <label for=\"password\">Password</label>\n            <input type=\"password\" name=\"password\" id=\"password\" class=\"form-control\" ng-model=\"ctrl.password\" required />\n            <span ng-show=\"form.password.$dirty && form.password.$error.required\" class=\"help-block\">Password is required</span>\n        </div>\n        <div class=\"clearfix\">\n\t\t<button type=\"submit\" class=\"btn btn-success\" ng-disabled=\"form.$invalid || ctrl.dataLoading\">Submit</button>\n\t\t<button type=\"button\" class=\"btn btn-secondary\">Forgot Password?</button>\n\t\t</div>\n\t\t</form>\n\t</div>\n</div>";

},{}],21:[function(require,module,exports){
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

},{"./nav.controller":22,"./nav.html":23}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
module.exports = "<ul class=\"nav  navbar-light p-2 mb-2 topNav\">\n<div class=\"col\">\n    <div class=\"row\">\n\n      <li class=\"nav-item\">\n          <a class=\"navbar-brand ml-2\" href=\"/\"><img id=\"navlogo\" src=\"../../app/assets/images/ipamlogowhite.png\" alt=\"logo\"></a>\n      </li>\n     \n      <li id=\"tabs\" class=\"nav-item\">\n          <a class=\"nav-link disabled\" href=\"/\">Manage Users</a>\n      </li>\n\n        <li id=\"tabs\" class=\"nav-item some\" >\n          <a class=\"nav-link disabled\" href=\"/#!/login\">Logout</a>\n      </li>\n\n  </div>\n</div>\n\n</ul>\n\n\n\n\n";

},{}],24:[function(require,module,exports){
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

},{"./sidebar.controller":25,"./sidebar.html":26}],25:[function(require,module,exports){
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

    // ctrl.$rootScope.idIncludes = [];

    // ctrl.$rootScope.$watch('showTab', () => {
    //         ctrl.$rootScope.idIncludes = [];
    // });

    // ctrl.$rootScope.includeSite = function(id) {
    //     var i = $.inArray(id, ctrl.$rootScope.idIncludes);
    //     if (i > -1) {
    //         ctrl.$rootScope.idIncludes.splice(i, 1);
    //     } else {
    //         ctrl.$rootScope.idIncludes.push(id);
    //     }

    ctrl.firstTime = true;

    // }

    // ctrl.$rootScope.idFilter = function(site) {
    //     if (ctrl.$rootScope.idIncludes.length > 0) {
    //         if ($.inArray(site.site_id, ctrl.$rootScope.idIncludes) < 0)
    //             return;
    //     }
    //     // console.log(site);

    //     return site.site_id;
    // }
    // ctrl.$rootScope.firstCheck = (siteid, site) => {
    //     if (ctrl.firstTime == true){    
    //         angular.forEach(ctrl.$rootScope.sites, function(site) {              
    //             site.checked = false;
    //         });

    //         for(var j = 0; j<ctrl.$rootScope.sites.length; j++){
    //             if(ctrl.$rootScope.sites[j].id == siteid){
    //                 console.log("hello");
    //                 ctrl.$rootScope.sites[j].checked = true;
    //             }
    //         };
    //     }
    //     ctrl.firstTime = false;
    //     }

    ctrl.$rootScope.search = function (searchText) {
        var ctrl = _this;
        ctrl.$rootScope.searchText = searchText;
    };

    ctrl.$rootScope.preselect = function (siteid, site) {
        if (ctrl.$rootScope.csite > 0) {
            if (ctrl.$rootScope.csite == siteid) {
                site.checked = true;
                return site.checked;
            } else {
                site.checked = false;
                return site.checked;
            }
        } else {
            site.checked = false;
            return site.checked;
        }
    };
}

// Functions - Definitions


;

;

exports.default = sidebarController;

},{}],26:[function(require,module,exports){
module.exports = "<div class=\"container-fluid highz\">\n\t<div class=\"row\">\n\t\t<div class=\"col-9\">\n\t\t\t<input type=\"text\" id=\"searchText\" class=\"col\" placeholder=\"Keyword Search...\" ng-change=\"$ctrl.$rootScope.search($ctrl.$rootScope.searchText)\" ng-model=\"$ctrl.$rootScope.searchText\">\n\t\t</div>\n\t\t<div class=\"col-3\">\n\t\t\t<div class=\"dropdown\">\n\t\t\t\t<button class=\"btn btn-secondary dropdown-toggle\" type=\"button\" id=\"dropdownMenuButton\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Site Filter</button>\n\t\t\t\t<div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\">\n\t\t\t\t\t<span ng-repeat=\"site in $ctrl.$rootScope.sites\" class=\"dropdown-item\">\n\t\t\t\t\t\t<input type=\"checkbox\" value=\"site.id\" class=\"filterbox\" ng-checked=\"site.checked\" ng-init=\"$ctrl.$rootScope.preselect(site.id, site); $ctrl.$rootScope.prefilter()\" ng-click=\"$ctrl.$rootScope.checkit(site.id); $ctrl.$rootScope.firstCheck(site.id, site)\">\n\t\t\t\t\t\t{{site.name}}<br />\n\t\t\t\t\t</span> \n\t\t\t\t</div>\n\t\t\t</div> \n\t\t</div>\n\t</div>\n</div>";

},{}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _editsite = require('./editsite.html');

var _editsite2 = _interopRequireDefault(_editsite);

var _editsite3 = require('./editsite.controller');

var _editsite4 = _interopRequireDefault(_editsite3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var editSiteComponent = {
	bindings: {},
	template: _editsite2.default,
	controller: ['$rootScope', '$interval', _editsite4.default],
	controllerAs: '$ctrl'
};

console.log('editsite.component');

exports.default = editSiteComponent;

},{"./editsite.controller":28,"./editsite.html":29}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var editSiteController = function editSiteController($rootScope) {
	_classCallCheck(this, editSiteController);

	var ctrl = this;
};

exports.default = editSiteController;

},{}],29:[function(require,module,exports){
module.exports = "<form id=\"editSite\" name=\"editSite\">\n<div class=\"container main-center\">\n<h1>Edit Site</h1>\n  <div class=\"form-group\">\n    <label for=\"editSiteName\">Site Name</label>\n      <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.site.name}}\" id=\"editSiteName\" required>\n  </div>\n   <div class=\"form-group\">\n    <label for=\"editSiteAbbreviation\">Site Abbreviation</label>\n      <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.site.abbreviation}}\" id=\"editSiteAbbreviation\" required>\n  </div>\n   <div class=\"form-group\">\n    <label for=\"editSiteAddress\">Site Address</label>\n      <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.site.address}}\" id=\"editSiteAddress\" required>\n  </div>\n   <div class=\"form-group\">\n    <label for=\"editSiteContact\">Site Contact</label>\n      <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.site.site_contact}}\" id=\"editSiteContact\" >\n  </div>\n   <div class=\"form-group\">\n    <label for=\"editSiteNotes\">Notes</label>\n      <textarea class=\"form-control\" type=\"textarea\" value=\"\" id=\"editSiteNotes\" ></textarea>\n  </div>\n  <div class=\"clearfix\">\n    <a href=\"/#!/sites\"><button class=\"btn btn-danger\">Cancel</button></a>\n    <a href=\"/#!/sites\"><button class=\"btn btn-primary\">Save Changes</button></a>\n  </div>\n</div>\n</form>";

},{}],30:[function(require,module,exports){
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

},{"./sites.controller":31,"./sites.html":32}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sitesController = function sitesController($rootScope, $http) {
	_classCallCheck(this, sitesController);

	var ctrl = this;
	ctrl.$rootScope = $rootScope;
	ctrl.$rootScope.getSites();

	ctrl.$rootScope.csite = -1;
};

exports.default = sitesController;

},{}],32:[function(require,module,exports){
module.exports = "\r\n<div id=\"whole-page\" >\r\n\t<div class=\"container-fluid\">\r\n\t\t<ul class=\"nav nav-tabs\"> <!-- Tabs -->\r\n\t\t  <li class=\"nav-item\">\r\n\t\t    <a class=\"nav-link active\" id=\"sitesTab\" value=\"sites\" href=\"#!/sites\">Sites</a>\r\n\t\t  </li>\r\n\t\t  <li class=\"nav-item\">\r\n\t\t    <a class=\"nav-link\" id=\"subnetsTab\" href=\"#!/subnets\">Subnets</a>\r\n\t\t  </li>\r\n\t\t  <li class=\"nav-item\">\r\n\t\t    <a class=\"nav-link\" id=\"equipmentTab\" href=\"#!/equipment\">Equipment</a>\r\n\t\t  </li>\r\n\t\t</ul>\r\n\t</div>\r\n\t\t<div class=\"alert alert-success text-center\" role=\"alert\" ng-if=\"$ctrl.$rootScope.alert !== ''\">{{$ctrl.$rootScope.alert}}</div>\r\n\t<div class=\"row\">\r\n\t\t<div id=\"card-backdrop\" class=\"col-4\" ng-repeat=\"site in $ctrl.$rootScope.sites\">\r\n\t\t\t<a class=\"nav-link\" id=\"subnetsTab\" href=\"/#!/viewsite\" ng-click=\"$ctrl.$rootScope.getSite(site.id)\">\r\n\t\t\t<div id=\"card\" class=\"card card-block\" >\r\n\t\t\t\t<div id=\"title\" class=\"card-title\">\r\n\t\t\t\t\t\t<h4 id=\"name\" class=\"col-8\">{{site.name}}</h4>\r\n\t\t\t\t\t\t<h5 id=\"abbr\" class=\"col-4\">{{site.abbreviation}}</h5>\r\n\t\t\t\t</div>\r\n\t\t\t\t</a>\r\n\t\t\t\t<ul class=\"list-group list-group-flush\">\r\n\t\t\t\t\t<li id=\"address\" class=\"list-group-item\">Address: {{site.address}} </li>\r\n\t\t\t\t\t<li id=\"edit-site\" class=\"list-group-item btn\"><a href='/#!/subnets' ng-click=\"$ctrl.$rootScope.currentSite(site.id)\">View Subnets</a></li>\r\n\t\t\t\t</ul>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\r\n\r\n\r\n\r\n\t</div> <!-- end main row -->\r\n\r\n\r\n</div> <!-- end container -->\r\n\r\n";

},{}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _viewsite = require('./viewsite.html');

var _viewsite2 = _interopRequireDefault(_viewsite);

var _viewsite3 = require('./viewsite.controller');

var _viewsite4 = _interopRequireDefault(_viewsite3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var viewSiteComponent = {
	bindings: {},
	template: _viewsite2.default,
	controller: ['$rootScope', '$interval', _viewsite4.default],
	controllerAs: '$ctrl'
};

console.log('viewsite.component');

exports.default = viewSiteComponent;

},{"./viewsite.controller":34,"./viewsite.html":35}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var viewSiteController = function viewSiteController($rootScope) {
	_classCallCheck(this, viewSiteController);

	var ctrl = this;
};

exports.default = viewSiteController;

},{}],35:[function(require,module,exports){
module.exports = "<form id=\"viewSite\" name=\"viewSite\">\n<div class=\"container main-center\">\n<h1>View Site</h1>\n  <div class=\"form-group\">\n    <label for=\"editSiteName\">Site Name</label>\n      <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.site.name}}\" id=\"editSiteName\" disabled=\"\">\n  </div>\n   <div class=\"form-group\">\n    <label for=\"editSiteAbbreviation\">Site Abbreviation</label>\n      <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.site.abbreviation}}\" id=\"editSiteAbbreviation\" disabled=\"\">\n  </div>\n   <div class=\"form-group\">\n    <label for=\"editSiteAddress\">Site Address</label>\n      <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.site.address}}\" id=\"editSiteAddress\"  disabled=\"\">\n  </div>\n   <div class=\"form-group\">\n    <label for=\"editSiteContact\">Site Contact</label>\n      <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.site.site_contact}}\" id=\"editSiteContact\" disabled=\"\" >\n  </div>\n   <div class=\"form-group\">\n    <label for=\"editSiteNotes\">Notes</label>\n      <textarea class=\"form-control\" type=\"textarea\" value=\"\" id=\"editSiteNotes\"  disabled=\"\"></textarea>\n  </div>\n<div class=\"clearfix\">\n    <a href=\"/#!/sites\"><button class=\"btn btn-danger\">Cancel</button></a>\n    <a href=\"/#!/editsite\"><button class=\"btn btn-primary\">Edit Site</button></a>\n  </div>\n</div>\n</form>";

},{}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _editsubnet = require('./editsubnet.html');

var _editsubnet2 = _interopRequireDefault(_editsubnet);

var _editsubnet3 = require('./editsubnet.controller');

var _editsubnet4 = _interopRequireDefault(_editsubnet3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var editSubnetComponent = {
	bindings: {},
	template: _editsubnet2.default,
	controller: ['$rootScope', '$interval', _editsubnet4.default],
	controllerAs: '$ctrl'
};

exports.default = editSubnetComponent;

},{"./editsubnet.controller":37,"./editsubnet.html":38}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var editSubnetController = function editSubnetController($rootScope) {
	_classCallCheck(this, editSubnetController);

	var ctrl = this;
};

exports.default = editSubnetController;

},{}],38:[function(require,module,exports){
module.exports = "<form id=\"editSubnet\" name=\"editSubnet\">\n<div class=\"container main-center\">\n<h1>View Subnet</h1>\n  <div class=\"form-group\">\n    <label for=\"editSubnetName\">Subnet Name</label>\n      <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.subnet.name}}\" id=\"editSubnetName\" >\n  </div>\n   <div class=\"form-group\">\n    <label for=\"editSubnetSiteId\">Site Id</label>\n      <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.subnet.site_id}}\" id=\"editSubnetSiteId\" >\n  </div>\n   <div class=\"form-group\">\n    <label for=\"editSubnetIpAddress\">Subnet Ip Address</label>\n      <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.subnet.subnet_address}}\" id=\"editSubnetIpAddress\"  >\n  </div>\n   <div class=\"form-group\">\n    <label for=\"editSubnetMaskBits\">Subnet Mask Bits</label>\n      <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.subnet.mask_bits}}\" id=\"editSubnetMaskBits\"  >\n  </div>\n  <div class=\"form-group\">\n    <label for=\"editSubnetVlan\">Subnet vLan</label>\n      <input class=\"form-control\" type=\"number\" value=\"{{$ctrl.$rootScope.subnet.vLan}}\" id=\"editSubnetVlan\" >\n  </div>\n   <div class=\"form-group\">\n    <label for=\"editSubnetNotes\">Notes</label>\n      <textarea class=\"form-control\" type=\"textarea\" value=\"\" id=\"editSubnetNotes\"  ></textarea>\n  </div>\n  <div class=\"clearfix\">\n    <a href=\"/#!/subnets\"><button class=\"btn btn-danger\">Cancel</button></a>\n    <a href=\"/#!/editsubnet\"><button class=\"btn btn-primary\">Save Changes</button></a>\n  </div>\n</div>\n</form>";

},{}],39:[function(require,module,exports){
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

},{"./subnetform.controller":40,"./subnetform.html":41}],40:[function(require,module,exports){
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

},{}],41:[function(require,module,exports){
module.exports = "<form id=\"subnetForm\" name=\"subnetForm\">\n  <div class=\"container main-center\" >\n    <h1>Add A Subnet</h1>\n\n    <div class=\"\" >\n      <label for=\"siteSelect\">Sites:</label>\n      <select class=\"form-control form-inline mr-2\" id=\"siteSelect\" ng-model=\"site.Select\" \" required>\n        <option ng-repeat=\"site in $ctrl.$rootScope.sites\" value=\"{{site.id}}\">{{site.name}}</option>\n      </select>\n    </div>\n\n    <div >\n      <label for=\"subnetName\">Subnet Name:</label>\n      <input class=\"form-control form-inline\" type=\"text\" id=\"subnetName\" required>\n    </div>\n\n\n      <div >\n        <label for=\"subnetIpAddress\">Subnet Ip Address:</label>\n        <input id=\"subnetIpAddress\" placeholder=\"xx.xx.xx.xx\" type=\"text\" name=\"subnetIpAddress\" ng-model=\"ip\" ng-pattern=\"/\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b/\" />\n        <span style=\"color:Red\" ng-show=\"subnetForm.subnetIpAddress.$error.pattern\">Please Enter a Valid IP Address</span>\n      </div>\n\n      <div >\n        <label for=\"subnetMaskBits\">Subnet Mask Bits:</label>\n        <input class=\"form-control\" type=\"number\" id=\"subnetMaskBits\" required>\n      </div>\n\n\n      <div >\n        <label for=\"vlanNumber\">VLAN Number:</label>\n        <input class=\"form-control\" type=\"number\" id=\"vlanNumber\">\n      </div>\n\n      <div >\n        <label for=\"leaseTime\">Lease Time:</label>\n        <input class=\"form-control\" type=\"time\" id=\"leaseTime\">\n      </div>\n\n\n      <div >\n        <label for=\"subnetNotes\">Notes:</label>\n        <textarea class=\"form-control\" type=\"text\" id=\"subnetNotes\"></textarea>\n      </div>\n\n    <div class=\"clearfix\">\n      <a href=\"#!/subnets\" ><button class=\"btn btn-danger\">Cancel:</button></a>\n      <a href=\"#!/subnets\"><button ng-click=\"$ctrl.$rootScope.addSubnet()\" class=\"btn btn-primary\" type=\"submit\">Save Subnet</button></a>\n    </div>\n    \n  </div>\n</form>";

},{}],42:[function(require,module,exports){
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

},{"./subnets.controller":43,"./subnets.html":44}],43:[function(require,module,exports){
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

	ctrl.firstTime = true;

	ctrl.$rootScope.hiddenSubnets = [];

	// declaring a local variable to change the sorting method
	ctrl.sortReverse = false;

	ctrl.$rootScope.checkit = function (siteid) {
		if (ctrl.firstTime == true) {
			for (var i = ctrl.$rootScope.subnets.length - 1; i > -1; i--) {
				if (ctrl.$rootScope.subnets[i].site_id == siteid) {} else {
					ctrl.$rootScope.hiddenSubnets.push(ctrl.$rootScope.subnets[i]);
					ctrl.$rootScope.subnets.splice(i, 1);
				}
			}
			ctrl.firstTime = false;
		} else {
			var madeSwap = false;
			if (madeSwap == false) {
				for (var i = ctrl.$rootScope.subnets.length - 1; i > -1; i--) {
					if (ctrl.$rootScope.subnets[i].site_id == siteid) {
						ctrl.$rootScope.hiddenSubnets.push(ctrl.$rootScope.subnets[i]);
						ctrl.$rootScope.subnets.splice(i, 1);
						madeSwap = true;
					}
				}
			}
			if (madeSwap == false) {
				for (var i = ctrl.$rootScope.hiddenSubnets.length - 1; i > -1; i--) {
					if (ctrl.$rootScope.hiddenSubnets[i].site_id == siteid) {
						ctrl.$rootScope.subnets.push(ctrl.$rootScope.hiddenSubnets[i]);
						ctrl.$rootScope.hiddenSubnets.splice(i, 1);
						madeSwap = true;
					}
				}
			}
		}
	};

	ctrl.$rootScope.prefilter = function (siteid) {
		for (var i = ctrl.$rootScope.subnets.length - 1; i > -1; i--) {
			if (ctrl.$rootScope.subnets[i].site_id == ctrl.$rootScope.csite) {
				ctrl.firstTime = false;
			} else if (ctrl.$rootScope.csite > 1) {
				ctrl.$rootScope.hiddenSubnets.push(ctrl.$rootScope.subnets[i]);
				ctrl.$rootScope.subnets.splice(i, 1);
			} else {}
		}
	};
};

exports.default = subnetsController;

},{}],44:[function(require,module,exports){
module.exports = "<div id=\"subnets\" class=\"container-fluid\">\n\t<div class=\"row\">\n\t\t<ul class=\"nav nav-tabs\"> <!-- Tabs -->\n\t\t  <li class=\"nav-item\">\n\t\t    <a class=\"nav-link\" id=\"sitesTab\" value=\"sites\" href=\"#!/sites\">Sites</a>\n\t\t  </li>\n\t\t  <li class=\"nav-item\">\n\t\t    <a class=\"nav-link active\" id=\"subnetsTab\" href=\"#!/subnets\">Subnets</a>\n\t\t  </li>\n\t\t  <li class=\"nav-item\">\n\t\t    <a class=\"nav-link\" id=\"equipmentTab\" href=\"#!/equipment\">Equipment</a>\n\t\t  </li>\n\t\t</ul>\n\t\t\t\t<sidebar class=\"col-6\"></sidebar>\n\t\t\t\t<a href=\"/#!/subnetform\" class=\"col-3 text-right\"><button id=\"addSubnet\"> Add Subnet</button></a>\n\t</div>\t\n\t<div class=\"alert alert-success text-center\" role=\"alert\" ng-if=\"$ctrl.$rootScope.alert !== ''\">{{$ctrl.$rootScope.alert}}</div>\n\t<div class=\"row\">\n\t\t<div class= \"col\">\n\t\t\t<table class=\"data\">\n\t\t\t\t<thead>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<th>\n\t\t\t\t\t\t\t<!-- ng-click for sortability and reversing sort with change of variable in the controller, the sortType refers to the data points i.e. site.NAME -->\n\t\t\t\t\t\t\t<a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'name'\">\n\t\t\t\t\t\t\tName\n\t\t\t\t\t\t\t\t<!-- ng-show based on both sortReverse and sortType to show an up and down arrow -->\n\t\t\t\t\t\t\t\t<span ng-show=\"sortReverse && sortType == 'name'\" class=\"fa fa-caret-down\"></span>\n\t\t\t\t\t\t\t\t<span ng-show=\"!sortReverse && sortType == 'name'\" class=\"fa fa-caret-up\"></span>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</th>\n\t\t\t\t\t\t<th>\n\t\t\t\t\t\t\t<a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'site[0].name'\">\n\t\t\t\t\t\t\tSite Name\n\t\t\t\t\t\t\t\t<span ng-show=\"sortReverse && sortType == 'site[0].name'\" class=\"fa fa-caret-down\"></span>\n\t\t\t\t\t\t\t\t<span ng-show=\"!sortReverse && sortType == 'site[0].name'\" class=\"fa fa-caret-up\"></span>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</th>\n\t\t\t\t\t\t<th>\n\t\t\t\t\t\t\t<a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'subnet_address'\">\n\t\t\t\t\t\t\tSub Address\n\t\t\t\t\t\t\t\t<span ng-show=\"sortReverse && sortType == 'subnet_address'\" class=\"fa fa-caret-down\"></span>\n\t\t\t\t\t\t\t\t<span ng-show=\"!sortReverse && sortType == 'subnet_address'\" class=\"fa fa-caret-up\"></span>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</th>\n\t\t\t\t\t\t<th>\n\t\t\t\t\t\t\t<a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'mask_bits'\">\n\t\t\t\t\t\t\tMask Bits\n\t\t\t\t\t\t\t\t<span ng-show=\"sortReverse && sortType == 'mask_bits'\" class=\"fa fa-caret-down\"></span>\n\t\t\t\t\t\t\t\t<span ng-show=\"!sortReverse && sortType == 'mask_bits'\" class=\"fa fa-caret-up\"></span>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</th>\n\t\t\t\t\t\t<th>\n\t\t\t\t\t\t\t<a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'vLan'\">\n\t\t\t\t\t\t\tvLan\n\t\t\t\t\t\t\t\t<span ng-show=\"sortReverse && sortType == 'vLan'\" class=\"fa fa-caret-down\"></span>\n\t\t\t\t\t\t\t\t<span ng-show=\"!sortReverse && sortType == 'vLan'\" class=\"fa fa-caret-up\"></span>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</th>\n\t\t\t\t\t\t<th>\n\t\t\t\t\t\t\t<a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'lease_time'\">\n\t\t\t\t\t\t\tLease Time\n\t\t\t\t\t\t\t\t<span ng-show=\"sortReverse && sortType == 'lease_time'\" class=\"fa fa-caret-down\"></span>\n\t\t\t\t\t\t\t\t<span ng-show=\"!sortReverse && sortType == 'lease_time'\" class=\"fa fa-caret-up\"></span>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</th>\n\t\t\t\t\t\t<th>\n\t\t\t\t\t\t\t<a href=\"\" ng-click=\"sortReverse = !sortReverse; sortType = 'note[0].text'\">\n\t\t\t\t\t\t\tNotes\n\t\t\t\t\t\t\t\t<span ng-show=\"sortReverse && sortType == 'note[0].text'\" class=\"fa fa-caret-down\"></span>\n\t\t\t\t\t\t\t\t<span ng-show=\"!sortReverse && sortType == 'note[0].text'\" class=\"fa fa-caret-up\"></span>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</th>\n\t\t\t\t\t\t<th></th>\n\t\t\t\t\t</tr>\n\t\t\t\t</thead>\n\t\t\t\t<tbody>\n\t\t\t\t<!-- repeating the data in equipments, filtering from the search bar with a variable in the $rootScope and also by the site ID from the checkboxes, tacks on a sorting option-->\n\t\t\t\t\t<tr ng-repeat=\"subnet in $ctrl.$rootScope.subnets | filter: $ctrl.$rootScope.searchText | filter: $ctrl.$rootScope.filterById | orderBy:sortType:sortReverse\">\n\t\t\t\t\t\t<td class=\"pr-2\">{{subnet.name}}</td>\n\t\t\t\t\t\t<td class=\"pr-2\">{{subnet.site[0].name}}</td>\n\t\t\t\t\t\t<td class=\"pr-2\">{{subnet.subnet_address}}</td>\n\t\t\t\t\t\t<td class=\"pr-2\">{{subnet.mask_bits}}</td>\n\t\t\t\t\t\t<td class=\"pr-2\">{{subnet.vLan}}</td>\n\t\t\t\t\t\t<td class=\"pr-2\">{{subnet.lease_time}}</td>\n\t\t\t\t\t\t<td class=\"pr-2\">{{subnet.notes[0].text | limitTo: 50}}...</td>\n\t\t\t\t\t\t<td class=\"pr-2\"><li class=\"list-group-item btn\"><a href='/#!/viewsubnet' ng-click=\"$ctrl.$rootScope.getSubnet(subnet.id) \">View Subnet</a></li>\n\t\t\t\t\t</tr>\n\t\t\t\t</tbody>\n\t\t\t</table>\n\t\t</div>\n\t</div>\n</div>";

},{}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _viewsubnet = require('./viewsubnet.html');

var _viewsubnet2 = _interopRequireDefault(_viewsubnet);

var _viewsubnet3 = require('./viewsubnet.controller');

var _viewsubnet4 = _interopRequireDefault(_viewsubnet3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var viewSubnetComponent = {
	bindings: {},
	template: _viewsubnet2.default,
	controller: ['$rootScope', '$interval', _viewsubnet4.default],
	controllerAs: '$ctrl'
};

exports.default = viewSubnetComponent;

},{"./viewsubnet.controller":46,"./viewsubnet.html":47}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var viewSubnetController = function viewSubnetController($rootScope) {
	_classCallCheck(this, viewSubnetController);

	var ctrl = this;
};

exports.default = viewSubnetController;

},{}],47:[function(require,module,exports){
module.exports = "<form id=\"viewSubnet\" name=\"viewSubnet\">\n<div class=\"containte main-center\">\n<h1>View Subnet</h1> \n  <div class=\"form-group\">\n    <label for=\"editSubnetName\">Subnet Name</label>\n      <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.subnet.name}}\" id=\"editSiteName\" disabled=\"\">\n  </div>\n   <div class=\"form-group\">\n    <label for=\"editSubnetSiteId\">Site Id</label>\n      <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.subnet.site_id}}\" id=\"editSubnetSiteId\" disabled=\"\">\n  </div>\n   <div class=\"form-group\">\n    <label for=\"editSubnetIpAddress\">Subnet Ip Address</label>\n      <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.subnet.subnet_address}}\" id=\"editSubnetIpAddress\"  disabled=\"\">\n  </div>\n   <div class=\"form-group\">\n    <label for=\"editSubnetMaskBits\">Subnet Mask Bits</label>\n      <input class=\"form-control\" type=\"text\" value=\"{{$ctrl.$rootScope.subnet.mask_bits}}\" id=\"editSubnetMaskBits\" disabled=\"\" >\n  </div>\n  <div class=\"form-group\">\n    <label for=\"editSubnetVlan\">Subnet vLan</label>\n      <input class=\"form-control\" type=\"number\" value=\"{{$ctrl.$rootScope.subnet.vLan}}\" id=\"editSubnetVlan\" disabled=\"\">\n  </div>\n   <div class=\"form-group\">\n    <label for=\"editSiteNotes\">Notes</label>\n      <textarea class=\"form-control\" type=\"textarea\" value=\"\" id=\"editSiteNotes\"  disabled=\"\"></textarea>\n  </div>\n  <div class=\"clearfix\">\n    <a href=\"/#!/subnets\"><button class=\"btn btn-danger\">Cancel</button></a>\n    <a href=\"/#!/editsubnet\"><button class=\"btn btn-primary\">Edit Subnets</button></a>\n  </div>\n  </div>\n</form>";

},{}],48:[function(require,module,exports){
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

},{"./users.controller":49,"./users.html":50}],49:[function(require,module,exports){
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

},{}],50:[function(require,module,exports){
module.exports = "<div class=\"col-md-6 col-md-offset-3\">\n    <h2>Manage Users</h2>\n    <form name=\"form\" ng-submit=\"ctrl.user()\" role=\"form\">\n        <div class=\"form-group\" ng-class=\"{ 'has-error': form.firstName.$dirty && form.firstName.$error.required }\">\n            <label for=\"username\">First name</label>\n            <input type=\"text\" name=\"firstName\" id=\"firstName\" class=\"form-control\" ng-model=\"ctrl.user.firstName\" required />\n            <span ng-show=\"form.firstName.$dirty && form.firstName.$error.required\" class=\"help-block\">First name is required</span>\n        </div>\n        <div class=\"form-group\" ng-class=\"{ 'has-error': form.lastName.$dirty && form.lastName.$error.required }\">\n            <label for=\"username\">Last name</label>\n            <input type=\"text\" name=\"lastName\" id=\"Text1\" class=\"form-control\" ng-model=\"ctrl.user.lastName\" required />\n            <span ng-show=\"form.lastName.$dirty && form.lastName.$error.required\" class=\"help-block\">Last name is required</span>\n        </div>\n        <div class=\"form-group\" ng-class=\"{ 'has-error': form.username.$dirty && form.username.$error.required }\">\n            <label for=\"username\">Username</label>\n            <input type=\"text\" name=\"username\" id=\"username\" class=\"form-control\" ng-model=\"ctrl.user.username\" required />\n            <span ng-show=\"form.username.$dirty && form.username.$error.required\" class=\"help-block\">Username is required</span>\n        </div>\n        <div class=\"form-group\" ng-class=\"{ 'has-error': form.password.$dirty && form.password.$error.required }\">\n            <label for=\"password\">Password</label>\n            <input type=\"password\" name=\"password\" id=\"password\" class=\"form-control\" ng-model=\"ctrl.user.password\" required />\n            <span ng-show=\"form.password.$dirty && form.password.$error.required\" class=\"help-block\">Password is required</span>\n        </div>\n        <div class=\"form-actions\">\n            <button type=\"submit\" ng-disabled=\"form.$invalid || ctrl.dataLoading\" class=\"btn btn-primary\">Register</button>\n            \n            <a href=\"#!/login\" class=\"btn btn-link\">Cancel</a>\n        </div>\n    </form>\n</div>";

},{}]},{},[4]);
