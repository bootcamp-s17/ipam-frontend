import template from './tabBoard.html';
import controller from './tabBoard.controller';
console.log(controller);

let tabBoardComponent = {
	bindings : {},
	template,
	controller: ['$rootScope', '$interval', controller],
	controllerAs : '$ctrl'
};

console.log('tabBoard.component');

export default tabBoardComponent;