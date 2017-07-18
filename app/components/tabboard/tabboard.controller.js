console.log('tab controller is called');



class tabboardController {

	constructor($rootScope) {
		let ctrl=this;
		console.log('tab constructor is called');
		ctrl.$rootScope = $rootScope;
		ctrl.sitesTab = $('#sitesTab').attr('id');
		ctrl.subnetsTab = $('#subnetsTab').attr('id');
		ctrl.equipmentTab = $('#equipmentTab').attr('id');

		ctrl.showTab = 'sites';

		$(".nav-link").on("click", function() {
    		$(".nav-link").removeClass("active");
    		$(this).addClass("active");
  		});

	};

		switchTabView(event) {
			let ctrl = this;
			let showTab = ctrl.$rootScope.showTab;
			let currentTab = $(event.target).attr('id');
			switch (currentTab) {
				case 'sitesTab':
				 ctrl.showTab = 'sites';

				break;
				case 'subnetsTab':
				 ctrl.showTab = 'subnets';
				break;
				case 'equipmentTab':
				 ctrl.showTab = 'equipment';
				break;
			}			

		}







}

export default tabboardController;