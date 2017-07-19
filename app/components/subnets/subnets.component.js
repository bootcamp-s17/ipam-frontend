import template from './subnets.html';
import controller from './subnets.controller';

let subnetsComponent = {
	bindings : {},
	template,
	controller: ['$rootScope', '$interval', 'ipamService', controller],
	controllerAs : '$ctrl'
};


export default subnetsComponent;