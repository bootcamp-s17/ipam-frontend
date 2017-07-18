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

_app4.default.$inject = ['$rootScope', '$interval'];

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

var appCtrl = function appCtrl() {
	_classCallCheck(this, appCtrl);

	var ctrl = this;
};

exports.default = appCtrl;

},{}],3:[function(require,module,exports){
module.exports = "<!DOCTYPE html>\n<html ng-app=\"app\">\n<head>\n    <title>IPAM</title>\n</head>\n<body>\n    <div class=\"jumbotron\">\n        <div class=\"container\">\n        <h1>Hi</h1>\n            <div class=\"col-sm-8 col-sm-offset-2\">\n                <div ng-class=\"{ 'alert': flash, 'alert-success': flash.type === 'success', 'alert-danger': flash.type === 'error' }\" ng-if=\"flash\" ng-bind=\"flash.message\"></div>\n                <div ng-view></div>\n            </div>\n        </div>\n    </div>\n    <login></login>\n    <users></users>\n\n    <script src=\"//code.jquery.com/jquery-3.1.1.min.js\"></script>\n    <script src=\"//code.angularjs.org/1.6.0/angular.min.js\"></script>\n    <script src=\"//code.angularjs.org/1.6.0/angular-route.min.js\"></script>\n    <script src=\"//code.angularjs.org/1.6.0/angular-cookies.min.js\"></script>\n\n    <script src=\"app.js\"></script>\n    <script src=\"login/services/authentication.service.js\"></script>\n    <script src=\"login/services/flash.service.js\"></script>\n\n    <!-- Real user service that uses an api -->\n    <!-- <script src=\"app-services/user.service.js\"></script> -->\n\n    <!-- Fake user service for demo that uses local storage -->\n    <script src=\"login/services/user.service.local.js\"></script>\n\n    <script src=\"tabboard/tabboard.controller.js\"></script>\n    <script src=\"login/login.controller.js\"></script>\n    <script src=\"users/users.controller.js\"></script>\n</body>\n</html>\n\n";

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

angular.module('app', []).component('app', _app2.default).component('equipment', _equipment2.default).component('sites', _sites2.default).component('subnets', _subnets2.default).component('users', _users2.default).component('login', _login2.default).component('tabboard', _tabboard2.default).component('nav', _nav2.default);

},{"./app.component":1,"./components/equipment/equipment.component":5,"./components/login/login.component":8,"./components/nav/nav.component":11,"./components/sites/sites.component":14,"./components/subnets/subnets.component":17,"./components/tabboard/tabboard.component":20,"./components/users/users.component":23}],5:[function(require,module,exports){
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

console.log('equipment.component');

exports.default = equipmentComponent;

},{"./equipment.controller":6,"./equipment.html":7}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var equipmentController = function equipmentController($rootScope) {
	_classCallCheck(this, equipmentController);

	var ctrl = this;
};

exports.default = equipmentController;

},{}],7:[function(require,module,exports){
module.exports = "<h1>this is the equipment html</h1>";

},{}],8:[function(require,module,exports){
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

console.log('login.component');

exports.default = loginComponent;

},{"./login.controller":9,"./login.html":10}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
module.exports = "\n<div class=\"container\">\n\t<div class=\"jumbotron\">\n\t\t<h3>Login</h3>\n\t\t<form name=\"form\" ng-submit=\"vm.login()\" role=\"form\" id=\"form-login\">\n\t\t  <div class=\"form-group\" ng-class=\"{ 'has-error': form.email.$dirty && form.email.$error.required }\">\n\t\t    <label>Email Address</label>\n\t\t    <input type=\"text\" name=\"email\" id=\"email\" class=\"form-control\" ng-model=\"ctrl.email\" required />\n\t\t    <span ng-show=\"form.email.$dirty && form.email.$error.required\" class=\"help-block\">Email is required</span>\n\t\t  </div>\n\t\t  <div class=\"form-group\" ng-class=\"{ 'has-error': form.password.$dirty && form.password.$error.required }\">\n            <label for=\"password\">Password</label>\n            <input type=\"password\" name=\"password\" id=\"password\" class=\"form-control\" ng-model=\"ctrl.password\" required />\n            <span ng-show=\"form.password.$dirty && form.password.$error.required\" class=\"help-block\">Password is required</span>\n        </div>\n        <div class=\"form-actions\">\n\t\t<button type=\"submit\" class=\"btn btn-success\" ng-disabled=\"form.$invalid || ctrl.dataLoading\">Submit</button>\n\t\t<button type=\"button\" class=\"btn btn-secondary\">Forgot Password?</button>\n\t\t</div>\n\t\t</form>\n\t</div>\n</div>";

},{}],11:[function(require,module,exports){
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

console.log('nav.component');

exports.default = navComponent;

},{"./nav.controller":12,"./nav.html":13}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
module.exports = "<ul class=\"nav nav-tabs  navbar-light\" style=\"background-color: #DDD;\">\n  <li class=\"nav-item\">\n    <a class=\"navbar-brand\" href=\"../login/login.html\">IPAM</a>\n  </li>\n  <li class=\"nav-item\">\n    <a class=\"nav-link\" href=\"../../app.html\">Dashboard</a>\n  </li>\n  <li class=\"nav-item\">\n    <a class=\"nav-link disabled\" href=\"../users/users.html\">Manage Users</a>\n  </li>\n  <li class=\"nav-item\">\n    <a class=\"nav-link\" href=\"../login/login.html\">Logout</a>\n  </li>\n</ul>\n\n";

},{}],14:[function(require,module,exports){
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

console.log('sites.component');

exports.default = sitesComponent;

},{"./sites.controller":15,"./sites.html":16}],15:[function(require,module,exports){
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
		ctrl.$http = $http;

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

},{}],16:[function(require,module,exports){
module.exports = "\r\n<div class=\"container\">\r\n\t<div class=\"row\">\r\n\t\t<div class=\"col-4\">\r\n\t\t\t<div class=\"card card-block\">\r\n\t\t\t\t<div class=\"card-title\">\r\n\t\t\t\t\t\t<h4 class=\"col-8\">Site Name</h4>\r\n\t\t\t\t\t\t<h5 class=\"col-4\">ABBR</h5>\r\n\t\t\t\t</div>\r\n\t\t\t\t<ul class=\"list-group list-group-flush\">\r\n\t\t\t\t\t<li class=\"list-group-item\">Address:</li>\r\n\t\t\t\t\t<li class=\"list-group-item\">Contact:</li>\r\n\t\t\t\t\t<li class=\"list-group-item\">Notes</li>\r\n\t\t\t\t</ul>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\t\t<div class=\"col-4\">\r\n\t\t\t<div class=\"card card-block\">\r\n\t\t\t\t<div class=\"card-title\">\r\n\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t<h4 class=\"col-8\">Site Name</h4>\r\n\t\t\t\t\t\t<h5 class=\"col-4\">ABBR</h5>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t<div class=\"col\">Address</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t<div class=\"col\">Contact</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t<div class=\"col\">Notes</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\r\n\t\t<div class=\"col-4\">\r\n\t\t\t<div class=\"card card-block\">\r\n\t\t\t\t<div class=\"card-title\">\r\n\t\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t\t<h4 class=\"col text-center\">Add New Site</h4>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div class=\"row\">\r\n\t\t\t\t\t<div class=\"col text-center\">\r\n\t\t\t\t\t\t\r\n\t\t\t\t<a ng-click=\"$ctrl.addNewSite()\" class=\"text-center\"><i class=\"fa fa-plus fa-5x text-center\"></i></a>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\r\n\r\n\r\n\t</div> <!-- end main row -->\r\n\r\n\r\n</div> <!-- end container -->\r\n\r\n";

},{}],17:[function(require,module,exports){
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
	controller: ['$rootScope', '$interval', _subnets4.default],
	controllerAs: '$ctrl'
};

console.log('subnets.component');

exports.default = subnetsComponent;

},{"./subnets.controller":18,"./subnets.html":19}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var subnetsController = function subnetsController($rootScope) {
	_classCallCheck(this, subnetsController);

	var ctrl = this;
};

