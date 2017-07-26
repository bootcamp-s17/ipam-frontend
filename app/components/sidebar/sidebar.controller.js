class sidebarController {

    constructor($rootScope, $http) {
        let ctrl = this;
        ctrl.$rootScope = $rootScope;
        ctrl.$rootScope.getSites();

        ctrl.$rootScope.idIncludes = [];

        ctrl.$rootScope.$watch('showTab', () => {
                ctrl.$rootScope.idIncludes = [];
        });

        ctrl.$rootScope.includeSite = function(id) {
            var i = $.inArray(id, ctrl.$rootScope.idIncludes);
            if (i > -1) {
                ctrl.$rootScope.idIncludes.splice(i, 1);
            } else {
                ctrl.$rootScope.idIncludes.push(id);
            }


            
        }
        
        ctrl.$rootScope.idFilter = function(site) {
            if (ctrl.$rootScope.idIncludes.length > 0) {
                if ($.inArray(site.site_id, ctrl.$rootScope.idIncludes) < 0)
                    return;
            }
            // console.log(site);
            
            return site.site_id;
        }

        ctrl.$rootScope.search = (searchText) => {
            const ctrl = this;
            ctrl.$rootScope.searchText = searchText;
        }
 
    }

        // Functions - Definitions


    };


export default sidebarController;