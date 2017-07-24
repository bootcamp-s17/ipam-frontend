

function ipamService($resource) {
	// All of the site api functions
		let getSites = () => $resource('http://localhost:7000/api/sites/:site', {site: "@site"});
		let	addSite = () => $resource('http://localhost:7000/api/sites');
		let updateSite = () => $resource('http://localhost:7000/api/sites/:site', {site: "@site"}, {
            update: {method: 'PUT'}
        	});
	// All of the Subnet api functions
		let	getSubnets = () => $resource('http://localhost:7000/api/subnets/:subnet', {subnet: "@subnet"});
		let addSubnet = ()=> $resource('http://localhost:7000/api/subnets');
		let updateSubnet = () => $resource('http://localhost:7000/api/subnets/:subnet', {subnet: "@subnet"}, 
			{upadte: {metod: 'PUT'}
			});
	// All of the ip endpoint api functions
		let getIpBySubnet =()=> $resource('http://localhost:7000/api/ip/:subnet', {subnet: "@subnet"});
		let getNextIp = () => $resource('http://localhost:7000/api/ip/:subnet/next', {subnet: "@subnet"});
	// all of the equipment api functions
		let getEquipments = () => $resource('http://localhost:7000/api/equipment/:equipment', {equipment: "@equipment"});
		let addEquipment =() => $resource('http://localhost:7000/api/equipment');
		let updateEquipment = () => $resource('http://localhost:7000/api/equipment/:equipment', {equipment: "@equipment"},
		 {update: {method: 'PUT'}
			});
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
			// EQUIPMENT
				getEquipments: getEquipments,
				addEquipment: addEquipment,
				updateEquipment: updateEquipment

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
