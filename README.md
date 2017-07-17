# IPAM - Frontend

## File Structure

	app/
	----- shared/   // acts as reusable components or partials of our site
	---------- mainNavigation/
	--------------- mainNavigation.js
	--------------- mainNavigation.html
	---------- sideNavigation/
	--------------- sideNavigation.js
	--------------- sideNavigation.html
	---------- dashboard/
	--------------- dashboard.js
	--------------- dashboard.html
	---------- table/
	--------------- table.js
	--------------- table.html
	----- components/   // each component is treated as a mini Angular app
	---------- sites/
	--------------- sitesController.js
	--------------- sitesComponent.js
	--------------- sites.html
	--------------- sites.js
	---------- subnet/
	--------------- subnetController.js
	--------------- subnetComponent.js
	--------------- subnet.html
	--------------- subnet.js
	---------- equipment/
	--------------- equipmentController.js
	--------------- equipmentComponent.js
	--------------- equipment.html
	--------------- equipment.js
	---------- users/
	--------------- usersController.js
	--------------- usersComponent.js
	--------------- users.html
	--------------- users.js
	----- app.component.js
	----- app.controller.js
	----- app.html
	----- app.js
	assets/
	----- img/      // Images and icons for your app
	----- css/      // All styles and style related files (SCSS or LESS files)
	----- js/       // JavaScript files written for your app that are not for angular
	----- libs/     // Third-party libraries such as jQuery, Moment, Underscore, etc.
	index.html      // The index.html lives at the root of front-end structure. The index.html file will primarily handle loading in all the libraries and Angular elements.

##

##
