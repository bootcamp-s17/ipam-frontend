

function ipamService($resource) {
	// All of the site api functions
		let getSites = () => $resource('http://ipam-backend.herokuapp.com/api/sites/:site', {site: "@site"});
		let	addSite = () => $resource('http://ipam-backend.herokuapp.com/api/sites');
		let updateSite = () => $resource('http://ipam-backend.herokuapp.com/api/sites/:site', {site: "@site"}, {
            'update': {method: 'PUT'}
        	});
		// console.log(updateSite().update());
		// console.log(updateSite().update());
	// All of the Subnet api functions
		let	getSubnets = () => $resource('http://ipam-backend.herokuapp.com/api/subnets/:subnet', {subnet: "@subnet"});
		let addSubnet = ()=> $resource('http://ipam-backend.herokuapp.com/api/subnets');
		let updateSubnet = () => $resource('http://ipam-backend.herokuapp.com/api/subnets/:subnet', {subnet: "@subnet"}, 
			{'update': {metod: 'PUT'}
			});
	// All of the ip endpoint api functions
		let getIpBySubnet =()=> $resource('http://ipam-backend.herokuapp.com/api/ip/:subnet', {subnet: "@subnet"});
		let getNextIp = () => $resource('http://ipam-backend.herokuapp.com/api/ip/:subnet/next', {subnet: "@subnet"});
		let checkIp = () => $resource('http://ipam-backend.herokuapp.com/api/ip/:subnet/check/:checkIp', {subnet: "@subnet", checkIp: "@checkIp"});

	// Mac Addresss endpoints
		let checkMac = () => $resource('http://ipam-backend.herokuapp.com/api/mac_address/:mac', {mac: "@mac"});
	// all of the equipment api functions
		let getEquipments = () => $resource('http://ipam-backend.herokuapp.com/api/equipment/:equipment', {equipment: "@equipment"});
		let addEquipment =() => $resource('http://ipam-backend.herokuapp.com/api/equipment');
		let updateEquipment = () => $resource('http://ipam-backend.herokuapp.com/api/equipment/:equipment', {equipment: "@equipment"},
		 {'update': {method: 'PUT'}
			});
		let getEquipmentTypes = () => $resource('http://ipam-backend.herokuapp.com/api/equipment_types');
		
		return {
			// SITES
				getSites : getSites,
				addSite: addSite,
				updateSite: updateSite,
			// SUBNETS
				getSubnets : getSubnets,
				addSubnet: addSubnet,
				updateSubnet: updateSubnet,
			// IP ENDPOINTS
				getIpBySubnet: getIpBySubnet,
				getNextIp: getNextIp,
				checkIp: checkIp,
			// MAC ADDRESS
				checkMac: checkMac,
			// EQUIPMENT
				getEquipments: getEquipments,
				addEquipment: addEquipment,
				updateEquipment: updateEquipment,
				getEquipmentTypes: getEquipmentTypes,

				}

		};
// function subnetsService($resource) {

// 	 return $resource('http://ipam-backend.herokuapp.com/api/subnets/:subnet', 
// 		 {
// 		 	subnet: "@subnet"
// 		 }
// 	 	);
// }


export default ipamService;
