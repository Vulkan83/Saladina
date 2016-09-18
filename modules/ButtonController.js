/*============================ require ==============================*/
var mraa = require('mraa'); //require mraa

/*============================ export module ==============================*/
module.exports = function () {
    		
    this.sensor;
    this.sensorStatus;

    
    this.setSensor = function (pin) {
        this.sensor = new mraa.Gpio(pin);
        this.sensor.dir(mraa.DIR_IN);
    }
    
    
    this.readSensorValue = function () {
        this.sensorValue = this.sensor.read();
        return this.sensorValue;
    }
    
        
    this.toggle = function () {
        var current_status = this.sensor.read();
        
        if(current_status)  {
            this.sensorStatus = !this.sensorStatus;
        }
            
        return this.sensorStatus;
    }
    
};