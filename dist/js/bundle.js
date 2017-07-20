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

_app4.default.$inject = ['$rootScope', '$http', 'ipamService'];

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

var appCtrl = function appCtrl($rootScope, $http, ipamService) {
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
		});

		alert(id);
	};

	// ctrl.$rootScope.$watch('site', function() {
	// 	console.log(ctrl.$rootScope.site);
	// })

	// ipamService.getSites().save();


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
	}; // end getSubnets()

} // end constructor

; // end appCtrl

exports.default = appCtrl;

},{}],3:[function(require,module,exports){
module.exports = "\n<!-- <div ng-view></div>  -->\n<nav></nav>\n<tabboard></tabboard>\n<equipmentform></equipmentform>\n<subnetform></subnetform>\n\n\n";

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

var _nav = require('./components/nav/nav.component');

var _nav2 = _interopRequireDefault(_nav);

var _appServices = require('./app.services.js');

var _appServices2 = _interopRequireDefault(_appServices);

var _equipmentform = require('./components/equipment/equipmentform/equipmentform.component');

var _equipmentform2 = _interopRequireDefault(_equipmentform);

var _subnetform = require('./components/subnets/subnetform/subnetform.component');

var _subnetform2 = _interopRequireDefault(_subnetform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

angular.module('app', ['ngRoute', 'ngCookies', 'ngResource']).component('app', _app2.default).component('equipment', _equipment2.default).component('sites', _sites2.default).component('subnets', _subnets2.default).component('users', _users2.default).component('login', _login2.default).component('tabboard', _tabboard2.default).component('nav', _nav2.default).factory('ipamService', _appServices2.default).component('equipmentform', _equipmentform2.default).component('subnetform', _subnetform2.default).config(config).run(run);

config.$inject = ['$routeProvider', '$locationProvider'];
function config($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'app/components/tabboard/tabboard.html'
    }).when('/login', {
        templateUrl: 'app/components/login/login.html'
    }).when('/users', {
        templateUrl: 'app/components/users/users.html'
    }).otherwise({ redirectTo: '/login' });
}

run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
function run($rootScope, $location, $cookies, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookies.getObject('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['./components/login/login.html', '.components/users/users.html']) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
            $location.path('/login');
        }
    });
}

},{"./app.component":1,"./app.services.js":5,"./components/equipment/equipment.component":6,"./components/equipment/equipmentform/equipmentform.component":9,"./components/login/login.component":12,"./components/nav/nav.component":15,"./components/sites/sites.component":18,"./components/subnets/subnetform/subnetform.component":21,"./components/subnets/subnets.component":24,"./components/tabboard/tabboard.component":27,"./components/users/users.component":30}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});


