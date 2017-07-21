class sidebarController {

	constructor($rootScope, $http) {
		let ctrl = this;
        ctrl.$rootScope = $rootScope;
        ctrl.$rootScope.getSites();

        
        }
       
          search(searchText) {
        const ctrl = this;
        console.log('yo');
        ctrl.$rootScope.searchText = searchText;
    	}
	};


export default sidebarController;