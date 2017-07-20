class equipmentController {

	constructor($rootScope, ModalService) {
		let ctrl=this;
		let vm=this;
		ctrl.$rootScope = $rootScope;
		ctrl.$rootScope.equipshow = false;


		// vm.openModal = openModal;
		// vm.closeModal = closeModal;

		// initcontroller();

		// function initcontroller(){
		// 	vm.bodyText = 'This is working!';
		// };
		// function openModal(id){
		// 	ModalService.Open(id);
		// 	console.log('Clicked!')
		// };	
		// function closeModal(id){
		// 	ModalService.close(id);
		// };

	};

	click(){
		let ctrl=this;
		ctrl.$rootScope.equipshow = true;
	}


}

export default equipmentController;