

function ipamService($resource) {

		return {
				getSites: () => $resource('http://localhost:7000/api/sites/:site', {site: "@site"}),
				getSubnets: () => $resource('http://localhost:7000/api/subnets/:subnet', {subnet: "@subnet"}),
				// addSite: () => $resource('http://localhost:7000/api/sites', {});
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
