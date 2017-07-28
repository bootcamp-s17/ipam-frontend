'use strict';

import editSiteComponent from './editsite.component';

let editSiteModule = angular.module('editsite',[])
.component('editsite', editSiteComponent)

console.log('editsite.js');

export default editSiteModule;