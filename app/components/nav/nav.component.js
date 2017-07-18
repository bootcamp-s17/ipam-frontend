import template from './nav.html';
import controller from './nav.controller';

let navComponent = {
	bindings : {},
	template,
	controller: ['$rootScope', '$interval', controller],
	controllerAs : '$ctrl'
};

console.log('nav.component');

export default navComponent;