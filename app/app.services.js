// function ipam ($http) {
// 	console.log('ipam factory');
// 	return {
// 		data: function () {
// 			console.log('data');
// 			console.log($http.get('https://randomuser.me/api/?results=10'));
// 			return;
// 		}
// 	};
// }

function random($http) {
	return {
		getUsers: function() {

			// let users = {list:null};

			return $http.get('https://randomuser.me/api/?results=10');
			// .then(function(data) {
			// 	users.list = data;
			// });

			// return users;
		}
	}

}

export default random;

