'use strict';

import subnetformComponent from './subnetform.component';

let subnetformModule = angular.module('subnetform',[])
.component('subnetform', subnetformComponent)

console.log('subnetform.js');

export default subnetformModule;