exports.default = subnetsController;

},{}],19:[function(require,module,exports){
module.exports = "";

},{}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _tabboard = require('./tabboard.html');

var _tabboard2 = _interopRequireDefault(_tabboard);

var _tabboard3 = require('./tabboard.controller');

var _tabboard4 = _interopRequireDefault(_tabboard3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_tabboard4.default);

var tabboardComponent = {
	bindings: {},
	template: _tabboard2.default,
	controller: ['$rootScope', '$interval', _tabboard4.default],
	controllerAs: '$ctrl'
};

console.log('tabboard.component');

exports.default = tabboardComponent;

},{"./tabboard.controller":21,"./tabboard.html":22}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

console.log('tab controller is called');

var tabboardController = function () {
	function tabboardController($rootScope) {
		_classCallCheck(this, tabboardController);

		var ctrl = this;
		console.log('tab constructor is called');
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
		}
	}]);

	return tabboardController;
}();

exports.default = tabboardController;

},{}],22:[function(require,module,exports){
module.exports = "<h1>Tab Board</h1>\n\n<ul class=\"nav nav-tabs\"> <!-- Tabs -->\n  <li class=\"nav-item\">\n    <a class=\"nav-link active\" id=\"sitesTab\" value=\"sites\" ng-click=\"$ctrl.switchTabView($event)\" href=\"#\">Sites</a>\n  </li>\n  <li class=\"nav-item\">\n    <a class=\"nav-link\" id=\"subnetsTab\" ng-click=\"$ctrl.switchTabView($event)\" href=\"#\">Subnets</a>\n  </li>\n  <li class=\"nav-item\">\n    <a class=\"nav-link\" id=\"equipmentTab\" ng-click=\"$ctrl.switchTabView($event)\" href=\"#\">Equipment</a>\n  </li>\n</ul> <!-- End Tabs -->\n\n<sites ng-show=\"$ctrl.showTab == 'sites'\"></sites>\n<subnets ng-show=\"$ctrl.showTab == 'subnets'\"></subnets>\n<equipment ng-show=\"$ctrl.showTab == 'equipment'\"></equipment>";

},{}],23:[function(require,module,exports){
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

console.log('users.component');

exports.default = usersComponent;

},{"./users.controller":24,"./users.html":25}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
module.exports = "<div class=\"col-md-6 col-md-offset-3\">\n    <h2>Manage Users</h2>\n    <form name=\"form\" ng-submit=\"ctrl.user()\" role=\"form\">\n        <div class=\"form-group\" ng-class=\"{ 'has-error': form.firstName.$dirty && form.firstName.$error.required }\">\n            <label for=\"username\">First name</label>\n            <input type=\"text\" name=\"firstName\" id=\"firstName\" class=\"form-control\" ng-model=\"ctrl.user.firstName\" required />\n            <span ng-show=\"form.firstName.$dirty && form.firstName.$error.required\" class=\"help-block\">First name is required</span>\n        </div>\n        <div class=\"form-group\" ng-class=\"{ 'has-error': form.lastName.$dirty && form.lastName.$error.required }\">\n            <label for=\"username\">Last name</label>\n            <input type=\"text\" name=\"lastName\" id=\"Text1\" class=\"form-control\" ng-model=\"ctrl.user.lastName\" required />\n            <span ng-show=\"form.lastName.$dirty && form.lastName.$error.required\" class=\"help-block\">Last name is required</span>\n        </div>\n        <div class=\"form-group\" ng-class=\"{ 'has-error': form.username.$dirty && form.username.$error.required }\">\n            <label for=\"username\">Username</label>\n            <input type=\"text\" name=\"username\" id=\"username\" class=\"form-control\" ng-model=\"ctrl.user.username\" required />\n            <span ng-show=\"form.username.$dirty && form.username.$error.required\" class=\"help-block\">Username is required</span>\n        </div>\n        <div class=\"form-group\" ng-class=\"{ 'has-error': form.password.$dirty && form.password.$error.required }\">\n            <label for=\"password\">Password</label>\n            <input type=\"password\" name=\"password\" id=\"password\" class=\"form-control\" ng-model=\"ctrl.user.password\" required />\n            <span ng-show=\"form.password.$dirty && form.password.$error.required\" class=\"help-block\">Password is required</span>\n        </div>\n        <div class=\"form-actions\">\n            <button type=\"submit\" ng-disabled=\"form.$invalid || ctrl.dataLoading\" class=\"btn btn-primary\">Register</button>\n            \n            <a href=\"#!/login\" class=\"btn btn-link\">Cancel</a>\n        </div>\n    </form>\n</div>";

},{}]},{},[4]);
