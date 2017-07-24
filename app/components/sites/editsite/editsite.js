'use strict';

import sitesformComponent from './sitesform.component';

let sitesformModule = angular.module('sitesform',[])
.component('sitesform', sitesformComponent)

console.log('sitesform.js');

export default sitesformModule;