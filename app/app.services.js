

function ipamService($resource) {
		let getSites = () => $resource('http://localhost:7000/api/sites/:site', {site: "@site"});
		let	getSubnets = () => $resource('http://localhost:7000/api/subnets/:subnet', {subnet: "@subnet"});
		let	addSite = () => $resource('http://localhost:7000/api/sites');
		let updateSite = () => $resource('http://localhost:7000/api/sites/:site', {site: "@site"}, {
            update: {method: 'PUT'}
          });
		let getIpBySubnet =()=> $resource('http://localhost:7000/api/ip/:subnet', {subnet: "@subnet"});
		let getNextIp = () => $resource('http://localhost:7000/api/ip/:subnet/next', {subnet:"@subnet"});
		
		return {
				getSites : getSites,
				getSubnets : getSubnets,
				addSite: addSite,
				updateSite: updateSite,
				getIpBySubnet: getIpBySubnet,
				getNextIp: getNextIp
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
