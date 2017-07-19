import template from './app.html';
import controller from './app.controller';

controller.$inject = ['$rootScope', '$http', 'ipamService'];

console.log(controller);

let appComponent = {
	template,
	controller
};

export default appComponent;