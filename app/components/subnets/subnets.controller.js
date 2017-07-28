class subnetsController {

	constructor($rootScope) {
		let ctrl=this;

		// allows global variables to be defined. 
		ctrl.$rootScope = $rootScope;

		// calling the function to get the equipment from the api endpoint
		// the getEquipments function is defined in app.services.js
		ctrl.$rootScope.getSubnets();

		ctrl.$rootScope.getEquipments();

		ctrl.$rootScope.firstTime = true;

		ctrl.$rootScope.hiddenSubnets = [];

		ctrl.$rootScope.hiddenEquipments = [];

		// declaring a local variable to change the sorting method
		ctrl.sortReverse = false; 



		ctrl.$rootScope.prefilter = (siteid) => {
			for (var i=(ctrl.$rootScope.subnets.length-1); i>-1; i--){
				if(ctrl.$rootScope.subnets[i].site_id == ctrl.$rootScope.csite){
					ctrl.$rootScope.firstTime = false;
				}
				else if (ctrl.$rootScope.csite > 1){
					ctrl.$rootScope.hiddenSubnets.push(ctrl.$rootScope.subnets[i]);
					ctrl.$rootScope.subnets.splice(i,1);
				}
				else{}
			}

			for (var i=(ctrl.$rootScope.equipments.length-1); i>-1; i--){
				console.log();
				if(ctrl.$rootScope.equipments[i].site_id == ctrl.$rootScope.csite){
					ctrl.$rootScope.firstTime = false;
				}
				else if (ctrl.$rootScope.csite > 1){
					ctrl.$rootScope.hiddenEquipments.push(ctrl.$rootScope.equipments[i]);
					ctrl.$rootScope.equipments.splice(i,1);
				}
				else{}
			}

		}


	};



}

export default subnetsController;