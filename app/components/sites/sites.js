'use strict';

import sitesComponent from './sites.component';

let sitesModule = angular.module('sites',[])
.component('sites', sitesComponent)

console.log('sites.js');

export default sitesModule;