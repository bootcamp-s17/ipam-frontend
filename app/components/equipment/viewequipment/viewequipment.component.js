import template from './viewEquipment.html';
import controller from './viewEquipment.controller';

let viewEquipmentComponent = {
	bindings : {},
	template,
	controller: ['$rootScope', '$interval', controller],
	controllerAs : '$ctrl'
};


export default viewEquipmentComponent;