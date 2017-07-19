import template from './app.html';
import controller from './app.controller';

controller.$inject = ['$rootScope', '$http', 'sitesService'];

console.log(controller);

let appComponent = {
	template,
	controller
};

export default appComponent;