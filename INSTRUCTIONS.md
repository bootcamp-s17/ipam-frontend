# Instructions

## Follow these step by step to get the coding working on your local machine

1.) Clone the repo into a directory that you have created
	- mkdir 'name'
	- git clone 'paste the copy link here'
2.) Then you will have to install the the dependencies (not sure i spelled that correctly)	
	- npm install
3.) Then go to your browser and go to localhost:8000 to see that app


# Creating new component.
4.) Also if you want to create a new component all you need to do is make a directory in the components folder called 'name', go into that directory and create these 5 files.

	-touch 'name'.controller.js
	-touch 'name'.component.js
	-touch 'name'.html
	-touch 'name'.js
	-touch 'name'.scss
5.)Then go ahead and copy the the like files from another component and change all the names in thos files to the name that you are using

	ex.subnets.component ---> 'name.component'

6.)Then go to the app.js and import the component from the correct file path
	ex. "import 'name'Component from './components/'name'/'name'.component';""
7.)Then you have to add it to the angular module in the app.js folder
	ex.".component('"name"', 'name'Component)"
8.)Then once you have it all connected you need to add it to the app.html
	ex."<'name'></'name'>"
9.)Now that you have everything connected you start using the 'name' component by changing the html and then using the controller for all of your javascript functions.