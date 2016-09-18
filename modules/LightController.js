/*============================ require ==============================*/
var mraa = require('mraa'); //require mraa
var groveSensor = require('jsupm_grove');


/*============================ export module ==============================*/
module.exports = function (pin) {
    	
    this.sensor;
    this.sensorValue;
    
    this.setSensor = function (pin) {
        this.sensor = new groveSensor.GroveTemp(pin);
    }
    
    this.readSensorValue = function () {
        this.sensorValue = this.sensor.value();
        return this.sensorValue;
    }
    	
};