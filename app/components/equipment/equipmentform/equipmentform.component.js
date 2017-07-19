import template from './equipmentform.html';
import controller from './equipmentform.controller';

let equipmentformComponent = {
	bindings : {},
	template,
	controller: ['$rootScope', '$interval', controller],
	controllerAs : '$ctrl'
};

console.log('equipmentform.component');

export default equipmentformComponent;