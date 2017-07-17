'use strict';

import usersComponent from './users.component';

let usersModule = angular.module('users',[])
.component('users', usersComponent)

console.log('users.js');

export default usersModule;