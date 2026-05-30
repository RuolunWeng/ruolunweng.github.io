/*				MODULECLASS.JS
    HAND-MADE JAVASCRIPT CLASS CONTAINING A FAUST MODULE AND ITS INTERFACE

*/
/// <reference path="../CodeFaustParser.ts"/>
/// <reference path="../Modules/FaustInterface.ts"/>
/// <reference path="ModuleFaust.ts"/>

"use strict";
var ModuleClass = (function () {
    function ModuleClass(name) {
        var _this = this;
        this.moduleControles = [];
        this.moduleFaust = new ModuleFaust(name);
    }

    /*******************************  PUBLIC METHODS  **********************************/
    ModuleClass.prototype.deleteModule = function () {

        this.deleteFaustInterface();
        this.deleteDSP(this.moduleFaust.fDSP);
    };

    //--- Create and Update are called once a source code is compiled and the factory exists
    ModuleClass.prototype.createDSP = function (factory,audioContext,bufferSize) {
        this.moduleFaust.factory = factory;
        try {
            if (factory != null) {
                this.moduleFaust.fDSP = faust.createDSPInstance(factory, audioContext, bufferSize);
                //console.log("geeeeeey"+faust.createDSPInstance(factory, audioContext, bufferSize));
            }
            else {
                console.log("create DSP Error factory null");
            }
        }
        catch (e) {

            console.log(e);
        }
    };

    ModuleClass.prototype.deleteDSP = function (todelete) {
        // 	TO DO SAFELY --> FOR NOW CRASHES SOMETIMES
         		if(todelete){
               faust.deleteDSPInstance(todelete);
            }
    };

    /***************** CREATE/DELETE the DSP Interface ********************/
    // Fill fInterfaceContainer with the DSP's Interface (--> see FaustInterface.js)
    ModuleClass.prototype.setFaustInterfaceControles = function (SVGinterfaceCallback) {
        var _this = this;
        var moduleFaustInterface = new FaustInterfaceControler(null, function (adress, value) { _this.moduleFaust.fDSP.setParamValue(adress, value); }, function (adress, value) { SVGinterfaceCallback(adress, value); });
        this.moduleControles = moduleFaustInterface.parseFaustJsonUI(JSON.parse(this.moduleFaust.fDSP.json()).ui, this);
    };
    // Create FaustInterfaceControler, set its callback and add its AccelerometerSlider
    ModuleClass.prototype.createFaustInterface = function () {
        for (var i = 0; i < this.moduleControles.length; i++) {
            var faustInterfaceControler = this.moduleControles[i];
            faustInterfaceControler.setParams();
            faustInterfaceControler.createAccelerometer();
        }
    };
    // Delete all FaustInterfaceControler
    ModuleClass.prototype.deleteFaustInterface = function () {
        this.deleteAccelerometerRef();
    };
    // Remove AccelerometerSlider ref from AccelerometerHandler
    ModuleClass.prototype.deleteAccelerometerRef = function () {
        for (var i = 0; i < this.moduleControles.length; i++) {
            if (this.moduleControles[i].accelerometerSlider != null && this.moduleControles[i].accelerometerSlider != undefined) {
                var index = AccelerometerHandler.faustInterfaceControler.indexOf(this.moduleControles[i]);
                AccelerometerHandler.faustInterfaceControler.splice(index, 1);
                delete this.moduleControles[i].accelerometerSlider;
            }
        }
        this.moduleControles = [];
    };

    return ModuleClass;
}());

/*MODULEFAUST.JS
HAND - MADE JAVASCRIPT CLASS CONTAINING A FAUST MODULE */
var ModuleFaust = (function () {
    function ModuleFaust(name) {
        this.fName = name;
    }

    /********************** GET/SET SOURCE/NAME/DSP ***********************/
    ModuleFaust.prototype.setSource = function (code) {
        this.fSource = code;
    };
    ModuleFaust.prototype.getSource = function () { return this.fSource; };
    ModuleFaust.prototype.getName = function () { return this.fName; };
    ModuleFaust.prototype.getDSP = function () {
        return this.fDSP;
    };
    return ModuleFaust;
}());
