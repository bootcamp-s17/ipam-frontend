'use strict';

import viewEquipmentComponent from './viewequipment.component';

let viewEquipmentModule = angular.module('viewequipment')
.component('viewequipment', viewEquipmentComponent)

console.log('viewequipment.js');

export default viewEquipmentModule;