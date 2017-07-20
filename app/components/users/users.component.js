import template from './users.html';
import controller from './users.controller';

let usersComponent = {
	bindings : {},
	template,
	controller: ['$rootScope', '$interval', controller],
	controllerAs : '$ctrl'
};


export default usersComponent;