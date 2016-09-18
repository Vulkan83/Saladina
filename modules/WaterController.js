/*============================ require ==============================*/
var mraa = require('mraa'); //require mraa

/*============================ export module ==============================*/
module.exports = function () {
		
    this.waterPump;
    this.pumpStatus = false;
    this.pumpIsActivable = true;
    
    this.waterLowLevelController;
    this.lowLevelWater = false;

    
    this.setWaterPump =  function (pin) {
        this.waterPump = new mraa.Gpio(pin);
        this.waterPump.dir(mraa.DIR_OUT);
    }
    
    
    this.setLevelController = function (pin) {
        this.waterLowLevelController = new mraa.Gpio(pin);
        this.waterLowLevelController.dir(mraa.DIR_IN);
    }
    
    
    this.readLowLevelWater = function () {
        this.lowLevelWater = this.waterLowLevelController.read();
        return this.lowLevelWater;
    }

    
    this.setPumpAccess = function (activable) {
        this.pumpIsActivable = activable;  
    }
        
    
    this.waterPumpON = function() {
        if(this.pumpIsActivable) {
            console.log('attivo la pompa');
            this.pumpStatus = true;
            this.waterPump.write(1);
        }
    }
    
    
    this.waterPumpOFF = function() {
        console.log('disattivo la pompa');
        this.pumpStatus = false,
        this.waterPump.write(0);
    }

    
    this.blockWaterPump = function() {
        if(this.pumpIsActivable) {
            this.waterPumpOFF();
            this.setPumpAccess(false);
        }
    }

    
    this.checkWaterLevel = function() {
        if(this.lowLevelWater) {
            this.BlockWaterPump();
        } else {
            this.setPumpAccess(false);
        }
    }
    
    
};