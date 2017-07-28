import template from './editsubnet.html';
import controller from './editsubnet.controller';

let editSubnetComponent = {
	bindings : {},
	template,
	controller: ['$rootScope', '$interval', controller],
	controllerAs : '$ctrl'
};


export default editSubnetComponent;