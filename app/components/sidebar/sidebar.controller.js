class sidebarController {

    constructor($rootScope, $http) {
        let ctrl = this;
        ctrl.$rootScope = $rootScope;
        ctrl.$rootScope.getSites();

        // ctrl.$rootScope.idIncludes = [];

        // ctrl.$rootScope.$watch('showTab', () => {
        //         ctrl.$rootScope.idIncludes = [];
        // });

        // ctrl.$rootScope.includeSite = function(id) {
        //     var i = $.inArray(id, ctrl.$rootScope.idIncludes);
        //     if (i > -1) {
        //         ctrl.$rootScope.idIncludes.splice(i, 1);
        //     } else {
        //         ctrl.$rootScope.idIncludes.push(id);
        //     }

        ctrl.firstTime = true;
            
        // }
        
        // ctrl.$rootScope.idFilter = function(site) {
        //     if (ctrl.$rootScope.idIncludes.length > 0) {
        //         if ($.inArray(site.site_id, ctrl.$rootScope.idIncludes) < 0)
        //             return;
        //     }
        //     // console.log(site);
            
        //     return site.site_id;
        // }
        // ctrl.$rootScope.firstCheck = (siteid, site) => {
        //     if (ctrl.firstTime == true){    
        //         angular.forEach(ctrl.$rootScope.sites, function(site) {              
        //             site.checked = false;
        //         });

        //         for(var j = 0; j<ctrl.$rootScope.sites.length; j++){
        //             if(ctrl.$rootScope.sites[j].id == siteid){
        //                 console.log("hello");
        //                 ctrl.$rootScope.sites[j].checked = true;
        //             }
        //         };
        //     }
        //     ctrl.firstTime = false;
        //     }

        ctrl.$rootScope.search = (searchText) => {
            const ctrl = this;
            ctrl.$rootScope.searchText = searchText;
        }

        ctrl.$rootScope.preselect = (siteid, site) => {
            if(ctrl.$rootScope.csite > 0){
                if (ctrl.$rootScope.csite == siteid){
                    site.checked = true;
                    return site.checked;
                }
                else{
                    site.checked = false;
                    return site.checked;
                }
            }
            else{
                site.checked = false;
                return site.checked;
            }
        };
 
    }

        // Functions - Definitions


    };


export default sidebarController;