

function ipamService($resource) {
		let getSites = () => $resource('http://localhost:7000/api/sites/:site', {site: "@site"});
		let	getSubnets = () => $resource('http://localhost:7000/api/subnets/:subnet', {subnet: "@subnet"});
		let	addSite = () => $resource('http://localhost:7000/api/sites');
		let updateSite = () => $resource('http://localhost:7000/api/sites/:site', {site: "@site"}, {
            update: {method: 'PUT'}
          });

		return {
				getSites : getSites,
				getSubnets : getSubnets,
				addSite: addSite,
				updateSite: updateSite
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
