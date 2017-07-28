import template from './viewsubnet.html';
import controller from './viewsubnet.controller';

let viewSubnetComponent = {
	bindings : {},
	template,
	controller: ['$rootScope', '$interval', controller],
	controllerAs : '$ctrl'
};


export default viewSubnetComponent;