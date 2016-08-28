/*============================ require ==============================*/
var mraa = require('mraa'); //require mraa
var groveSensor = require('jsupm_grove');


/*============================ module ==============================*/
var Light = {
		
        sensor: "",
        sensorValue: "",
    
        setSensor: function (pin) {
            this.sensor = groveSensor.GroveTemp(pin);
        },
    
        readSensorValue: function () {
            this.sensorValue = this.sensor.value();
        }
    
	
};


/*============================ export module ==============================*/
module.exports = Light;