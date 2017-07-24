class sidebarController {

    constructor($rootScope, $http) {
        let ctrl = this;
        ctrl.$rootScope = $rootScope;
        ctrl.$rootScope.getSites();
        ctrl.filter = {};

        ctrl.$rootScope.filterByid = filterByid;
        ctrl.getid = getid;

        function filterByid(site) {
            return ctrl.filter[site.id] || noFilter(ctrl.filter);
        }

        function getid() {
            return (ctrl.sites || [])
            .map(function (site) { return site.id; })
            .filter(function (cat, idx, arr) { return arr.indexOf(cat) === idx; });
        }

        function noFilter(filterObj) {
            return Object
            .keys(filterObj)
            .every(function (key) { return !filterObj[key]; });
        }
         ctrl.$rootScope.test = ()=>{
            console.log("hi from sidebarController");
        }

        ctrl.$rootScope.search = (searchText) => {
        const ctrl = this;
        ctrl.$rootScope.searchText = searchText;
        }
 
    }

        // Functions - Definitions


    };


export default sidebarController;