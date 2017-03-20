/* ------------------------------------------------------------
name: "crescendo"
Code generated with Faust 2.0.a58 (http://faust.grame.fr)
------------------------------------------------------------ */
/*
 faust2webaudio
 
 Primarily written by Myles Borins
 During the Spring 2013 offering of Music 420b with Julius Smith
 A bit during the Summer of 2013 with the help of Joshua Kit Clayton
 And finally a sprint during the late fall of 2013 to get everything working
 A Special thanks to Yann Orlarey and Stéphane Letz
 
 faust2webaudio is distributed under the terms the MIT or GPL2 Licenses.
 Choose the license that best suits your project. The text of the MIT and GPL
 licenses are at the root directory.
 
 Additional code : GRAME 2014
 
 */
 
'use strict';

var faust = faust || {};



function crescendoModule(global, foreign, buffer) {
	
	'use asm';
	
	var HEAP32 = new global.Int32Array(buffer);
	var HEAPF = new global.Float32Array(buffer);
	
	var imul = global.Math.imul;
	var log = global.Math.log;
	
	var max_f = global.Math.max;
	var min_f = global.Math.min;
	function fmodf(x, y) { x = +x; y = +y; return +(x % y); }
	function log10f(a) { a = +a; return +(+log(a) / +log(10.)); }
	
	function getNumInputs(dsp) {
		dsp = dsp | 0;
		return 2;
	}
	
	function getNumOutputs(dsp) {
		dsp = dsp | 0;
		return 2;
	}
	
	function classInit(dsp, samplingFreq) {
		dsp = dsp | 0;
		samplingFreq = samplingFreq | 0;
		
	}
	
	function instanceConstants(dsp, samplingFreq) {
		dsp = dsp | 0;
		samplingFreq = samplingFreq | 0;
		HEAP32[dsp + 0 >> 2] = (samplingFreq | 0);
		
	}
	
	function instanceResetUserInterface(dsp) {
		dsp = dsp | 0;
		HEAPF[dsp + 12 >> 2] = 0.;
		
	}
	
	function instanceClear(dsp) {
		dsp = dsp | 0;
		var l0 = 0;
		for (l0 = 0; (((l0 | 0) < 2) | 0); l0 = (((l0 | 0) + 1) | 0)) {
			HEAPF[dsp + 4 + ((l0 | 0) << 2) >> 2] = 0.;
			
		}
		
	}
	
	function init(dsp, samplingFreq) {
		dsp = dsp | 0;
		samplingFreq = samplingFreq | 0;
		classInit(dsp, samplingFreq);
		instanceInit(dsp, samplingFreq);
	}
	
	function instanceInit(dsp, samplingFreq) {
		dsp = dsp | 0;
		samplingFreq = samplingFreq | 0;
		instanceConstants(dsp, samplingFreq);
		instanceResetUserInterface(dsp);
		instanceClear(dsp);
	}
	
	function getSampleRate(dsp) {
		dsp = dsp | 0;
		return HEAP32[dsp + 0 >> 2] | 0;
	}
	
	function setParamValue(dsp, offset, value) {
		dsp = dsp | 0;
		offset = offset | 0;
		value = +value;
		HEAPF[dsp + offset >> 2] = value;
	}
	
	function getParamValue(dsp, offset) {
		dsp = dsp | 0;
		offset = offset | 0;
		return +(HEAPF[dsp + offset >> 2]);
	}
	
	function compute(dsp, count, inputs, outputs) {
		dsp = dsp | 0;
		count = count | 0;
		inputs = inputs | 0;
		outputs = outputs | 0;
		var input0 = 0;
		var input1 = 0;
		var output0 = 0;
		var output1 = 0;
		var fSlow0 = 0.;
		var i = 0;
		var fTemp0 = 0.;
		input0 = (HEAP32[inputs + (0 << 2) >> 2] | 0);
		input1 = (HEAP32[inputs + (1 << 2) >> 2] | 0);
		output0 = (HEAP32[outputs + (0 << 2) >> 2] | 0);
		output1 = (HEAP32[outputs + (1 << 2) >> 2] | 0);
		fSlow0 = +(0.00100000005 * +(max_f(0., +(+(HEAPF[dsp + 12 >> 2])))));
		for (i = 0; (((i | 0) < (count | 0)) | 0); i = (((i | 0) + 1) | 0)) {
			HEAPF[dsp + 4 + (0 << 2) >> 2] = +(+(fSlow0) + +(0.999000013 * +(HEAPF[dsp + 4 + (1 << 2) >> 2])));
			fTemp0 = +(min_f(1., +(HEAPF[dsp + 4 + (0 << 2) >> 2])));
			HEAPF[output0 + ((i | 0) << 2) >> 2] = +(+(+(+(HEAPF[input0 + ((i | 0) << 2) >> 2])) * +(fTemp0)));
			HEAPF[output1 + ((i | 0) << 2) >> 2] = +(+(+(+(HEAPF[input1 + ((i | 0) << 2) >> 2])) * +(fTemp0)));
			HEAPF[dsp + 4 + (1 << 2) >> 2] = +(HEAPF[dsp + 4 + (0 << 2) >> 2]);
			
		}
		
	}
	
	return { getNumInputs : getNumInputs, getNumOutputs : getNumOutputs, classInit : classInit, instanceInit : instanceInit, instanceConstants : instanceConstants, instanceResetUserInterface : instanceResetUserInterface, instanceClear : instanceClear, init : init, getSampleRate : getSampleRate, setParamValue : setParamValue, getParamValue : getParamValue, compute : compute };
}

