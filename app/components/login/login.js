'use strict';

import loginComponent from './login.component';

let loginModule = angular.module('login',[])
.component('login', loginComponent)

console.log('login.js');

export default loginModule;