class appCtrl {

	constructor($rootScope, $http, $location, ipamService) {

		let ctrl = this;
		ctrl.$rootScope = $rootScope;



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
				console.log(ctrl.$rootScope.site);
			})

		} // end getSite

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
		} //end addSite

		ctrl.$rootScope.updateSite = (id) => {

			// instantiate new site JSON
			ctrl.saveSite = {
				// grab values with JQuery from form
			  "id": id,
			  "name": $('#editSiteName').val(),
			  "abbreviation": $('#editSiteAbbreviation').val(),
			  "address": $('#editSiteAddress').val(),
			  "site_contact": $('#editSiteContact').val(),
			}

			// ctrl.saveSite = {
			// 	// grab values with JQuery from form
			//   "id": id,
			//   "name": 'test2',
			//   "address": '300 Rose',
			//   "abbreviation": 'tst',
			//   "site_contact": 'david',
			// }
			console.log(ctrl.saveSite);
 			// specific call to save from $resource
			ipamService.updateSite().update({site:id}, ctrl.saveSite)
				.$promise
				// says wait for the data and push it to the array
				.then((data) => {
				//pull the sites from db for fresh info with updated site
				ctrl.$rootScope.getSites();
				// console.log(data);
				});
		} //end updateSite

		// ctrl.$rootScope.updateSite(1);

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
		ctrl.$rootScope.getSubnet = (id) => {
			ctrl.get = ipamService.getSubnets().get({subnet:id});

			ctrl.get.$promise.then( (data) => {
				ctrl.$rootScope.subnet = data;
				console.log(ctrl.$rootScope.subnet);
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
		}
		ctrl.$rootScope.updateSubnet = (id) => {

			// instantiate new site JSON
			ctrl.saveSubnet = {
				// grab values with JQuery from form
			  "id": id,
			  "site_id": $('#editSubnetSiteId').val(),
			  "name": $('#editSubnetName').val(),
			  "subnet_address": $('#editSubnetIpAddress').val(),
			  "mask_bits": $('#editSubnetMaskBits').val(),
			  "vLan": $('#editSubnetVlan').val(),	
			}

			console.log(ctrl.saveSubnet);
 			// specific call to save from $resource
			ipamService.updateSubnet().update({subnet:id}, ctrl.saveSubnet)
				.$promise
				// says wait for the data and push it to the array
				.then((data) => {
				//pull the sites from db for fresh info with updated site
				ctrl.$rootScope.getSubnets();
			});	
		}	
	// end getSubnets()
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
		ctrl.$rootScope.getEquipment = (id) => {
			ctrl.get = ipamService.getEquipments().get({equipment:id});

			ctrl.get.$promise.then( (data) => {
				ctrl.$rootScope.equipment = data;
				console.log(ctrl.$rootScope.equipment);
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
			  "room_id": $('#room_id').val(),
			  "serial_number": $('#serialNumber').val(),
			  "mac_address": $('#macAddress').val(),
			  "ip_address": $('#equipaddress').val(),
			  "mab": $('#mabBoxYes').val(),
			  "switch_name":$('#switchName').val(),
			  "switch_ip":$('#switchManagementIp').val(),
			  "switch_room_number":$('#switchRoomNumber').val(),
			  "printer_server": $('#printerServer').val(),
			  "driver": $('#driverInput').val(),
			  "printer_name": $('#printerName').val(),
			  "share_name": $('#shareName').val(),
			  "share_comment": $('#shareComment').val(),
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
		} 
		ctrl.$rootScope.updateEquipment = (id) => {

			// instantiate new site JSON
			ctrl.saveEquipment = {
				// grab values with JQuery from form
			  "id": id,
			  "site_id": $('#editEquipmentSite').val(),
			  "subnet_id": $('#subnetSelect').val(),
			  "equipment_type_id": $('#editEquipmentType').val(),
			  "name": $('#editEquipmentName').val(),
			  "host_name": $('#editHostName').val(),
			  "room_id": $('#editRoom_Id').val(),
			  "serial_number": $('#editSerialNumber').val(),
			  "mac_address": $('#editMacAddress').val(),
			  "ip_address": $('#editEquipaddress').val(),
			  "mab": $('#editMabBoxYes').val(),
			  "switch_name":$('#editSwitchName').val(),
			  "switch_ip":$('#editSwitchManagementIp').val(),
			  "switch_room_number":$('#editSwitchRoomNumber').val(),
			  "printer_server": $('#editPrinterServer').val(),
			  "driver": $('#editDriverInput').val(),
			  "printer_name": $('#editPrinterName').val(),
			  "share_name": $('#editShareName').val(),
			  "share_comment": $('#editShareComment').val(),
			  "model": $('#editModelType').val(),
			  "operating_system":$('#editOperatingSystem').val(),
			  "computer_type":$('#editComputerType').val()
			  
			}
			console.log($('#editRoom_id'));
			console.log(ctrl.saveEquipment);
 			// specific call to save from $resource
			ipamService.updateEquipment().update({equipment:id}, ctrl.saveEquipment)
				.$promise
				// says wait for the data and push it to the array
				.then((data) => {
				//pull the sites from db for fresh info with updated site
				console.log(data);
				ctrl.$rootScope.getEquipments();
			});	
		}//end quipments


	} // end constructor
} // end appCtrl
export default appCtrl;