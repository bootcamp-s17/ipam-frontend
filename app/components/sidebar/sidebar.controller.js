class sidebarController {

    constructor($rootScope, $http) {
        let ctrl = this;
        ctrl.$rootScope = $rootScope;
        ctrl.$rootScope.getSites();
        ctrl.filter = {};
        ctrl.filterSub = {};

        ctrl.$rootScope.filterBySid = filterBySid;
        ctrl.$rootScope.filterByid = filterByid;
        // ctrl.getid = getid;

        function filterByid(id) {
            //console.log(id.site_id);
            return ctrl.filter[id.site_id] || noFilter(ctrl.filter);
        }

        function filterBySid(subnet) {
            if (subnet.site_id == 1){
                return ctrl.$rootScope.filterBySid;
            }
        }

        // function getid() {
        //     return (ctrl.sites || [])
        //     .map(function (subnet) { return subnet.site_id; })
        //     .filter(function (cat, idx, arr) { return arr.indexOf(cat) === idx; });
        // }

        function noFilter(filterObj) {
            return Object
            .keys(filterObj)
            .every(function (key) { return !filterObj[key]; });
        }
        ctrl.$rootScope.search = (searchText) => {
            const ctrl = this;
            ctrl.$rootScope.searchText = searchText;
        }
 
    }

        // Functions - Definitions


    };


export default sidebarController;