'use strict';

import viewSiteComponent from './viewsite.component';

let viewSiteModule = angular.module('viewsite',[])
.component('viewsite', viewSiteComponent)

console.log('viewsite.js');

export default viewSiteModule;