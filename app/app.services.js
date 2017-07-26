

function ipamService($resource) {
	// All of the site api functions
		let getSites = () => $resource('http://localhost:7000/api/sites/:site', {site: "@site"});
		let	addSite = () => $resource('http://localhost:7000/api/sites');
		let updateSite = () => $resource('http://localhost:7000/api/sites/:site', {site: "@site"}, {
            'update': {method: 'PUT'}
        	});
		// console.log(updateSite().update());
		// console.log(updateSite().update());
	// All of the Subnet api functions
		let	getSubnets = () => $resource('http://localhost:7000/api/subnets/:subnet', {subnet: "@subnet"});
		let addSubnet = ()=> $resource('http://localhost:7000/api/subnets');
		let updateSubnet = () => $resource('http://localhost:7000/api/subnets/:subnet', {subnet: "@subnet"}, 
			{'update': {metod: 'PUT'}
			});
	// All of the ip endpoint api functions
		let getIpBySubnet =()=> $resource('http://localhost:7000/api/ip/:subnet', {subnet: "@subnet"});
		let getNextIp = () => $resource('http://localhost:7000/api/ip/:subnet/next', {subnet: "@subnet"});
		let checkIp = () => $resource('http://localhost:7000/api/ip/:subnet/check/:checkIp', {subnet: "@subnet", checkIp: "@checkIp"});

	// Mac Addresss endpoints
		let checkMac = () => $resource('http://localhost:7000/api/mac_address/:mac', {mac: "@mac"});
	// all of the equipment api functions
		let getEquipments = () => $resource('http://localhost:7000/api/equipment/:equipment', {equipment: "@equipment"});
		let addEquipment =() => $resource('http://localhost:7000/api/equipment');
		let updateEquipment = () => $resource('http://localhost:7000/api/equipment/:equipment', {equipment: "@equipment"},
		 {'update': {method: 'PUT'}
			});
		let getEquipmentTypes = () => $resource('http://localhost:7000/api/equipment_types');
		
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

// 	 return $resource('http://localhost:7000/api/subnets/:subnet', 
// 		 {
// 		 	subnet: "@subnet"
// 		 }
// 	 	);
// }


export default ipamService;
