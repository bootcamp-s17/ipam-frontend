import template from './editsite.html';
import controller from './editsite.controller';

let editSiteComponent = {
	bindings : {},
	template,
	controller: ['$rootScope', '$interval', controller],
	controllerAs : '$ctrl'
};

console.log('editsite.component');

export default editSiteComponent;