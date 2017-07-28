import template from './editequipment.html';
import controller from './editequipment.controller';

let editEquipmentComponent = {
	bindings : {},
	template,
	controller: ['$rootScope', '$interval', controller],
	controllerAs : '$ctrl'
};


export default editEquipmentComponent;