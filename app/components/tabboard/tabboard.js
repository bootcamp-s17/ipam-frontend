'use strict';

import tabboardComponent from './tabboard.component';
import sitesComponent from './components/sites/sites.component';
import subnetsComponent from './components/subnets/subnets.component';
import equipmentComponent from './components/equipment/equipment.component';


let tabboardModule = angular.module('tabboard',[])
.component('tabboard', tabboardComponent)
.component('equipment', equipmentComponent)
.component('sites', sitesComponent)
.component('subnets', subnetsComponent)

console.log('tabboard.js');

export default tabboardModule;