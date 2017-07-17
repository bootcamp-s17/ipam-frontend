import template from './login.html';
import controller from './login.controller';

let loginComponent = {
	bindings : {},
	template,
	controller: ['$rootScope', '$interval', controller],
	controllerAs : '$ctrl'
};

console.log('login.component');

export default loginComponent;