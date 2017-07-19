
// function random($http) {
// 	return {
// 		getUsers: function() {


// 			return $http.get('https://randomuser.me/api/?results=10');

// 			// return users;
// 		}
// 	}

// }

function ipamService($resource) {

		return {
			getSites: () => {
	 			return $resource('http://localhost:7000/api/sites/:site', 
					 {
					 	site: "@site"
					 }
	 			);
			}
		}

}

// function subnetsService($resource) {

// 	 return $resource('http://localhost:7000/api/subnets/:subnet', 
// 		 {
// 		 	subnet: "@subnet"
// 		 }
// 	 	);
// }


export default ipamService;
