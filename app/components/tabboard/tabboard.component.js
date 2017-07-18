import template from './tabboard.html';
import controller from './tabboard.controller';

let tabboardComponent = {
	bindings : {},
	template,
	controller: ['$rootScope', '$interval', '$http', '$q', controller],
	controllerAs : '$ctrl'
};

export default tabboardComponent;