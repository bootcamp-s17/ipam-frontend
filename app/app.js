import appComponent from './app.component';
import equipmentComponent from './components/equipment/equipment.component';
import sitesComponent from './components/sites/sites.component';
import subnetsComponent from './components/subnets/subnets.component';
import usersComponent from './components/users/users.component';
import loginComponent from './components/login/login.component';
import tabboardComponent from './components/tabboard/tabboard.component';
import navComponent from './components/nav/nav.component';
import random from './app.services.js';

let app = angular.module('app',[]);

app.component('app', appComponent)
.component('equipment', equipmentComponent)
.component('sites', sitesComponent)
.component('subnets', subnetsComponent)
.component('users', usersComponent)
.component('login', loginComponent)
.component('tabboard', tabboardComponent)
.component('nav', navComponent)
.factory('randomUserService', random)



