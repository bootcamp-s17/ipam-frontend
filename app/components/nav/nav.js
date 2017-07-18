'use strict';

import navComponent from './nav.component';

let navModule = angular.module('nav',[])
.component('nav', navComponent)

console.log('nav.js');

export default navModule;