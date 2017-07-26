class equipmentformController {

	constructor($rootScope) {
		let ctrl=this;
		ctrl.$rootScope = $rootScope;

		 $("#equipaddress").focusout(() => {
			ctrl.ip = $("#equipaddress").val();
			
			ctrl.$rootScope.checkIp(ctrl.currentSubnetId, ctrl.ip);

		});

		 $("#macAddress").focusout(() => {
			ctrl.mac = $("#macAddress").val();
			console.log(ctrl.mac);
			ctrl.$rootScope.checkMac(ctrl.mac);

		});

		 $('#equipaddress').prop('disabled', true);
		
		$("#siteSelect").change(()=>{
			ctrl.currentSiteId = $("#siteSelect")[0].value;
			ctrl.$rootScope.getSite(ctrl.currentSiteId);


			});

		//
		$("#subnetSelect").change(()=>{
			ctrl.currentSubnetId = $("#subnetSelect")[0].value;
			console.log(ctrl.currentSubnetId)
			ctrl.$rootScope.getNextIp(ctrl.currentSubnetId);

			$('#equipaddress').prop('disabled', false);


			});

		ctrl.$rootScope.$watch('equipshow',() => {
			 ctrl.equipshow = ctrl.$rootScope.equipshow ;
		});
	};
	// END OF CONSTRUCTORs

	




}

export default equipmentformController;