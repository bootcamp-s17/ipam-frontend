import template from './login.html';
import controller from './login.controller';

let loginComponent = {
	bindings : {},
	template,
	controller: ['$rootScope', '$interval', controller],
	controllerAs : '$ctrl'
};


export default loginComponent;