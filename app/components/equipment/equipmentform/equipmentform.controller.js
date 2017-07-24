class equipmentformController {

	constructor($rootScope) {
		let ctrl=this;
		ctrl.$rootScope = $rootScope;
		 $("#equipaddress").focusout(() => {
			ctrl.ip = $("#equipaddress").val();
			for (let i = 0; i < ctrl.$rootScope.usedIps.length-1; i++){
				if(ctrl.ip == ctrl.$rootScope.usedIps[i])
				{
					alert('Ray just Stop!')
				}
			}

		});
		

		ctrl.$rootScope.$watch('equipshow',() => {
			 ctrl.equipshow = ctrl.$rootScope.equipshow ;
		});
	};
	// END OF CONSTRUCTORs

	




}

export default equipmentformController;