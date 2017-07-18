import template from './app.html';
import controller from './app.controller';

controller.$inject = ['$rootScope', '$http', 'randomUserService'];

console.log(controller);

let appComponent = {
	template,
	controller
};

export default appComponent;