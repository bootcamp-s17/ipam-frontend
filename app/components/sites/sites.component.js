import template from './sites.html';
import controller from './sites.controller';

let sitesComponent = {
	bindings : {},
	template,
	controller: ['$rootScope', '$interval', '$http', controller],
	controllerAs : '$ctrl'
};

console.log('sites.component');

export default sitesComponent;