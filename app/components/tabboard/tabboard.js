'use strict';

import tabboardComponent from './tabboard.component';

let tabboardModule = angular.module('tabboard',[])
.component('tabboard', tabboardComponent);

console.log('tabboard.js');

export default tabboardModule;