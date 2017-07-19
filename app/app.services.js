
// function random($http) {
// 	return {
// 		getUsers: function() {


// 			return $http.get('https://randomuser.me/api/?results=10');

// 			// return users;
// 		}
// 	}

// }

function sitesService($resource) {
		// return $resource('http://www.dnd5eapi.co/api/spells/:spell',
		// {
		// 	spell: '@spell'
		// })

	 return $resource('localhost:8080/api/sites/:site', 
		 {
		 	site: "@site"
		 }
	 	);
}

// calling restful apis dynamically with $resource

// .factory('UserService', function ($resource) {
//     return $resource('http://jsonplaceholder.typicode.com/users/:user',{user: "@user"});
// });

export default sitesService;

