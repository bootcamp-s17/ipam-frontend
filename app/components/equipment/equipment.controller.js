class equipmentController {

	constructor($rootScope, ModalService) {
		let ctrl=this;
		ctrl.$rootScope = $rootScope;

	};

	click(){
		let ctrl=this;
		console.log('hello from equipmentForm');
		console.log(ctrl.$rootScope.equipshow);
		ctrl.$rootScope.equipshow = true;
	}


}

export default equipmentController;