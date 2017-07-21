class sidebarController {

	constructor($rootScope, $http) {
		let ctrl = this;
        ctrl.$rootScope = $rootScope;
        ctrl.$rootScope.getSites();

        
 
 	}
       	

        search(searchText) {
        const ctrl = this;
        ctrl.$rootScope.searchText = searchText;
        console.log(ctrl.$rootScope.searchText);
    	}

	};


export default sidebarController;