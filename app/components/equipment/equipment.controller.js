class equipmentController {

	constructor($rootScope, ModalService) {
		let ctrl=this;
		ctrl.$rootScope = $rootScope;
		ctrl.$rootScope.getEquipments();

	};
}

export default equipmentController;