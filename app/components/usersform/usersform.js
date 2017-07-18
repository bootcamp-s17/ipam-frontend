'use strict';

import usersformComponent from './usersform.component';

let usersformModule = angular.module('usersform',[])
.component('usersform', usersformComponent)

console.log('usersform.js');

export default usersformModule;