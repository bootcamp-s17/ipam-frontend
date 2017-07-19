'use strict';

import subnetsComponent from './subnets.component';
import subnetformComponent from './subnetform/subnetform.component';

let subnetsModule = angular.module('subnets',[])
.component('subnets', subnetsComponent)
.component('subnetform', subnetformComponent)

console.log('subnets.js');

export default subnetsModule;