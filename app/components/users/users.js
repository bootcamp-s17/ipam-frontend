'use strict';

import usersComponent from './users.component';
import usersformComponent from './components/usersform/usersform.component';
import UserService from './../login/services/user.service.js';
console.log("blake");


let usersModule = angular.module('users',[])
.component('users', usersComponent)
.component('usersform', usersformComponent)
.factory('UserService', UserService)

console.log('users.js');

export default usersModule;