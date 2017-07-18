import template from './usersform.html';
import controller from './usersform.controller';

let usersformComponent = {
	bindings : {},
	template,
	controller: ['$rootScope', '$interval', controller],
	controllerAs : '$ctrl'
};

console.log('usersform.component');

export default usersformComponent;