import template from './equipment.html';
import controller from './equipment.controller';

let equipmentComponent = {
	bindings : {},
	template,
	controller: ['$rootScope', '$interval', controller],
	controllerAs : '$ctrl'
};


export default equipmentComponent;