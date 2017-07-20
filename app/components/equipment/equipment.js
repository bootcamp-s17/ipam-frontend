'use strict';

import equipmentComponent from './equipment.component';
import equipmentformComponent from '/equipmentform/equipmentform.component';

let equipmentModule = angular.module('equipment',[])
.component('equipment', equipmentComponent)
.component('equipmentform', equipmentformComponent)

console.log('equipment.js');

export default equipmentModule;