function getSizecrescendo() {
	return 16;
}

function getPathTablecrescendo() {
	var pathTable = [];
	pathTable["/0x00/izone"] = 12;
	return pathTable;
}

function getJSONcrescendo() {
	return "{  \"name\": \"crescendo\",  \"inputs\": \"2\",  \"outputs\": \"2\",  \"meta\": [    { \"name\": \"crescendo\" },   { \"signals.lib/name\": \"Faust Signal Routing Library\" },   { \"signals.lib/version\": \"0.0\" }  ],  \"ui\": [    {    \"type\": \"vgroup\",    \"label\": \"0x00\",    \"items\": [      {      \"type\": \"vslider\",      \"label\": \"izone\",      \"address\": \"/0x00/izone\",      \"init\": \"0\",      \"min\": \"0\",      \"max\": \"1\",      \"step\": \"0.001\"     }    ]   }  ] } ";
}

function metadatacrescendo(m) {
	m.declare("name", "crescendo");
	m.declare("signals.lib/name", "Faust Signal Routing Library");
	m.declare("signals.lib/version", "0.0");
}


// Standard Faust DSP

faust.crescendo = function (context, buffer_size) {

    var handler = null;
    var ins, outs;
    var scriptProcessor;
    
    var dspInChannnels = [];
    var dspOutChannnels = [];
   
    // Keep JSON parsed object
    var jon_object = JSON.parse(getJSONcrescendo());
    
    function getNumInputsAux () 
    {
        return (jon_object.inputs !== undefined) ? parseInt(jon_object.inputs) : 0;
    }
    
    function getNumOutputsAux () 
    {
        return (jon_object.outputs !== undefined) ? parseInt(jon_object.outputs) : 0;
    }
    
    var numIn = getNumInputsAux();
    var numOut = getNumOutputsAux();
     
    // Memory allocator
    var ptr_size = 4; 
    var sample_size = 4;
    
    function pow2limit (x)
    {
        var n = 2;
        while (n < x) { n = 2 * n; }
        return (n < 65536) ? 65536 : n; // Minimum = 64 kB
    }
     
    var memory_size = pow2limit(getSizecrescendo() + (numIn + numOut) * (ptr_size + (buffer_size * sample_size)));
   
    var HEAP = new ArrayBuffer(memory_size);
    var HEAP32 = new Int32Array(HEAP);
    var HEAPF32 = new Float32Array(HEAP);
     
    console.log(HEAP);
    console.log(HEAP32);
    console.log(HEAPF32);
 
    // bargraph
    var ouputs_timer = 5;
    var ouputs_items = [];
     
    // input items
    var inputs_items = [];
     
    // Start of HEAP index
    var audio_heap_ptr = 0;
     
    // Setup pointers offset
    var audio_heap_ptr_inputs = audio_heap_ptr; 
    var audio_heap_ptr_outputs = audio_heap_ptr_inputs + (numIn * ptr_size);
     
    // Setup buffer offset
    var audio_heap_inputs = audio_heap_ptr_outputs + (numOut * ptr_size);
    var audio_heap_outputs = audio_heap_inputs + (numIn * buffer_size * sample_size);
    
    // Setup DSP offset
    var dsp_start = audio_heap_outputs + (numOut * buffer_size * sample_size);
     
    // Start of DSP memory
    var dsp = dsp_start;
 
    // ASM module
    var factory = crescendoModule(window, null, HEAP);
    console.log(factory);
 
    var pathTable = getPathTablecrescendo();
    
    // Allocate table for 'setParamValue'
    var value_table = [];
        
    function update_outputs () 
    {
        if (ouputs_items.length > 0 && handler && ouputs_timer-- === 0) {
            ouputs_timer = 5;
            for (var i = 0; i < ouputs_items.length; i++) {
                handler(ouputs_items[i], factory.getParamValue(dsp, pathTable[ouputs_items[i]]));
            }
        }
    }
    
    function compute (e) 
    {
        var i, j;
        
        // Read inputs
        for (i = 0; i < numIn; i++) {
            var input = e.inputBuffer.getChannelData(i);
            var dspInput = dspInChannnels[i];
            for (j = 0; j < input.length; j++) {
                dspInput[j] = input[j];
            }
        }
        
        // Update control state
        for (i = 0; i < inputs_items.length; i++) {
            var path = inputs_items[i];
            var values = value_table[path];
            factory.setParamValue(dsp, pathTable[path], values[0]);
            values[0] = values[1];
        }
        
        // Compute
        factory.compute(dsp, buffer_size, ins, outs);
       
        // Update bargraph
        update_outputs();
        
        // Write outputs
        for (i = 0; i < numOut; i++) {
            var output = e.outputBuffer.getChannelData(i);
            var dspOutput = dspOutChannnels[i];
            for (j = 0; j < output.length; j++) {
                output[j] = dspOutput[j];
            }
        }
    };
         
    // JSON parsing
    function parse_ui (ui) 
    {
        for (var i = 0; i < ui.length; i++) {
            parse_group(ui[i]);
        }
    }
    
    function parse_group (group) 
    {
        if (group.items) {
            parse_items(group.items);
        }
    }
    
    function parse_items (items) 
    {
        var i;
        for (i = 0; i < items.length; i++) {
            parse_item(items[i]);
        }
    }
    
    function parse_item (item) 
    {
        if (item.type === "vgroup" || item.type === "hgroup" || item.type === "tgroup") {
            parse_items(item.items);
        } else if (item.type === "hbargraph" || item.type === "vbargraph") {
            // Keep bargraph adresses
            ouputs_items.push(item.address);
        } else if (item.type === "vslider" || item.type === "hslider" || item.type === "button" || item.type === "checkbox" || item.type === "nentry") {
            // Keep inputs adresses
            inputs_items.push(item.address);
        }
    }
      
    function init ()
    {
        var i;
         
        // Setup web audio context
        console.log("buffer_size %d", buffer_size);
        scriptProcessor = context.createScriptProcessor(buffer_size, numIn, numOut);
        scriptProcessor.onaudioprocess = compute;
        
        if (numIn > 0) {
            ins = audio_heap_ptr_inputs; 
            for (i = 0; i < numIn; i++) { 
                HEAP32[(ins >> 2) + i] = audio_heap_inputs + ((buffer_size * sample_size) * i);
            }
     
            // Prepare Ins buffer tables
            var dspInChans = HEAP32.subarray(ins >> 2, (ins + numIn * ptr_size) >> 2);
            for (i = 0; i < numIn; i++) {
                dspInChannnels[i] = HEAPF32.subarray(dspInChans[i] >> 2, (dspInChans[i] + buffer_size * sample_size) >> 2);
            }
        }
        
        if (numOut > 0) {
            outs = audio_heap_ptr_outputs; 
            for (i = 0; i < numOut; i++) { 
                HEAP32[(outs >> 2) + i] = audio_heap_outputs + ((buffer_size * sample_size) * i);
            }
          
            // Prepare Out buffer tables
            var dspOutChans = HEAP32.subarray(outs >> 2, (outs + numOut * ptr_size) >> 2);
            for (i = 0; i < numOut; i++) {
                dspOutChannnels[i] = HEAPF32.subarray(dspOutChans[i] >> 2, (dspOutChans[i] + buffer_size * sample_size) >> 2);
            }
        }
                                
        // bargraph
        parse_ui(jon_object.ui);
        
        // Init DSP
        factory.init(dsp, context.sampleRate);
        
        // Init 'value' table
        for (i = 0; i < inputs_items.length; i++) {
            var path = inputs_items[i];
            var values = new Float32Array(2);
            values[0] = values[1] = factory.getParamValue(dsp, pathTable[path]);
            value_table[path] = values;
        }
    }
    
    init();
    
    // External API
    return {
    	
        destroy : function ()
        {
            // Nothing to do
        },
        
        getNumInputs : function () 
        {
            return getNumInputsAux();
        },
        
        getNumOutputs : function () 
        {
            return getNumOutputsAux();
        },
        
        init : function (sample_rate) 
        {
            factory.init(dsp, sample_rate);
        },
        
        instanceInit : function (sample_rate) 
        {
            factory.instanceInit(dsp, sample_rate);
        },
        
        instanceConstants : function (sample_rate) 
        {
            factory.instanceConstants(dsp, sample_rate);
        },
        
        instanceResetUserInterface : function () 
        {
            factory.instanceResetUserInterface(dsp);
        },
        
        instanceClear : function () 
        {
            factory.instanceClear(dsp);
        },
        
        // Connect/disconnect to another node
        connect : function (node) 
        {
            if (node.getProcessor !== undefined) {
                scriptProcessor.connect(node.getProcessor());
            } else {
                scriptProcessor.connect(node);
            }
        },

        disconnect : function (node) 
        {
            if (node.getProcessor !== undefined) {
                scriptProcessor.disconnect(node.getProcessor());
            } else {
                scriptProcessor.disconnect(node);
            }
        },
        
        setHandler : function (hd)
        {
            handler = hd;
        },
        
        start : function () 
        {
            scriptProcessor.connect(context.destination);
        },

        stop : function () 
        {
            scriptProcessor.disconnect(context.destination);
        },

        setParamValue : function (path, val) 
        {
            var values = value_table[path];
            if (values) {
                if (factory.getParamValue(dsp, pathTable[path]) === values[0]) {
                    values[0] = val;
                } 
                values[1] = val;
            }
        },

        getParamValue : function (path) 
        {
            return factory.getParamValue(dsp, pathTable[path]);
        },
        
        controls : function()
        {
            return inputs_items;
        },
        
        json : function ()
        {
            return getJSONcrescendo();
        },
        
        getProcessor : function ()
        {
            return scriptProcessor;
        }
    };
};

