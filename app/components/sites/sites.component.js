import template from './sites.html';
import controller from './sites.controller';

let sitesComponent = {
	bindings : {},
	template,
	controller: ['$rootScope', '$interval', '$http', controller],
	controllerAs : '$ctrl'
};


export default sitesComponent;