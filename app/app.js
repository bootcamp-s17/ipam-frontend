import appComponent from './app.component';
import equipmentComponent from './components/equipment/equipment.component';
import sitesComponent from './components/sites/sites.component';
import subnetsComponent from './components/subnets/subnets.component';
import usersComponent from './components/users/users.component';
import loginComponent from './components/login/login.component';
import navComponent from './components/nav/nav.component';
import equipmentformComponent from './components/equipmentform/equipmentform.component';
import subnetformComponent from './components/subnetform/subnetform.component';
import usersformComponent from './components/usersform/usersform.component';



angular.module('app',[])
.component('app', appComponent)
.component('equipment', equipmentComponent)
.component('sites', sitesComponent)
.component('subnets', subnetsComponent)
.component('users', usersComponent)
.component('login', loginComponent)
.component('nav', navComponent)
.component('equipmentform', equipmentformComponent)
.component('subnetform', subnetformComponent)
.component('userstform', usersformComponent)