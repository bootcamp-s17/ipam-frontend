'use strict';

import sitesComponent from './sites.component';

let sitesModule = angular.module('sites',[])
.component('sites', sitesComponent)

export default sitesModule;