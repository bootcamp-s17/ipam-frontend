import template from './viewsite.html';
import controller from './viewsite.controller';

let viewSiteComponent = {
	bindings : {},
	template,
	controller: ['$rootScope', '$interval', controller],
	controllerAs : '$ctrl'
};

console.log('viewsite.component');

export default viewSiteComponent;