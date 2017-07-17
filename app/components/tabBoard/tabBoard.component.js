import template from './tabboard.html';
import controller from './tabboard.controller';
console.log(controller);

let tabboardComponent = {
	bindings : {},
	template,
	controller: ['$rootScope', '$interval', controller],
	controllerAs : '$ctrl'
};

console.log('tabboard.component');

export default tabboardComponent;