import appComponent from './app.component';
import equipmentComponent from './components/equipment/equipment.component';
import sitesComponent from './components/sites/sites.component';
import subnetsComponent from './components/subnets/subnets.component';
import usersComponent from './components/users/users.component';



angular.module('app',[])
.component('app', appComponent)
.component('equipment', equipmentComponent)
.component('sites', sitesComponent)
.component('subnets', subnetsComponent)
.component('users', usersComponent)