class appCtrl {

	constructor($rootScope, $http, $location, ipamService) {

		let ctrl = this;
		ctrl.$rootScope = $rootScope;

		// define a dashbaord variable to work with the ng-clicks
		// and to set value based on entry page
		ctrl.$rootScope.dashboard = ($location.path() == '/' || $location.path() == '') ? true : false;

/*----------------------------------------------------------
						SITES
----------------------------------------------------------*/




		// Setting a global function for getting ALL sites from API
		ctrl.$rootScope.getSites = () => {

			// grabs api data for all the sites with the ngresource query()
			ctrl.query = ipamService.getSites().query();

			// pushes data to sites object
			ctrl.query.$promise.then( (data) => {
				ctrl.$rootScope.sites = data;
			})	

		} // end getSites()

		ctrl.$rootScope.getSite = (id) => {
			ctrl.get = ipamService.getSites().get({site:id});

			ctrl.get.$promise.then( (data) => {
				ctrl.$rootScope.site = data;
			})

			alert(id);
		}

		// add a site from form
		ctrl.$rootScope.addSite = () => {

		// instantiate new site JSON
			ctrl.newSite = {
				// grab values with JQuery from form
			  "name": $('#siteName').val(),
			  "abbreviation": $('#siteAbbreviation').val(),
			  "address": $('#siteAddress').val(),
			  "site_contact": $('#siteContact').val(),
			}

 			// specific call to save from $resource
			ipamService.addSite().save({}, ctrl.newSite)
				.$promise
				// says wait for the data and push it to the array
				.then((data) => {
				ctrl.$rootScope.sites.push(data);
			});
		}


			// ctrl.$rootScope.getSites();
		// ipamService.updateSite().update({site:1}, ctrl.newSite);




/* ------------------------------------------------------
						SUBNETS
----------------------------------------------------------*/

		// Setting a global function for getting sites from API
		ctrl.$rootScope.getSubnets = () => {
			// grabs api data for all the sites with the ngresource query()
			ctrl.query = ipamService.getSubnets().query();

			// pushes data to sites object, .then means we wait on the promise
			ctrl.query.$promise.then( (data) => {
				ctrl.$rootScope.subnets = data;
			})	

		} 
		ctrl.$rootScope.addSubnet = () => {
		// instantiate new subnet JSON
			ctrl.newSubnet = {
				// grab values with JQuery from form
			   "site_id": $('#siteSelect').val(),
			   "name": $('#subnetName').val(),
			   "subnet_address": $('#subnetIpAddress').val(),
			   "mask_bits": $('#subnetMaskBits').val(),
			   "vLan": $('#vlanNumber').val(),	

			}

 			// specific call to save from $resource
			ipamService.addSubnet().save({}, ctrl.newSubnet)
				.$promise
				// says wait for the data and push it to the array
				.then((data) => {
				ctrl.$rootScope.subnets.push(data);
			});
		}// end getSubnets()
/* ------------------------------------------------------
						IP Adsress
----------------------------------------------------------*/ 
	// Setting a global function for getting sites from API
		ctrl.$rootScope.getIpBySubnet = (id) => {
			// grabs api data for all the sites with the ngresource query()
			ctrl.query = ipamService.getIpBySubnet().query();

			// pushes data to sites object, .then means we wait on the promise
			ctrl.query.$promise.then( (data) => {
				ctrl.$rootScope.usedIps = data;
			})	

		} // end getIpBySubnet()
		
// Setting a global function for getting sites from API
		ctrl.$rootScope.getNextIp = (id) => {
			// grabs api data for all the sites with the ngresource query()
			ctrl.query = ipamService.getNextIp().query();

			// pushes data to sites object, .then means we wait on the promise
			ctrl.get.$promise.then( (data) => {
				ctrl.$rootScope.NextIp = data;
			})	

		}// end getNextUp()


/* ------------------------------------------------------
						EQUIPMENT
----------------------------------------------------------*/
		// Setting a global function for getting equipments from API
		ctrl.$rootScope.getEquipments = () => {
			// grabs api data for all the sites with the ngresource query()
			ctrl.query = ipamService.getEquipments().query();

			// pushes data to sites object, .then means we wait on the promise
			ctrl.query.$promise.then( (data) => {
				ctrl.$rootScope.equipments = data;
			})	
		}



		ctrl.$rootScope.addEquipment = () => {
		// instantiate new equipment JSON
			ctrl.newEquipment = {
				// grab values with JQuery from form
			  "site_id": $('#siteSelect').val(),
			  "subnet_id": $('#subnetSelect').val(),
			  "equipment_type_id": $('#typeId').val(),
			  "name": $('#equipmentName').val(),
			  "host_name": $('#hostName').val(),
			  "room_id": $('#roomNumber').val(),
			  "serial": $('serialNumber').val(),
			  "mac_address": $('#macAddress').val(),
			  "ip_address": $('#equipaddress').val(),
			  "mab": $('#mabBoxYes').val(),
			  "switch_name":$('#switchName').val(),
			  "switch_ip":$('#switchManagementIp').val(),
			  "switch_room_number":$('#switchRoomNumber').val,
			  "printer_server": $('#printerServer').val(),
			  "driver": $('#driverInpur').val(),
			  "printer_name": $('#printerName').val(),
			  "share_name": $('#shareName').val(),
			  "share_comment": $('#shareComment').val()
			  "model": $('#modelType').val(),
			  "operating_system":$('#operatingSystem').val(),
			  "computer_type":$('#computerType').val()
			 }
 			// specific call to save from $resource
			ipamService.addEquipment().save({}, ctrl.newEquipment)
				.$promise
				// says wait for the data and push it to the array
				.then((data) => {
				ctrl.$rootScope.equipments.push(data);
			});
		}//end equipments


	} // end constructor
} // end appCtrl
export default appCtrl;