class subnetsController {

	constructor($rootScope) {
		let ctrl=this;

		// allows global variables to be defined. 
		ctrl.$rootScope = $rootScope;

		// calling the function to get the equipment from the api endpoint
		// the getEquipments function is defined in app.services.js
		ctrl.$rootScope.getSubnets();

		ctrl.firstTime = true;

		ctrl.$rootScope.hiddenSubnets = [];

		// declaring a local variable to change the sorting method
		ctrl.sortReverse = false; 

		ctrl.$rootScope.checkit = (siteid) => {
			if(ctrl.firstTime == true){
				for (var i=(ctrl.$rootScope.subnets.length-1); i>-1; i--){
					if(ctrl.$rootScope.subnets[i].site_id == siteid){
					}
					else{
						ctrl.$rootScope.hiddenSubnets.push(ctrl.$rootScope.subnets[i]);
						ctrl.$rootScope.subnets.splice(i,1);
					}
				}
				ctrl.firstTime = false;
			}
			else{
				var madeSwap = false;
				if(madeSwap == false){
					for (var i=(ctrl.$rootScope.subnets.length-1); i>-1; i--){
						if(ctrl.$rootScope.subnets[i].site_id == siteid){
							ctrl.$rootScope.hiddenSubnets.push(ctrl.$rootScope.subnets[i]);
							ctrl.$rootScope.subnets.splice(i, 1);
							madeSwap = true;
						}
					}
				}
				if(madeSwap == false){
				for (var i=(ctrl.$rootScope.hiddenSubnets.length-1); i>-1; i--){
					if(ctrl.$rootScope.hiddenSubnets[i].site_id == siteid){
						ctrl.$rootScope.subnets.push(ctrl.$rootScope.hiddenSubnets[i]);
						ctrl.$rootScope.hiddenSubnets.splice(i, 1);
						madeSwap=true;
					}
				}}	
			}
			
		}


		ctrl.$rootScope.prefilter = (siteid) => {
			for (var i=(ctrl.$rootScope.subnets.length-1); i>-1; i--){
				if(ctrl.$rootScope.subnets[i].site_id == ctrl.$rootScope.csite){
					ctrl.firstTime = false;
				}
				else if (ctrl.$rootScope.csite > 1){
					ctrl.$rootScope.hiddenSubnets.push(ctrl.$rootScope.subnets[i]);
					ctrl.$rootScope.subnets.splice(i,1);
				}
				else{}
			}
		}


	};



}

export default subnetsController;