/*============================ require ==============================*/
var mraa = require('mraa'); //require mraa

/*============================ export module ==============================*/
module.exports = function () {
    		
    this.actuator;

    this.setActuator = function (pin) {
        this.sensor = new mraa.Gpio(pin);
        this.sensor.dir(mraa.DIR_OUT);
    },

    this.write = function (value) {
        this.sensor.write(value);
    }
    
};