Saladina
============================

Hydroponic Controller.
The project uses NodeJs to collect data from the sensors and create a web server and with Socket.io enable real time communication between clients and the development board via a web browser to change Basic preference and follow sensor values.

You can view this application by inputting your development board's IP address as well as the port number (3000) specified in the main.js within the browser's address bar. For example, http://192.168.1.0:3000.


###Intel(R) Edison
In order to leverage this project successfully, you will need to connect to a wireless network. For more information, visit https://software.intel.com/en-us/connecting-to-a-network-intel-edison-board.

####(Intel XDK IoT Edition) Install node modules
Within the "manage your xdk daemon and IoT device" menu, check the following boxes:

* Clean '/node_modules' before building Run npm install directly on IoT
* Device (requires internet connection on device)

You can installed the required node modules for this project which are found in the package.json file by pressing the Build/Install button.

####(Intel XDK IoT Edition) Upload & Run project
After installing the neccessary node modules, press the:
    1. Upload button
    2. Run button to execute your project on your board.


####(Web Browser) View Client side application
Input the IP address of your board plus the port number (3000) 
For example, http://192.168.1.0:3000