function ipamService($resource) {

		return {
				getSites: function getSites() {
						return $resource('http://localhost:7000/api/sites/:site', { site: "@site" });
				},
				getSubnets: function getSubnets() {
						return $resource('http://localhost:7000/api/subnets/:subnet', { subnet: "@subnet" });
				}
				// addSite: () => $resource('http://localhost:7000/api/sites', {});
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
module.exports = "<!-- <button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#exampleModal\">\n  Launch demo modal\n</button>\n\n Modal\n div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"exampleModalLabel\">Modal title</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        ...\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n        <button type=\"button\" class=\"btn btn-primary\">Save changes</button>\n      </div>\n    </div>\n  </div>\n</div> -->\n\n<button id=\"addEquipment\" ng-click=\"$ctrl.click(); showme=true\"> Add Equipment</button>\n\n";

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
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var equipmentformController = function equipmentformController($rootScope) {
	_classCallCheck(this, equipmentformController);

	var ctrl = this;
	console.log('this is the equipmentformController');
	ctrl.equipshow = false;
	ctrl.$rootScope = $rootScope;
	ctrl.ip = /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/;

	ctrl.$rootScope.$watch('equipshow', function () {
		ctrl.equipshow = ctrl.$rootScope.equipshow;
	});
};

exports.default = equipmentformController;

},{}],11:[function(require,module,exports){
module.exports = "<form>\n<div class=\"container\" ng-show=\"$ctrl.equipshow\">\n<h1>These are all the required equipment fields</h1>\n  <div class=\"form-group\">\n    <label for=\"siteSelect\">Site</label>\n    <select class=\"form-control\" id=\"siteSelect\" ng-model=\"site.Select\" \" required>\n      <option ng-option value=\"false\"></option>\n      <option ng-option value=\"true\">Moon Campus</option>\n      <option ng-option value=\"true\">Earth Campus</option>\n    </select>\n  </div> \n\n      <div class=\"form-group\" >\n      <label for=\"subnetSelect\" >Subnet</label>\n      <select class=\"form-control\"  ng-dropdown required \">\n        <option ng-option value=\"false\">false</option>\n        <option ng-option value=\"true\">true</option>\n      </select>\n    </div>\n\n     <div class=\"form-group\" >\n      <label for=\"typeSelect\">Type</label>\n      <select class=\"form-control\" ng-model=\"type.Select\" ng-dropdown ng-change=\"changeme()\" required >\n        <option ng-option value=\"other\">Other</option>\n        <option ng-option value=\"printer\">Printer</option>\n        <option ng-option value=\"computer\">Computer</option>\n        <option ng-option value=\"switch\">Switch</option>\n      </select>\n    </div>\n \n\n  <div class=\"form-group\">\n    <label for=\"equipmentName\">Equipment Name</label>\n      <input class=\"form-control\" type=\"text\" id=\"equipmentName\" ng-pattern='/^[a-zA-Z][a-zA-Z0-9]*$/' required>\n  </div>\n\n  <div class=\"form-group\">\n    <label for=\"hostName\">Host Name</label>\n      <input class=\"form-control\" type=\"text\" id=\"hostName\" required>\n  </div>\n\n  <div class=\"form-group\">\n    <label for=\"roomNumber\">Room Number</label>\n      <input class=\"form-control\" type=\"number\" id=\"roomNumber\" required>\n  </div>\n\n  <div class=\"form-group\">\n    <label for=\"serialNumber\">Serial Number</label>\n      <input class=\"form-control\" type=\"text\" id=\"serialNumber\">\n  </div>\n\n  <div class=\"form-group\">\n    <label for=\"macAdress\">MAC Number</label>\n      <input class=\"form-control\" type=\"number\" id=\"macAdress\" required>\n  </div>\n\n  <div class=\"form-group\">\n    <label for=\"ipAdress\">IP Adress</label>\n      <input placeholder=\"xxx.xxx.xxx.xxx\" class=\"form-control\" type=\"text\" id=\"ipAdress\" ng-pattern='$ctrl.ip'  required>\n  <p ng-show='myform.ip.$invalid'>Error</p>\n  </div>\n\n  <div class=\"form-check\">\n    <label class=\"form-check-label\">\n      <input class=\"form-check-input\" type=\"checkbox\" id=\"madBoxYes\"\n      value=\"option1\" required> MAB\n    </label>\n  </div>\n\n  <div class=\"form-group\">\n    <label for=\"notesInput\">Notes</label>\n      <input class=\"form-control\" type=\"textarea\" id=\"notesInput\" >\n  </div>\n\n  <h1>These are all the additional equipment fields for printers and computers</h1>\n  <!-- These will be additional fields -->\n  <div class=\"form-group\" ng-if=\"subnet.Select == 'true'; type.Select == 'switch'\">\n    <label for=\"switchName\">Switch Name</label>\n      <input class=\"form-control\" type=\"text\" id=\"switchName\" required>\n    <label for=\"switchManagementIp\">Switch Management IP</label>\n      <input class=\"form-control\" type=\"text\" id=\"switchManagementIp\" required>\n      <!-- Autofill from room number already entered -->\n    <label for=\"switchRoomNumber\">Switch Room Number</label>\n      <input class=\"form-control\" type=\"number\" id=\"switchRoomNumber\" required>\n  </div>\n\n  <!-- Printer fields -->\n<div class=\"container\" ng-if=\"type.Select =='printer'\">\n  <div class=\"form-group\">\n    <label for=\"printServer\">Print Server</label>\n      <input class=\"form-control\" type=\"text\" id=\"printServer\" required>\n  </div>\n    <div class=\"form-group\">\n    <label for=\"driverInput\">Driver</label>\n      <input class=\"form-control\" type=\"text\" id=\"driverInput\" required>\n  </div>\n  <div class=\"form-group\">\n    <label for=\"printServer\">Print Server</label>\n      <input class=\"form-control\" type=\"text\" id=\"printServer\" required>\n  </div>\n  <!-- Need to autopopulate site abrev. & -room number -->\n  <div class=\"form-group\">\n    <label for=\"printerName\">Printer Name</label>\n      <input class=\"form-control\" type=\"text\" id=\"printerName\" required>\n  </div> \n<!-- Should autopopulate again -->\n <div class=\"form-group\">\n    <label for=\"shareName\">Share Name</label>\n      <input class=\"form-control\" type=\"text\" id=\"shareName\" required>\n  </div>\n  <!-- should autopopulate again -->\n  <div class=\"form-group\">\n    <label for=\"shareComment\">Share Comment</label>\n      <input class=\"form-control\" type=\"text\" id=\"shareComment\" required>\n  </div>\n\n  <div class=\"form-group\">\n    <label for=\"modelNumber\">Model Number</label>\n      <input class=\"form-control\" type=\"number\" id=\"modelNumber\" required>\n  </div>\n  </div>\n  <!-- Computer Affitional Fields -->\n  <div  ng-if=\"type.Select =='computer'\">\n  <div class=\"form-group\">\n    <label for=\"operatingSystem\">Operating System</label>\n      <input class=\"form-control\" type=\"text\" id=\"operatingSystem\" required>\n  </div>\n  <div class=\"form-group\">\n    <label for=\"computerType\">Computer Type</label>\n      <select class=\"form-control\" id=\"computerType\" required>\n        <option>Virtual Machine</option>\n        <option>Physical Computer</option>\n      </select>\n  </div>\n  </div>\n<button class=\"btn btn-primary\" type=\"submit\">Save Equipment</button>\n</div>\n</form>\n\n <script src=\"./node_modules/ng-ip-address/ngIpAddress.vanilla.min.js\"></script>\n";

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

},{"./sites.controller":19,"./sites.html":20}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
module.exports = "\r\n<div class=\"container\">\r\n\t<div class=\"row\">\r\n\t\t<div  class=\"col-4\" ng-repeat=\"site in $ctrl.$rootScope.sites\">\r\n\t\t\t<div class=\"card card-block\" >\r\n\t\t\t\t<div class=\"card-title\">\r\n\t\t\t\t\t\t<h4 class=\"col-8\" ng-click=\"$ctrl.$rootScope.getSite(site.id)\">{{site.name}}</h4>\r\n\t\t\t\t\t\t<h5 class=\"col-4\">{{site.abbreviation}}</h5>\r\n\t\t\t\t</div>\r\n\t\t\t\t<ul class=\"list-group list-group-flush\">\r\n\t\t\t\t\t<li class=\"list-group-item\">Address: {{site.address}} </li>\r\n\t\t\t\t\t<li class=\"list-group-item\">Contact: {{site.site_contact}} </li>\r\n\t\t\t\t</ul>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<div class=\"col-4\">\r\n\t\t\t<div class=\"card card-block\">\r\n\t\t\t\t<div class=\"card-title\">\r\n\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t<h4 class=\"col text-center\">Add New Site</h4>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t<div class=\"col text-center\">\r\n\t\t\t\t\t\t\r\n\t\t\t\t<a ng-click=\"$ctrl.addNewSite()\" class=\"text-center\"><i class=\"fa fa-plus fa-5x text-center\"></i></a>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\r\n\r\n\t</div> <!-- end main row -->\r\n\r\n\r\n</div> <!-- end container -->\r\n\r\n";

},{}],21:[function(require,module,exports){
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

},{"./subnetform.controller":22,"./subnetform.html":23}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
module.exports = "<form>\n<div class=\"container \" ng-show=\"$ctrl.subshow\">\n<div class=\"form-inline \">\n  <div >\n      <label for=\"siteSelect\">Sites</label>\n      <select class=\"form-control form-inline mr-2\" id=\"siteSelect\" required>\n        <option></option>\n        <option>Moon Campus</option>\n        <option>Earth Campus</option>\n      </select>\n    </div>\n    <div >\n      <label for=\"subnetName\">Subnet Name</label>\n        <input class=\"form-control form-inline\" type=\"text\" id=\"subnetName\" required>\n    </div>\n</div>\n<div >\n  <div >\n    <label for=\"subnetIpAdress\">Subnet Ip Adress</label>\n      <input class=\"form-control\" type=\"text\" id=\"subnetIpAdress\" required>\n  </div>\n  <div >\n    <label for=\"subnetMaskBits\">Subnet Mask Bits</label>\n      <input class=\"form-control\" type=\"number\" id=\"subnetMaskBits\" required>\n  </div>\n</div>\n<div >\n  <div >\n    <label for=\"vlanNumber\">VLAN Number</label>\n      <input class=\"form-control\" type=\"number\" id=\"vlanNumber\">\n  </div>\n  <div >\n    <label for=\"leaseTime\">Lease Time</label>\n      <input class=\"form-control\" type=\"time\" id=\"leaseTime\">\n  </div>\n</div>\n<div >\n  <div >\n    <label for=\"subnetNotes\">Notes</label>\n      <input class=\"form-control\" type=\"text\" id=\"subnetNotes\">\n  </div>\n</div>\n\n  <button class=\"btn btn-primary\" type=\"submit\">Save Subnet</button></form>\n</div>";

},{}],24:[function(require,module,exports){
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

},{"./subnets.controller":25,"./subnets.html":26}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
module.exports = "\n<button id=\"addSubnet\" ng-click=\"$ctrl.subnet(); showme=true\">Add Subnet</button>\n<ul>\n\t<li ng-repeat=\"subnet in $ctrl.$rootScope.subnets\">{{subnet.name}}</li>\n</ul>\n\n";

},{}],27:[function(require,module,exports){
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

},{"./tabboard.controller":28,"./tabboard.html":29}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
module.exports = "<h1>Tab Board</h1>\n\n<ul class=\"nav nav-tabs\"> <!-- Tabs -->\n  <li class=\"nav-item\">\n    <a class=\"nav-link active\" id=\"sitesTab\" value=\"sites\" ng-click=\"$ctrl.switchTabView($event)\" href=\"#\">Sites</a>\n  </li>\n  <li class=\"nav-item\">\n    <a class=\"nav-link\" id=\"subnetsTab\" ng-click=\"$ctrl.switchTabView($event)\" href=\"#\">Subnets</a>\n  </li>\n  <li class=\"nav-item\">\n    <a class=\"nav-link\" id=\"equipmentTab\" ng-click=\"$ctrl.switchTabView($event)\" href=\"#\">Equipment</a>\n  </li>\n</ul> <!-- End Tabs -->\n\n<sites ng-show=\"$ctrl.showTab == 'sites'\"></sites>\n<subnets ng-show=\"$ctrl.showTab == 'subnets'\"></subnets>\n<equipment ng-show=\"$ctrl.showTab == 'equipment'\"></equipment>";

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
