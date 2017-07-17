'use strict';

import subnetsComponent from './subnets.component';

let subnetsModule = angular.module('subnets',[])
.component('subnets', subnetsComponent)

console.log('subnets.js');

export default subnetsModule;