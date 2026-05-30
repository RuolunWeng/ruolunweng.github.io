//Accelerometer Class
/// <reference path="Modules/FaustInterface.ts"/>
var Axis;
(function (Axis) {
    Axis[Axis["x"] = 0] = "x";
    Axis[Axis["y"] = 1] = "y";
    Axis[Axis["z"] = 2] = "z";
})(Axis || (Axis = {}));
;
var Curve;
(function (Curve) {
    Curve[Curve["Up"] = 0] = "Up";
    Curve[Curve["Down"] = 1] = "Down";
    Curve[Curve["UpDown"] = 2] = "UpDown";
    Curve[Curve["DownUp"] = 3] = "DownUp";
})(Curve || (Curve = {}));
;
//object describing value off accelerometer metadata values.
var AccMeta = (function () {
    function AccMeta() {
    }
    return AccMeta;
}());
//Contains the info regarding the mapping of the FaustInterfaceControler and the accelerometer
var AccelerometerSlider = (function () {
    function AccelerometerSlider(accParams) {
        if (accParams != null) {
            this.isEnabled = accParams.isEnabled;
            this.acc = accParams.acc;
            this.setAttributes(accParams.acc);
            this.address = accParams.address;
            this.min = accParams.min;
            this.max = accParams.max;
            this.init = accParams.init;
            this.label = accParams.label;
            this.isActive = true;
        }
    }
    AccelerometerSlider.prototype.setAttributes = function (fMetaAcc) {
        if (fMetaAcc != null) {
            var arrayMeta = fMetaAcc.split(" ");
            this.axis = parseInt(arrayMeta[0]);
            this.curve = parseInt(arrayMeta[1]);
            this.amin = parseInt(arrayMeta[2]);
            this.amid = parseInt(arrayMeta[3]);
            this.amax = parseInt(arrayMeta[4]);
        }
    };
    AccelerometerSlider.prototype.setAttributesDetailed = function (axis, curve, min, mid, max) {
        this.axis = axis;
        this.curve = curve;
        this.amin = min;
        this.amid = mid;
        this.amax = max;
    };
    return AccelerometerSlider;
}());
//object responsible of storing all accelerometerSlider and propagate to them the accelerometer infos.
var AccelerometerHandler = (function () {
    function AccelerometerHandler() {
      this.devicemotionOffst;
    }
    // get Accelerometer value
    AccelerometerHandler.prototype.getAccelerometerValue = function () {
        var _this = this;

        function permission () {
            if ( typeof( DeviceMotionEvent ) !== "undefined" && typeof( DeviceMotionEvent.requestPermission ) === "function" ) {
                // (optional) Do something before API request prompt.
                DeviceMotionEvent.requestPermission()
                    .then( response => {
                    // (optional) Do something after API prompt dismissed.
                    if ( response == "granted" ) {
                        window.addEventListener( "devicemotion", (e) => {
                            // do something for 'e' here.
                            _this.propagate(e);
                            //console.log("DeviceMotionEvent added");
                        })
        
                    if (navigator.userAgent.match(/Android/i)) {
                       devicemotionOffst = -1;
                       console.log("Android Browser support DeviceMotionEvent");
                    } else {
                       devicemotionOffst = 1;
                       console.log("iOS Browser support DeviceMotionEvent");
                    }
        
                        
                    }
                })
                    .catch( console.error )
            } else {
                alert( "Browser doesn't support DeviceMotionEvent" );
            }
        }
        //const btn = document.getElementById( "request" );
        $('.loadfile').on('click', permission );

        /*
        // Button element
        // var startButton = document.getElementById('file-input');
        
        if (window.DeviceMotionEvent) {
            //startButton.addEventListener('click', function () {
            $('.loadfile').on('click', function() {
                window.addEventListener("devicemotion", function (event) { _this.propagate(event); }, false);
                console.log("DeviceMotionEvent added");
            });
            
            if (navigator.userAgent.match(/Android/i)) {
               devicemotionOffst = -1;
            } else {
               devicemotionOffst = 1;
                console.log("iOS Browser support DeviceMotionEvent");
            }
        }
        else {
            // Browser doesn't support DeviceMotionEvent
            console.log("Browser doesn't support DeviceMotionEvent");
        }

        */
    };
    // propagate the new x, y, z value of the accelerometer to the registred object
    AccelerometerHandler.prototype.propagate = function (event) {
        var x = ( event.accelerationIncludingGravity.x )* devicemotionOffst;
        var y = ( event.accelerationIncludingGravity.y )* devicemotionOffst;
        var z = ( event.accelerationIncludingGravity.z )* devicemotionOffst;
        for (var i = 0; i < AccelerometerHandler.faustInterfaceControler.length; i++) {
            if (AccelerometerHandler.faustInterfaceControler[i].accelerometerSlider.isActive && AccelerometerHandler.faustInterfaceControler[i].accelerometerSlider.isEnabled) {
                this.axisSplitter(AccelerometerHandler.faustInterfaceControler[i].accelerometerSlider, x, y, z, this.applyNewValueToModule);
            }
        }
        // update the faustInterfaceControler of the AccelerometerEditView
        if (AccelerometerHandler.faustInterfaceControlerEdit != null) {
            this.axisSplitter(AccelerometerHandler.faustInterfaceControlerEdit.accelerometerSlider, x, y, z, this.applyValueToEdit);
        }
    };
    //create and register accelerometerSlide
    AccelerometerHandler.registerAcceleratedSlider = function (accParams, faustInterfaceControler, sliderEdit) {
        var accelerometerSlide = new AccelerometerSlider(accParams);

        faustInterfaceControler.accelerometerSlider = accelerometerSlide;
        AccelerometerHandler.curveSplitter(accelerometerSlide);
        if (sliderEdit) {
            AccelerometerHandler.faustInterfaceControlerEdit = faustInterfaceControler;
        }
        else {
            AccelerometerHandler.faustInterfaceControler.push(faustInterfaceControler);

        }
    };
    //give the good axis value to the accelerometerslider, convert it to the faust value before
    AccelerometerHandler.prototype.axisSplitter = function (accelerometerSlide, x, y, z, callBack) {
        switch (accelerometerSlide.axis) {
            case Axis.x:
                var newVal = accelerometerSlide.converter.uiToFaust(x);
                callBack(accelerometerSlide, newVal, x);
                break;
            case Axis.y:
                var newVal = accelerometerSlide.converter.uiToFaust(y);
                callBack(accelerometerSlide, newVal, y);
                break;
            case Axis.z:
                var newVal = accelerometerSlide.converter.uiToFaust(z);
                callBack(accelerometerSlide, newVal, z);
                break;
        }
    };
    //update value of the dsp
    AccelerometerHandler.prototype.applyNewValueToModule = function (accSlid, newVal, axeValue) {
        accSlid.callbackValueChange(accSlid.address, newVal);
    };
    //update value of the edit range in AccelerometerEditView
    AccelerometerHandler.prototype.applyValueToEdit = function (accSlid, newVal, axeValue) {
        AccelerometerHandler.faustInterfaceControlerEdit.faustInterfaceView.slider.value = axeValue.toString();
    };
    //Apply the right converter with the right curve to an accelerometerSlider
    AccelerometerHandler.curveSplitter = function (accelerometerSlide) {
        switch (accelerometerSlide.curve) {
            case Curve.Up:
                accelerometerSlide.converter = new AccUpConverter(accelerometerSlide.amin, accelerometerSlide.amid, accelerometerSlide.amax, accelerometerSlide.min, accelerometerSlide.init, accelerometerSlide.max);
                break;
            case Curve.Down:
                accelerometerSlide.converter = new AccDownConverter(accelerometerSlide.amin, accelerometerSlide.amid, accelerometerSlide.amax, accelerometerSlide.min, accelerometerSlide.init, accelerometerSlide.max);
                break;
            case Curve.UpDown:
                accelerometerSlide.converter = new AccUpDownConverter(accelerometerSlide.amin, accelerometerSlide.amid, accelerometerSlide.amax, accelerometerSlide.min, accelerometerSlide.init, accelerometerSlide.max);
                break;
            case Curve.DownUp:
                accelerometerSlide.converter = new AccDownUpConverter(accelerometerSlide.amin, accelerometerSlide.amid, accelerometerSlide.amax, accelerometerSlide.min, accelerometerSlide.init, accelerometerSlide.max);
                break;
            default:
                accelerometerSlide.converter = new AccUpConverter(accelerometerSlide.amin, accelerometerSlide.amid, accelerometerSlide.amax, accelerometerSlide.min, accelerometerSlide.init, accelerometerSlide.max);
        }
    };
    //array containing all the FaustInterfaceControler of the scene
    AccelerometerHandler.faustInterfaceControler = [];
    return AccelerometerHandler;
}());
/***************************************************************************************
********************  Converter objects use to map acc and faust value *****************
****************************************************************************************/
var MinMaxClip = (function () {
    function MinMaxClip(x, y) {
        this.fLo = Math.min(x, y);
        this.fHi = Math.max(x, y);
    }
    MinMaxClip.prototype.clip = function (x) {
        if (x < this.fLo) {
            return this.fLo;
        }
        else if (x > this.fHi) {
            return this.fHi;
        }
        else {
            return x;
        }
    };
    return MinMaxClip;
}());
var Interpolator = (function () {
    function Interpolator(lo, hi, v1, v2) {
        this.range = new MinMaxClip(lo, hi);
        if (hi != lo) {
            //regular case
            this.fCoef = (v2 - v1) / (hi - lo);
            this.fOffset = v1 - lo * this.fCoef;
        }
        else {
            this.fCoef = 0;
            this.fOffset = (v1 + v2) / 2;
        }
    }
    Interpolator.prototype.returnMappedValue = function (v) {
        var x = this.range.clip(v);
        return this.fOffset + x * this.fCoef;
    };
    Interpolator.prototype.getLowHigh = function (amin, amax) {
        return { amin: this.range.fLo, amax: this.range.fHi };
    };
    return Interpolator;
}());
var Interpolator3pt = (function () {
    function Interpolator3pt(lo, mid, hi, v1, vMid, v2) {
        this.fSegment1 = new Interpolator(lo, mid, v1, vMid);
        this.fSegment2 = new Interpolator(mid, hi, vMid, v2);
        this.fMiddle = mid;
    }
    Interpolator3pt.prototype.returnMappedValue = function (x) {
        return (x < this.fMiddle) ? this.fSegment1.returnMappedValue(x) : this.fSegment2.returnMappedValue(x);
    };
    Interpolator3pt.prototype.getMappingValues = function (amin, amid, amax) {
        var lowHighSegment1 = this.fSegment1.getLowHigh(amin, amid);
        var lowHighSegment2 = this.fSegment2.getLowHigh(amid, amax);
        return { amin: lowHighSegment1.amin, amid: lowHighSegment2.amin, amax: lowHighSegment2.amax };
    };
    return Interpolator3pt;
}());
var AccUpConverter = (function () {
    function AccUpConverter(amin, amid, amax, fmin, fmid, fmax) {
        this.fActive = true;
        this.accToFaust = new Interpolator3pt(amin, amid, amax, fmin, fmid, fmax);
        this.faustToAcc = new Interpolator3pt(fmin, fmid, fmax, amin, amid, amax);
    }
    AccUpConverter.prototype.uiToFaust = function (x) { return this.accToFaust.returnMappedValue(x); };
    AccUpConverter.prototype.faustToUi = function (x) { return this.accToFaust.returnMappedValue(x); };
    ;
    AccUpConverter.prototype.setMappingValues = function (amin, amid, amax, min, init, max) {
        this.accToFaust = new Interpolator3pt(amin, amid, amax, min, init, max);
        this.faustToAcc = new Interpolator3pt(min, init, max, amin, amid, amax);
    };
    ;
    AccUpConverter.prototype.getMappingValues = function (amin, amid, amax) {
        return this.accToFaust.getMappingValues(amin, amid, amax);
    };
    ;
    AccUpConverter.prototype.setActive = function (onOff) { this.fActive = onOff; };
    ;
    AccUpConverter.prototype.getActive = function () { return this.fActive; };
    ;
    return AccUpConverter;
}());
var AccDownConverter = (function () {
    function AccDownConverter(amin, amid, amax, fmin, fmid, fmax) {
        this.fActive = true;
        this.accToFaust = new Interpolator3pt(amin, amid, amax, fmax, fmid, fmin);
        this.faustToAcc = new Interpolator3pt(fmin, fmid, fmax, amax, amid, amin);
    }
    AccDownConverter.prototype.uiToFaust = function (x) { return this.accToFaust.returnMappedValue(x); };
    AccDownConverter.prototype.faustToUi = function (x) { return this.accToFaust.returnMappedValue(x); };
    ;
    AccDownConverter.prototype.setMappingValues = function (amin, amid, amax, min, init, max) {
        this.accToFaust = new Interpolator3pt(amin, amid, amax, max, init, min);
        this.faustToAcc = new Interpolator3pt(min, init, max, amax, amid, amin);
    };
    ;
    AccDownConverter.prototype.getMappingValues = function (amin, amid, amax) {
        return this.accToFaust.getMappingValues(amin, amid, amax);
    };
    ;
    AccDownConverter.prototype.setActive = function (onOff) { this.fActive = onOff; };
    ;
    AccDownConverter.prototype.getActive = function () { return this.fActive; };
    ;
    return AccDownConverter;
}());
var AccUpDownConverter = (function () {
    function AccUpDownConverter(amin, amid, amax, fmin, fmid, fmax) {
        this.fActive = true;
        this.accToFaust = new Interpolator3pt(amin, amid, amax, fmin, fmax, fmin);
        this.faustToAcc = new Interpolator(fmin, fmax, amin, amax);
    }
    AccUpDownConverter.prototype.uiToFaust = function (x) { return this.accToFaust.returnMappedValue(x); };
    AccUpDownConverter.prototype.faustToUi = function (x) { return this.accToFaust.returnMappedValue(x); };
    ;
    AccUpDownConverter.prototype.setMappingValues = function (amin, amid, amax, min, init, max) {
        this.accToFaust = new Interpolator3pt(amin, amid, amax, min, max, min);
        this.faustToAcc = new Interpolator(min, max, amin, amax);
    };
    ;
    AccUpDownConverter.prototype.getMappingValues = function (amin, amid, amax) {
        return this.accToFaust.getMappingValues(amin, amid, amax);
    };
    ;
    AccUpDownConverter.prototype.setActive = function (onOff) { this.fActive = onOff; };
    ;
    AccUpDownConverter.prototype.getActive = function () { return this.fActive; };
    ;
    return AccUpDownConverter;
}());
var AccDownUpConverter = (function () {
    function AccDownUpConverter(amin, amid, amax, fmin, fmid, fmax) {
        this.fActive = true;
        this.accToFaust = new Interpolator3pt(amin, amid, amax, fmax, fmin, fmax);
        this.faustToAcc = new Interpolator(fmin, fmax, amin, amax);
    }
    AccDownUpConverter.prototype.uiToFaust = function (x) { return this.accToFaust.returnMappedValue(x); };
    AccDownUpConverter.prototype.faustToUi = function (x) { return this.accToFaust.returnMappedValue(x); };
    ;
    AccDownUpConverter.prototype.setMappingValues = function (amin, amid, amax, min, init, max) {
        this.accToFaust = new Interpolator3pt(amin, amid, amax, max, min, max);
        this.faustToAcc = new Interpolator(min, max, amin, amax);
    };
    ;
    AccDownUpConverter.prototype.getMappingValues = function (amin, amid, amax) {
        return this.accToFaust.getMappingValues(amin, amid, amax);
    };
    ;
    AccDownUpConverter.prototype.setActive = function (onOff) { this.fActive = onOff; };
    ;
    AccDownUpConverter.prototype.getActive = function () { return this.fActive; };
    ;
    return AccDownUpConverter;
}());
/// <reference path="../Accelerometer.ts"/>
/*				FAUSTINTERFACE.JS

    HELPER FUNCTIONS TO CREATE FAUST INTERFACES

    FIRST PART --> DECODE JSON ENCODED INTERFACE
    SECOND PART --> ADD GRAPHICAL OBJECTS TO INTERFACE
*/
"use strict";
var FaustInterfaceControler = (function () {
    function FaustInterfaceControler(interfaceCallback, setDSPValueCallback, setSVGInterfaceCallback) {
        this.accDefault = "0 0 -10 0 10";
        this.interfaceCallback = interfaceCallback;
        this.setDSPValueCallback = setDSPValueCallback;
        this.setSVGInterfaceCallback = setSVGInterfaceCallback;
    }
    //parse interface json from faust webaudio-asm-wrapper to create corresponding FaustInterfaceControler
    FaustInterfaceControler.prototype.parseFaustJsonUI = function (ui, module) {
        this.faustControlers = [];
        for (var i = 0; i < ui.length; i++) {
            this.parse_group(ui[i], module);
        }
        return this.faustControlers;
    };
    FaustInterfaceControler.prototype.parse_group = function (group, module) {
        if (group.items)
            this.parse_items(group.items, module);
    };
    FaustInterfaceControler.prototype.parse_item = function (item, module) {
        var _this = this;

        if (item.type === "vgroup" || item.type === "hgroup" || item.type === "tgroup") {
            this.parse_items(item.items, module);
        }
        else if (item.type === "vslider" || item.type === "hslider") {
            var itemElement = item;
            var controler = new FaustInterfaceControler(function () { _this.interfaceCallback(controler); }, function (adress, value) { _this.setDSPValueCallback(adress, value); }, function (adress, value) { _this.setSVGInterfaceCallback(adress, value); });
            controler.name = itemElement.label;
            controler.itemParam = itemElement;
            controler.value = itemElement.init;
            this.faustControlers.push(controler);
        }
        else if (item.type === "button") {
            var itemElement = item;
            var controler = new FaustInterfaceControler(function (faustInterface) { _this.interfaceCallback(faustInterface); }, function (adress, value) { _this.setDSPValueCallback(adress, value); }, function (adress, value) { _this.setSVGInterfaceCallback(adress, value); });
            controler.itemParam = itemElement;
            controler.value = "0";
            this.faustControlers.push(controler);
        }
        else if (item.type === "checkbox") {
            var itemElement = item;
            var controler = new FaustInterfaceControler(function (faustInterface) { _this.interfaceCallback(faustInterface); }, function (adress, value) { _this.setDSPValueCallback(adress, value); }, function (adress, value) { _this.setSVGInterfaceCallback(adress, value); });
            controler.itemParam = itemElement;
            controler.value = "0";
            this.faustControlers.push(controler);
        }
    };
    FaustInterfaceControler.prototype.parse_items = function (items, node) {
        for (var i = 0; i < items.length; i++)
            this.parse_item(items[i], node);
    };
    FaustInterfaceControler.prototype.setParams = function () {
        if (this.itemParam.meta != undefined) {
            for (var j = 0; j < this.itemParam.meta.length; j++) {
                if (this.itemParam.meta[j].unit) {
                    this.unit = this.itemParam.meta[j].unit;
                }
            }
        }
        if (this.unit == undefined) {
            this.unit = "";
        }
        if (this.itemParam.step != undefined) {
            var precision = this.itemParam.step.toString().split('.').pop().length;
            this.precision = String(precision);
        }
        this.accParams = {
            isEnabled: this.isEnabled,
            acc: this.acc,
            address: this.itemParam.address,
            init: parseFloat(this.itemParam.init),
            max: parseFloat(this.itemParam.max),
            min: parseFloat(this.itemParam.min),
            label: this.itemParam.label
        };
    };


    //attach acceleromterSlider to faustInterfaceControler
    //give the acc or noacc values
    //if no accelerometer value, it create a default noacc one
    FaustInterfaceControler.prototype.createAccelerometer = function () {
        var _this = this;
        if (this.itemParam.meta) {
            var meta = this.itemParam.meta;
            for (var i = 0; i < meta.length; i++) {
                if (meta[i].acc) {
                    this.acc = meta[i].acc;
                    this.accParams.acc = this.acc;
                    this.accParams.isEnabled = true;
                    AccelerometerHandler.registerAcceleratedSlider(this.accParams, this);
                    //console.log(this.accParams);
                    this.accelerometerSlider.callbackValueChange = function (address, value) { _this.callbackValueChange(address, value); };
                    this.accelerometerSlider.isEnabled = true;
                    this.accelerometerSlider.isActive = true;

                }
                else if (meta[i].noacc) {
                    this.acc = meta[i].noacc;
                    this.accParams.acc = this.acc;
                    this.accParams.isEnabled = false;
                    AccelerometerHandler.registerAcceleratedSlider(this.accParams, this);
                    this.accelerometerSlider.callbackValueChange = function (address, value) { _this.callbackValueChange(address, value); };
                    this.accelerometerSlider.isEnabled = false;

                }
            }
            if (this.accelerometerSlider == undefined) {
                this.acc = this.accDefault;
                this.accParams.acc = this.acc;
                this.accParams.isEnabled = false;
                AccelerometerHandler.registerAcceleratedSlider(this.accParams, this);
                this.accelerometerSlider.callbackValueChange = function (address, value) { _this.callbackValueChange(address, value); };
                this.accelerometerSlider.isEnabled = false;

            }
        }
        else {
            this.acc = this.accDefault;
            this.accParams.acc = this.acc;
            this.accParams.isEnabled = false;
            AccelerometerHandler.registerAcceleratedSlider(this.accParams, this);
            this.accelerometerSlider.callbackValueChange = function (address, value) { _this.callbackValueChange(address, value); };
            this.accelerometerSlider.isEnabled = false;

        }
    };
    //callback to update the dsp value
    FaustInterfaceControler.prototype.callbackValueChange = function (address, value) {
        this.setDSPValueCallback(address, value);
        this.setSVGInterfaceCallback(address, value);

    };
    return FaustInterfaceControler;
}());
