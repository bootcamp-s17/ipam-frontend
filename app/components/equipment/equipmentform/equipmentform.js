'use strict';

import equipmentformComponent from './equipmentform.component';

let equipmentformModule = angular.module('equipmentform',['ng-ip-address'])
.component('equipmentform', equipmentformComponent)

console.log('equipmentform.js');

export default equipmentformModule;