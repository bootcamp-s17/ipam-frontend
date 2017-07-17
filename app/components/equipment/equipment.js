'use strict';

import equipmentComponent from './equipment.component';

let equipmentModule = angular.module('equipment',[])
.component('equipment', equipmentComponent)

console.log('equipment.js');

export default equipmentModule;