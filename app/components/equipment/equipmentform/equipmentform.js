'use strict';

import equipmentformComponent from './equipmentform.component';

let equipmentformModule = angular.module('equipmentform',[])
.component('equipmentform', equipmentformComponent)

console.log('equipmentform.js');

export default equipmentformModule;