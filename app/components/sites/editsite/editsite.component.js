import template from './sitesform.html';
import controller from './sitesform.controller';

let sitesformComponent = {
	bindings : {},
	template,
	controller: ['$rootScope', '$interval', controller],
	controllerAs : '$ctrl'
};

console.log('sitesform.component');

export default sitesformComponent;