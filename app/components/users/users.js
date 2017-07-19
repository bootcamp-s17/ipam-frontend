'use strict';

import usersComponent from './users.component';
import usersformComponent from './components/usersform/usersform.component';


let usersModule = angular.module('users',[])
.component('users', usersComponent)
.component('usersform', usersformComponent)

console.log('users.js');

export default usersModule;