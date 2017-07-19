class subnetsController {

	constructor($rootScope) {
		let ctrl=this;
		ctrl.$rootScope=$rootScope;
	};
	subnet(){
		let ctrl=this; 
		console.log("hello from subnet");
		ctrl.$rootScope.subshow=true;
	}

}

export default subnetsController;