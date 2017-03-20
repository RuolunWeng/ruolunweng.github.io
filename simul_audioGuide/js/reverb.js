/* ------------------------------------------------------------
copyright: "GRAME"
license: "STK-4.3"
name: "Zverb4"
version: "1.33"
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



function reverbModule(global, foreign, buffer) {
	
	'use asm';
	
	var HEAP32 = new global.Int32Array(buffer);
	var HEAPF = new global.Float32Array(buffer);
	
	var imul = global.Math.imul;
	var log = global.Math.log;
	
	var cosf = global.Math.cos;
	var expf = global.Math.exp;
	var floorf = global.Math.floor;
	var max_f = global.Math.max;
	var min_f = global.Math.min;
	var sqrtf = global.Math.sqrt;
	var tanf = global.Math.tan;
	function reverb_faustpower2_f(value) {
		value = +(value);
		return +(+(+(value) * +(value)));
		
	}
	
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
		HEAP32[dsp + 32 >> 2] = (samplingFreq | 0);
		HEAPF[dsp + 291020 >> 2] = +(min_f(192000., +(max_f(1., +((HEAP32[dsp + 32 >> 2] | 0))))));
		HEAPF[dsp + 291024 >> 2] = +(0.00100000005 * +(HEAPF[dsp + 291020 >> 2]));
		HEAPF[dsp + 291032 >> 2] = +(cosf(+(9424.77832 / +(HEAPF[dsp + 291020 >> 2]))));
		HEAPF[dsp + 291036 >> 2] = +(floorf(+(+(0.153128996 * +(HEAPF[dsp + 291020 >> 2])) + 0.5)));
		HEAPF[dsp + 291040 >> 2] = +(+(0. - +(6.90775537 * +(HEAPF[dsp + 291036 >> 2]))) / +(HEAPF[dsp + 291020 >> 2]));
		HEAPF[dsp + 291052 >> 2] = +(1. / +(tanf(+(989.601685 / +(HEAPF[dsp + 291020 >> 2])))));
		HEAPF[dsp + 291056 >> 2] = +(+(HEAPF[dsp + 291052 >> 2]) + 1.);
		HEAPF[dsp + 291060 >> 2] = +(1. / +(HEAPF[dsp + 291056 >> 2]));
		HEAPF[dsp + 291064 >> 2] = +(0. - +(+(1. - +(HEAPF[dsp + 291052 >> 2])) / +(HEAPF[dsp + 291056 >> 2])));
		HEAPF[dsp + 291068 >> 2] = +(floorf(+(+(0.0203460008 * +(HEAPF[dsp + 291020 >> 2])) + 0.5)));
		HEAP32[dsp + 28 >> 2] = ((~~(+(+(HEAPF[dsp + 291036 >> 2]) - +(HEAPF[dsp + 291068 >> 2]))) & 8191) | 0);
		HEAP32[dsp + 24 >> 2] = ((~~(+(+(HEAPF[dsp + 291068 >> 2]) + -1.)) & 1023) | 0);
		HEAPF[dsp + 291072 >> 2] = +(floorf(+(+(0.127837002 * +(HEAPF[dsp + 291020 >> 2])) + 0.5)));
		HEAPF[dsp + 291076 >> 2] = +(+(0. - +(6.90775537 * +(HEAPF[dsp + 291072 >> 2]))) / +(HEAPF[dsp + 291020 >> 2]));
		HEAPF[dsp + 291080 >> 2] = +(floorf(+(+(0.0316039994 * +(HEAPF[dsp + 291020 >> 2])) + 0.5)));
		HEAP32[dsp + 20 >> 2] = ((~~(+(+(HEAPF[dsp + 291072 >> 2]) - +(HEAPF[dsp + 291080 >> 2]))) & 8191) | 0);
		HEAP32[dsp + 16 >> 2] = ((~~(+(+(HEAPF[dsp + 291080 >> 2]) + -1.)) & 2047) | 0);
		HEAPF[dsp + 291084 >> 2] = +(floorf(+(+(0.210389003 * +(HEAPF[dsp + 291020 >> 2])) + 0.5)));
		HEAPF[dsp + 291088 >> 2] = +(+(0. - +(6.90775537 * +(HEAPF[dsp + 291084 >> 2]))) / +(HEAPF[dsp + 291020 >> 2]));
		HEAPF[dsp + 291092 >> 2] = +(floorf(+(+(0.0244210009 * +(HEAPF[dsp + 291020 >> 2])) + 0.5)));
		HEAP32[dsp + 12 >> 2] = ((~~(+(+(HEAPF[dsp + 291084 >> 2]) - +(HEAPF[dsp + 291092 >> 2]))) & 16383) | 0);
		HEAP32[dsp + 8 >> 2] = ((~~(+(+(HEAPF[dsp + 291092 >> 2]) + -1.)) & 2047) | 0);
		HEAPF[dsp + 291096 >> 2] = +(floorf(+(+(0.256891012 * +(HEAPF[dsp + 291020 >> 2])) + 0.5)));
		HEAPF[dsp + 291100 >> 2] = +(+(0. - +(6.90775537 * +(HEAPF[dsp + 291096 >> 2]))) / +(HEAPF[dsp + 291020 >> 2]));
		HEAPF[dsp + 291104 >> 2] = +(floorf(+(+(0.0273330007 * +(HEAPF[dsp + 291020 >> 2])) + 0.5)));
		HEAP32[dsp + 4 >> 2] = ((~~(+(+(HEAPF[dsp + 291096 >> 2]) - +(HEAPF[dsp + 291104 >> 2]))) & 16383) | 0);
		HEAP32[dsp + 0 >> 2] = ((~~(+(+(HEAPF[dsp + 291104 >> 2]) + -1.)) & 2047) | 0);
		
	}
	
	function instanceResetUserInterface(dsp) {
		dsp = dsp | 0;
		HEAPF[dsp + 291016 >> 2] = 0.;
		HEAPF[dsp + 291028 >> 2] = 20.;
		HEAPF[dsp + 291044 >> 2] = 5.;
		HEAPF[dsp + 291048 >> 2] = 3.;
		
	}
	
	function instanceClear(dsp) {
		dsp = dsp | 0;
		var l0 = 0;
		var l1 = 0;
		var l2 = 0;
		var l3 = 0;
		var l4 = 0;
		var l5 = 0;
		var l6 = 0;
		var l7 = 0;
		var l8 = 0;
		var l9 = 0;
		var l10 = 0;
		var l11 = 0;
		var l12 = 0;
		var l13 = 0;
		var l14 = 0;
		var l15 = 0;
		var l16 = 0;
		var l17 = 0;
		var l18 = 0;
		var l19 = 0;
		var l20 = 0;
		var l21 = 0;
		var l22 = 0;
		var l23 = 0;
		var l24 = 0;
		var l25 = 0;
		var l26 = 0;
		var l27 = 0;
		for (l0 = 0; (((l0 | 0) < 2) | 0); l0 = (((l0 | 0) + 1) | 0)) {
			HEAPF[dsp + 290904 + ((l0 | 0) << 2) >> 2] = 0.;
			
		}
		HEAP32[dsp + 36 >> 2] = 0;
		for (l1 = 0; (((l1 | 0) < 8192) | 0); l1 = (((l1 | 0) + 1) | 0)) {
			HEAPF[dsp + 131112 + ((l1 | 0) << 2) >> 2] = 0.;
			
		}
		for (l2 = 0; (((l2 | 0) < 2) | 0); l2 = (((l2 | 0) + 1) | 0)) {
			HEAPF[dsp + 290912 + ((l2 | 0) << 2) >> 2] = 0.;
			
		}
		for (l3 = 0; (((l3 | 0) < 2) | 0); l3 = (((l3 | 0) + 1) | 0)) {
			HEAPF[dsp + 290920 + ((l3 | 0) << 2) >> 2] = 0.;
			
		}
		for (l4 = 0; (((l4 | 0) < 8192) | 0); l4 = (((l4 | 0) + 1) | 0)) {
			HEAPF[dsp + 163880 + ((l4 | 0) << 2) >> 2] = 0.;
			
		}
		for (l5 = 0; (((l5 | 0) < 1024) | 0); l5 = (((l5 | 0) + 1) | 0)) {
			HEAPF[dsp + 286760 + ((l5 | 0) << 2) >> 2] = 0.;
			
		}
		for (l6 = 0; (((l6 | 0) < 2) | 0); l6 = (((l6 | 0) + 1) | 0)) {
			HEAPF[dsp + 290928 + ((l6 | 0) << 2) >> 2] = 0.;
			
		}
		for (l7 = 0; (((l7 | 0) < 2) | 0); l7 = (((l7 | 0) + 1) | 0)) {
			HEAPF[dsp + 290936 + ((l7 | 0) << 2) >> 2] = 0.;
			
		}
		for (l8 = 0; (((l8 | 0) < 2) | 0); l8 = (((l8 | 0) + 1) | 0)) {
			HEAPF[dsp + 290944 + ((l8 | 0) << 2) >> 2] = 0.;
			
		}
		for (l9 = 0; (((l9 | 0) < 8192) | 0); l9 = (((l9 | 0) + 1) | 0)) {
			HEAPF[dsp + 196648 + ((l9 | 0) << 2) >> 2] = 0.;
			
		}
		for (l10 = 0; (((l10 | 0) < 2048) | 0); l10 = (((l10 | 0) + 1) | 0)) {
			HEAPF[dsp + 262184 + ((l10 | 0) << 2) >> 2] = 0.;
			
		}
		for (l11 = 0; (((l11 | 0) < 2) | 0); l11 = (((l11 | 0) + 1) | 0)) {
			HEAPF[dsp + 290952 + ((l11 | 0) << 2) >> 2] = 0.;
			
		}
		for (l12 = 0; (((l12 | 0) < 2) | 0); l12 = (((l12 | 0) + 1) | 0)) {
			HEAPF[dsp + 290960 + ((l12 | 0) << 2) >> 2] = 0.;
			
		}
		for (l13 = 0; (((l13 | 0) < 2) | 0); l13 = (((l13 | 0) + 1) | 0)) {
			HEAPF[dsp + 290968 + ((l13 | 0) << 2) >> 2] = 0.;
			
		}
		for (l14 = 0; (((l14 | 0) < 16384) | 0); l14 = (((l14 | 0) + 1) | 0)) {
			HEAPF[dsp + 40 + ((l14 | 0) << 2) >> 2] = 0.;
			
		}
		for (l15 = 0; (((l15 | 0) < 8192) | 0); l15 = (((l15 | 0) + 1) | 0)) {
			HEAPF[dsp + 229416 + ((l15 | 0) << 2) >> 2] = 0.;
			
		}
		for (l16 = 0; (((l16 | 0) < 2048) | 0); l16 = (((l16 | 0) + 1) | 0)) {
			HEAPF[dsp + 270376 + ((l16 | 0) << 2) >> 2] = 0.;
			
		}
		for (l17 = 0; (((l17 | 0) < 2) | 0); l17 = (((l17 | 0) + 1) | 0)) {
			HEAPF[dsp + 290976 + ((l17 | 0) << 2) >> 2] = 0.;
			
		}
		for (l18 = 0; (((l18 | 0) < 2) | 0); l18 = (((l18 | 0) + 1) | 0)) {
			HEAPF[dsp + 290984 + ((l18 | 0) << 2) >> 2] = 0.;
			
		}
		for (l19 = 0; (((l19 | 0) < 2) | 0); l19 = (((l19 | 0) + 1) | 0)) {
			HEAPF[dsp + 290992 + ((l19 | 0) << 2) >> 2] = 0.;
			
		}
		for (l20 = 0; (((l20 | 0) < 16384) | 0); l20 = (((l20 | 0) + 1) | 0)) {
			HEAPF[dsp + 65576 + ((l20 | 0) << 2) >> 2] = 0.;
			
		}
		for (l21 = 0; (((l21 | 0) < 2048) | 0); l21 = (((l21 | 0) + 1) | 0)) {
			HEAPF[dsp + 278568 + ((l21 | 0) << 2) >> 2] = 0.;
			
		}
		for (l22 = 0; (((l22 | 0) < 2) | 0); l22 = (((l22 | 0) + 1) | 0)) {
			HEAPF[dsp + 291000 + ((l22 | 0) << 2) >> 2] = 0.;
			
		}
		for (l23 = 0; (((l23 | 0) < 3) | 0); l23 = (((l23 | 0) + 1) | 0)) {
			HEAPF[dsp + 290856 + ((l23 | 0) << 2) >> 2] = 0.;
			
		}
		for (l24 = 0; (((l24 | 0) < 3) | 0); l24 = (((l24 | 0) + 1) | 0)) {
			HEAPF[dsp + 290868 + ((l24 | 0) << 2) >> 2] = 0.;
			
		}
		for (l25 = 0; (((l25 | 0) < 3) | 0); l25 = (((l25 | 0) + 1) | 0)) {
			HEAPF[dsp + 290880 + ((l25 | 0) << 2) >> 2] = 0.;
			
		}
		for (l26 = 0; (((l26 | 0) < 3) | 0); l26 = (((l26 | 0) + 1) | 0)) {
			HEAPF[dsp + 290892 + ((l26 | 0) << 2) >> 2] = 0.;
			
		}
		for (l27 = 0; (((l27 | 0) < 2) | 0); l27 = (((l27 | 0) + 1) | 0)) {
			HEAPF[dsp + 291008 + ((l27 | 0) << 2) >> 2] = 0.;
			
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
		return HEAP32[dsp + 32 >> 2] | 0;
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
		var fSlow1 = 0.;
		var iSlow2 = 0;
		var fSlow3 = 0.;
		var fSlow4 = 0.;
		var fSlow5 = 0.;
		var fSlow6 = 0.;
		var fSlow7 = 0.;
		var fSlow8 = 0.;
		var fSlow9 = 0.;
		var fSlow10 = 0.;
		var fSlow11 = 0.;
		var fSlow12 = 0.;
		var fSlow13 = 0.;
		var fSlow14 = 0.;
		var fSlow15 = 0.;
		var fSlow16 = 0.;
		var fSlow17 = 0.;
		var fSlow18 = 0.;
		var fSlow19 = 0.;
		var fSlow20 = 0.;
		var fSlow21 = 0.;
		var fSlow22 = 0.;
		var fSlow23 = 0.;
		var fSlow24 = 0.;
		var fSlow25 = 0.;
		var fSlow26 = 0.;
		var fSlow27 = 0.;
		var fSlow28 = 0.;
		var fSlow29 = 0.;
		var fSlow30 = 0.;
		var fSlow31 = 0.;
		var fSlow32 = 0.;
		var fSlow33 = 0.;
		var fSlow34 = 0.;
		var fSlow35 = 0.;
		var fSlow36 = 0.;
		var fSlow37 = 0.;
		var fSlow38 = 0.;
		var fSlow39 = 0.;
		var fSlow40 = 0.;
		var fSlow41 = 0.;
		var i = 0;
		var fTemp0 = 0.;
		var fTemp1 = 0.;
		var fTemp2 = 0.;
		var fRec6 = 0.;
		var fTemp3 = 0.;
		var fRec10 = 0.;
		var fTemp4 = 0.;
		var fTemp5 = 0.;
		var fTemp6 = 0.;
		var fRec14 = 0.;
		var fTemp7 = 0.;
		var fRec18 = 0.;
		var fTemp8 = 0.;
		var fTemp9 = 0.;
		var fTemp10 = 0.;
		var fTemp11 = 0.;
		var fTemp12 = 0.;
		input0 = (HEAP32[inputs + (0 << 2) >> 2] | 0);
		input1 = (HEAP32[inputs + (1 << 2) >> 2] | 0);
		output0 = (HEAP32[outputs + (0 << 2) >> 2] | 0);
		output1 = (HEAP32[outputs + (1 << 2) >> 2] | 0);
		fSlow0 = +(max_f(0., +(+(HEAPF[dsp + 291016 >> 2]))));
		fSlow1 = +(0.00100000005 * +(1. - +(fSlow0)));
		iSlow2 = ((~~(+(+(HEAPF[dsp + 291024 >> 2]) * +(+(HEAPF[dsp + 291028 >> 2])))) & 8191) | 0);
		fSlow3 = +(+(HEAPF[dsp + 291044 >> 2]));
		fSlow4 = +(expf(+(+(HEAPF[dsp + 291040 >> 2]) / +(fSlow3))));
		fSlow5 = +(reverb_faustpower2_f(+(fSlow4)));
		fSlow6 = +(1. - +(+(HEAPF[dsp + 291032 >> 2]) * +(fSlow5)));
		fSlow7 = +(1. - +(fSlow5));
		fSlow8 = +(+(fSlow6) / +(fSlow7));
		fSlow9 = +(sqrtf(+(max_f(0., +(+(+(reverb_faustpower2_f(+(fSlow6))) / +(reverb_faustpower2_f(+(fSlow7)))) + -1.)))));
		fSlow10 = +(+(fSlow8) - +(fSlow9));
		fSlow11 = +(+(fSlow4) * +(+(fSlow9) + +(1. - +(fSlow8))));
		fSlow12 = +(+(HEAPF[dsp + 291048 >> 2]));
		fSlow13 = +(+(+(expf(+(+(HEAPF[dsp + 291040 >> 2]) / +(fSlow12)))) / +(fSlow4)) + -1.);
		fSlow14 = +(expf(+(+(HEAPF[dsp + 291076 >> 2]) / +(fSlow3))));
		fSlow15 = +(reverb_faustpower2_f(+(fSlow14)));
		fSlow16 = +(1. - +(+(HEAPF[dsp + 291032 >> 2]) * +(fSlow15)));
		fSlow17 = +(1. - +(fSlow15));
		fSlow18 = +(+(fSlow16) / +(fSlow17));
		fSlow19 = +(sqrtf(+(max_f(0., +(+(+(reverb_faustpower2_f(+(fSlow16))) / +(reverb_faustpower2_f(+(fSlow17)))) + -1.)))));
		fSlow20 = +(+(fSlow18) - +(fSlow19));
		fSlow21 = +(+(fSlow14) * +(+(fSlow19) + +(1. - +(fSlow18))));
		fSlow22 = +(+(+(expf(+(+(HEAPF[dsp + 291076 >> 2]) / +(fSlow12)))) / +(fSlow14)) + -1.);
		fSlow23 = +(expf(+(+(HEAPF[dsp + 291088 >> 2]) / +(fSlow3))));
		fSlow24 = +(reverb_faustpower2_f(+(fSlow23)));
		fSlow25 = +(1. - +(+(HEAPF[dsp + 291032 >> 2]) * +(fSlow24)));
		fSlow26 = +(1. - +(fSlow24));
		fSlow27 = +(+(fSlow25) / +(fSlow26));
		fSlow28 = +(sqrtf(+(max_f(0., +(+(+(reverb_faustpower2_f(+(fSlow25))) / +(reverb_faustpower2_f(+(fSlow26)))) + -1.)))));
		fSlow29 = +(+(fSlow27) - +(fSlow28));
		fSlow30 = +(+(fSlow23) * +(+(fSlow28) + +(1. - +(fSlow27))));
		fSlow31 = +(+(+(expf(+(+(HEAPF[dsp + 291088 >> 2]) / +(fSlow12)))) / +(fSlow23)) + -1.);
		fSlow32 = +(expf(+(+(HEAPF[dsp + 291100 >> 2]) / +(fSlow3))));
		fSlow33 = +(reverb_faustpower2_f(+(fSlow32)));
		fSlow34 = +(1. - +(+(HEAPF[dsp + 291032 >> 2]) * +(fSlow33)));
		fSlow35 = +(1. - +(fSlow33));
		fSlow36 = +(+(fSlow34) / +(fSlow35));
		fSlow37 = +(sqrtf(+(max_f(0., +(+(+(reverb_faustpower2_f(+(fSlow34))) / +(reverb_faustpower2_f(+(fSlow35)))) + -1.)))));
		fSlow38 = +(+(fSlow36) - +(fSlow37));
		fSlow39 = +(+(fSlow32) * +(+(fSlow37) + +(1. - +(fSlow36))));
		fSlow40 = +(+(+(expf(+(+(HEAPF[dsp + 291100 >> 2]) / +(fSlow12)))) / +(fSlow32)) + -1.);
		fSlow41 = +(0.100000001 * +(fSlow0));
		for (i = 0; (((i | 0) < (count | 0)) | 0); i = (((i | 0) + 1) | 0)) {
			HEAPF[dsp + 290904 + (0 << 2) >> 2] = +(+(fSlow1) + +(0.999000013 * +(HEAPF[dsp + 290904 + (1 << 2) >> 2])));
			fTemp0 = +(+(HEAPF[input0 + ((i | 0) << 2) >> 2]));
			HEAPF[dsp + 131112 + ((((HEAP32[dsp + 36 >> 2] | 0) & 8191) | 0) << 2) >> 2] = +(fTemp0);
			fTemp1 = +(0.300000012 * +(HEAPF[dsp + 131112 + ((((((HEAP32[dsp + 36 >> 2] | 0) - (iSlow2 | 0)) | 0) & 8191) | 0) << 2) >> 2]));
			HEAPF[dsp + 290912 + (0 << 2) >> 2] = +(+(+(HEAPF[dsp + 291060 >> 2]) * +(+(HEAPF[dsp + 290856 + (1 << 2) >> 2]) + +(HEAPF[dsp + 290856 + (2 << 2) >> 2]))) + +(+(HEAPF[dsp + 291064 >> 2]) * +(HEAPF[dsp + 290912 + (1 << 2) >> 2])));
			HEAPF[dsp + 290920 + (0 << 2) >> 2] = +(+(+(fSlow10) * +(HEAPF[dsp + 290920 + (1 << 2) >> 2])) + +(+(fSlow11) * +(+(HEAPF[dsp + 290856 + (1 << 2) >> 2]) + +(+(fSlow13) * +(HEAPF[dsp + 290912 + (0 << 2) >> 2])))));
			HEAPF[dsp + 163880 + ((((HEAP32[dsp + 36 >> 2] | 0) & 8191) | 0) << 2) >> 2] = +(+(0.5 * +(HEAPF[dsp + 290920 + (0 << 2) >> 2])) + 9.99999968e-21);
			fTemp2 = +(+(+(fTemp1) + +(HEAPF[dsp + 163880 + ((((((HEAP32[dsp + 36 >> 2] | 0) - (HEAP32[dsp + 28 >> 2] | 0)) | 0) & 8191) | 0) << 2) >> 2])) - +(0.600000024 * +(HEAPF[dsp + 290928 + (1 << 2) >> 2])));
			HEAPF[dsp + 286760 + ((((HEAP32[dsp + 36 >> 2] | 0) & 1023) | 0) << 2) >> 2] = +(fTemp2);
			HEAPF[dsp + 290928 + (0 << 2) >> 2] = +(HEAPF[dsp + 286760 + ((((((HEAP32[dsp + 36 >> 2] | 0) - (HEAP32[dsp + 24 >> 2] | 0)) | 0) & 1023) | 0) << 2) >> 2]);
			fRec6 = +(0.600000024 * +(fTemp2));
			HEAPF[dsp + 290936 + (0 << 2) >> 2] = +(+(+(HEAPF[dsp + 291060 >> 2]) * +(+(HEAPF[dsp + 290880 + (1 << 2) >> 2]) + +(HEAPF[dsp + 290880 + (2 << 2) >> 2]))) + +(+(HEAPF[dsp + 291064 >> 2]) * +(HEAPF[dsp + 290936 + (1 << 2) >> 2])));
			HEAPF[dsp + 290944 + (0 << 2) >> 2] = +(+(+(fSlow20) * +(HEAPF[dsp + 290944 + (1 << 2) >> 2])) + +(+(fSlow21) * +(+(HEAPF[dsp + 290880 + (1 << 2) >> 2]) + +(+(fSlow22) * +(HEAPF[dsp + 290936 + (0 << 2) >> 2])))));
			HEAPF[dsp + 196648 + ((((HEAP32[dsp + 36 >> 2] | 0) & 8191) | 0) << 2) >> 2] = +(+(0.5 * +(HEAPF[dsp + 290944 + (0 << 2) >> 2])) + 9.99999968e-21);
			fTemp3 = +(+(HEAPF[dsp + 196648 + ((((((HEAP32[dsp + 36 >> 2] | 0) - (HEAP32[dsp + 20 >> 2] | 0)) | 0) & 8191) | 0) << 2) >> 2]) - +(+(fTemp1) + +(0.600000024 * +(HEAPF[dsp + 290952 + (1 << 2) >> 2]))));
			HEAPF[dsp + 262184 + ((((HEAP32[dsp + 36 >> 2] | 0) & 2047) | 0) << 2) >> 2] = +(fTemp3);
			HEAPF[dsp + 290952 + (0 << 2) >> 2] = +(HEAPF[dsp + 262184 + ((((((HEAP32[dsp + 36 >> 2] | 0) - (HEAP32[dsp + 16 >> 2] | 0)) | 0) & 2047) | 0) << 2) >> 2]);
			fRec10 = +(0.600000024 * +(fTemp3));
			HEAPF[dsp + 290960 + (0 << 2) >> 2] = +(+(+(HEAPF[dsp + 291060 >> 2]) * +(+(HEAPF[dsp + 290868 + (1 << 2) >> 2]) + +(HEAPF[dsp + 290868 + (2 << 2) >> 2]))) + +(+(HEAPF[dsp + 291064 >> 2]) * +(HEAPF[dsp + 290960 + (1 << 2) >> 2])));
			HEAPF[dsp + 290968 + (0 << 2) >> 2] = +(+(+(fSlow29) * +(HEAPF[dsp + 290968 + (1 << 2) >> 2])) + +(+(fSlow30) * +(+(HEAPF[dsp + 290868 + (1 << 2) >> 2]) + +(+(fSlow31) * +(HEAPF[dsp + 290960 + (0 << 2) >> 2])))));
			HEAPF[dsp + 40 + ((((HEAP32[dsp + 36 >> 2] | 0) & 16383) | 0) << 2) >> 2] = +(+(0.5 * +(HEAPF[dsp + 290968 + (0 << 2) >> 2])) + 9.99999968e-21);
			fTemp4 = +(+(HEAPF[input1 + ((i | 0) << 2) >> 2]));
			HEAPF[dsp + 229416 + ((((HEAP32[dsp + 36 >> 2] | 0) & 8191) | 0) << 2) >> 2] = +(fTemp4);
			fTemp5 = +(0.300000012 * +(HEAPF[dsp + 229416 + ((((((HEAP32[dsp + 36 >> 2] | 0) - (iSlow2 | 0)) | 0) & 8191) | 0) << 2) >> 2]));
			fTemp6 = +(+(HEAPF[dsp + 40 + ((((((HEAP32[dsp + 36 >> 2] | 0) - (HEAP32[dsp + 12 >> 2] | 0)) | 0) & 16383) | 0) << 2) >> 2]) + +(+(fTemp5) + +(0.600000024 * +(HEAPF[dsp + 290976 + (1 << 2) >> 2]))));
			HEAPF[dsp + 270376 + ((((HEAP32[dsp + 36 >> 2] | 0) & 2047) | 0) << 2) >> 2] = +(fTemp6);
			HEAPF[dsp + 290976 + (0 << 2) >> 2] = +(HEAPF[dsp + 270376 + ((((((HEAP32[dsp + 36 >> 2] | 0) - (HEAP32[dsp + 8 >> 2] | 0)) | 0) & 2047) | 0) << 2) >> 2]);
			fRec14 = +(0. - +(0.600000024 * +(fTemp6)));
			HEAPF[dsp + 290984 + (0 << 2) >> 2] = +(+(+(HEAPF[dsp + 291060 >> 2]) * +(+(HEAPF[dsp + 290892 + (1 << 2) >> 2]) + +(HEAPF[dsp + 290892 + (2 << 2) >> 2]))) + +(+(HEAPF[dsp + 291064 >> 2]) * +(HEAPF[dsp + 290984 + (1 << 2) >> 2])));
			HEAPF[dsp + 290992 + (0 << 2) >> 2] = +(+(+(fSlow38) * +(HEAPF[dsp + 290992 + (1 << 2) >> 2])) + +(+(fSlow39) * +(+(HEAPF[dsp + 290892 + (1 << 2) >> 2]) + +(+(fSlow40) * +(HEAPF[dsp + 290984 + (0 << 2) >> 2])))));
			HEAPF[dsp + 65576 + ((((HEAP32[dsp + 36 >> 2] | 0) & 16383) | 0) << 2) >> 2] = +(+(0.5 * +(HEAPF[dsp + 290992 + (0 << 2) >> 2])) + 9.99999968e-21);
			fTemp7 = +(+(+(0.600000024 * +(HEAPF[dsp + 291000 + (1 << 2) >> 2])) + +(HEAPF[dsp + 65576 + ((((((HEAP32[dsp + 36 >> 2] | 0) - (HEAP32[dsp + 4 >> 2] | 0)) | 0) & 16383) | 0) << 2) >> 2])) - +(fTemp5));
			HEAPF[dsp + 278568 + ((((HEAP32[dsp + 36 >> 2] | 0) & 2047) | 0) << 2) >> 2] = +(fTemp7);
			HEAPF[dsp + 291000 + (0 << 2) >> 2] = +(HEAPF[dsp + 278568 + ((((((HEAP32[dsp + 36 >> 2] | 0) - (HEAP32[dsp + 0 >> 2] | 0)) | 0) & 2047) | 0) << 2) >> 2]);
			fRec18 = +(0. - +(0.600000024 * +(fTemp7)));
			fTemp8 = +(+(HEAPF[dsp + 291000 + (1 << 2) >> 2]) + +(fRec18));
			fTemp9 = +(+(fRec14) + +(+(HEAPF[dsp + 290976 + (1 << 2) >> 2]) + +(fTemp8)));
			HEAPF[dsp + 290856 + (0 << 2) >> 2] = +(+(fRec6) + +(+(HEAPF[dsp + 290928 + (1 << 2) >> 2]) + +(+(fRec10) + +(+(HEAPF[dsp + 290952 + (1 << 2) >> 2]) + +(fTemp9)))));
			HEAPF[dsp + 290868 + (0 << 2) >> 2] = +(+(+(fRec6) + +(+(HEAPF[dsp + 290928 + (1 << 2) >> 2]) + +(+(HEAPF[dsp + 290952 + (1 << 2) >> 2]) + +(fRec10)))) - +(fTemp9));
			fTemp10 = +(+(HEAPF[dsp + 290976 + (1 << 2) >> 2]) + +(fRec14));
			HEAPF[dsp + 290880 + (0 << 2) >> 2] = +(+(+(fRec6) + +(+(HEAPF[dsp + 290928 + (1 << 2) >> 2]) + +(fTemp10))) - +(+(fRec10) + +(+(HEAPF[dsp + 290952 + (1 << 2) >> 2]) + +(fTemp8))));
			HEAPF[dsp + 290892 + (0 << 2) >> 2] = +(+(+(fRec6) + +(+(HEAPF[dsp + 290928 + (1 << 2) >> 2]) + +(fTemp8))) - +(+(fRec10) + +(+(HEAPF[dsp + 290952 + (1 << 2) >> 2]) + +(fTemp10))));
			fTemp11 = +(1. - +(HEAPF[dsp + 290904 + (0 << 2) >> 2]));
			HEAPF[dsp + 291008 + (0 << 2) >> 2] = +(+(fSlow41) + +(0.999000013 * +(HEAPF[dsp + 291008 + (1 << 2) >> 2])));
			fTemp12 = +(min_f(1., +(HEAPF[dsp + 291008 + (0 << 2) >> 2])));
			HEAPF[output0 + ((i | 0) << 2) >> 2] = +(+(+(+(0.370000005 * +(+(HEAPF[dsp + 290904 + (0 << 2) >> 2]) * +(+(HEAPF[dsp + 290868 + (0 << 2) >> 2]) + +(HEAPF[dsp + 290880 + (0 << 2) >> 2])))) + +(+(fTemp0) * +(fTemp11))) * +(fTemp12)));
			HEAPF[output1 + ((i | 0) << 2) >> 2] = +(+(+(fTemp12) * +(+(0.370000005 * +(+(HEAPF[dsp + 290904 + (0 << 2) >> 2]) * +(+(HEAPF[dsp + 290868 + (0 << 2) >> 2]) - +(HEAPF[dsp + 290880 + (0 << 2) >> 2])))) + +(+(fTemp4) * +(fTemp11)))));
			HEAPF[dsp + 290904 + (1 << 2) >> 2] = +(HEAPF[dsp + 290904 + (0 << 2) >> 2]);
			HEAP32[dsp + 36 >> 2] = (((HEAP32[dsp + 36 >> 2] | 0) + 1) | 0);
			HEAPF[dsp + 290912 + (1 << 2) >> 2] = +(HEAPF[dsp + 290912 + (0 << 2) >> 2]);
			HEAPF[dsp + 290920 + (1 << 2) >> 2] = +(HEAPF[dsp + 290920 + (0 << 2) >> 2]);
			HEAPF[dsp + 290928 + (1 << 2) >> 2] = +(HEAPF[dsp + 290928 + (0 << 2) >> 2]);
			HEAPF[dsp + 290936 + (1 << 2) >> 2] = +(HEAPF[dsp + 290936 + (0 << 2) >> 2]);
			HEAPF[dsp + 290944 + (1 << 2) >> 2] = +(HEAPF[dsp + 290944 + (0 << 2) >> 2]);
			HEAPF[dsp + 290952 + (1 << 2) >> 2] = +(HEAPF[dsp + 290952 + (0 << 2) >> 2]);
			HEAPF[dsp + 290960 + (1 << 2) >> 2] = +(HEAPF[dsp + 290960 + (0 << 2) >> 2]);
			HEAPF[dsp + 290968 + (1 << 2) >> 2] = +(HEAPF[dsp + 290968 + (0 << 2) >> 2]);
			HEAPF[dsp + 290976 + (1 << 2) >> 2] = +(HEAPF[dsp + 290976 + (0 << 2) >> 2]);
			HEAPF[dsp + 290984 + (1 << 2) >> 2] = +(HEAPF[dsp + 290984 + (0 << 2) >> 2]);
			HEAPF[dsp + 290992 + (1 << 2) >> 2] = +(HEAPF[dsp + 290992 + (0 << 2) >> 2]);
			HEAPF[dsp + 291000 + (1 << 2) >> 2] = +(HEAPF[dsp + 291000 + (0 << 2) >> 2]);
			HEAPF[dsp + 290856 + (2 << 2) >> 2] = +(HEAPF[dsp + 290856 + (1 << 2) >> 2]);
			HEAPF[dsp + 290856 + (1 << 2) >> 2] = +(HEAPF[dsp + 290856 + (0 << 2) >> 2]);
			HEAPF[dsp + 290868 + (2 << 2) >> 2] = +(HEAPF[dsp + 290868 + (1 << 2) >> 2]);
			HEAPF[dsp + 290868 + (1 << 2) >> 2] = +(HEAPF[dsp + 290868 + (0 << 2) >> 2]);
			HEAPF[dsp + 290880 + (2 << 2) >> 2] = +(HEAPF[dsp + 290880 + (1 << 2) >> 2]);
			HEAPF[dsp + 290880 + (1 << 2) >> 2] = +(HEAPF[dsp + 290880 + (0 << 2) >> 2]);
			HEAPF[dsp + 290892 + (2 << 2) >> 2] = +(HEAPF[dsp + 290892 + (1 << 2) >> 2]);
			HEAPF[dsp + 290892 + (1 << 2) >> 2] = +(HEAPF[dsp + 290892 + (0 << 2) >> 2]);
			HEAPF[dsp + 291008 + (1 << 2) >> 2] = +(HEAPF[dsp + 291008 + (0 << 2) >> 2]);
			
		}
		
	}
	
	return { getNumInputs : getNumInputs, getNumOutputs : getNumOutputs, classInit : classInit, instanceInit : instanceInit, instanceConstants : instanceConstants, instanceResetUserInterface : instanceResetUserInterface, instanceClear : instanceClear, init : init, getSampleRate : getSampleRate, setParamValue : setParamValue, getParamValue : getParamValue, compute : compute };
}

function getSizereverb() {
	return 291108;
}

function getPathTablereverb() {
	var pathTable = [];
	pathTable["/0x00/izone"] = 291016;
	pathTable["/0x00/Zita_Rev1/In_out/Pre_Delay"] = 291028;
	pathTable["/0x00/Zita_Rev1/Decay_Times_in_Bands_(see_tooltips)/Mid_RT60"] = 291044;
	pathTable["/0x00/Zita_Rev1/Decay_Times_in_Bands_(see_tooltips)/Low_RT60"] = 291048;
	return pathTable;
}

function getJSONreverb() {
	return "{  \"name\": \"Zverb4\",  \"inputs\": \"2\",  \"outputs\": \"2\",  \"meta\": [    { \"analyzers.lib/name\": \"Faust Analyzer Library\" },   { \"analyzers.lib/version\": \"0.0\" },   { \"basics.lib/name\": \"Faust Basic Element Library\" },   { \"basics.lib/version\": \"0.0\" },   { \"compressors.lib/name\": \"Faust Compressor Effect Library\" },   { \"compressors.lib/version\": \"0.0\" },   { \"copyright\": \"GRAME\" },   { \"delays.lib/name\": \"Faust Delay Library\" },   { \"delays.lib/version\": \"0.0\" },   { \"envelopes.lib/author\": \"GRAME\" },   { \"envelopes.lib/copyright\": \"GRAME\" },   { \"envelopes.lib/license\": \"LGPL with exception\" },   { \"envelopes.lib/name\": \"Faust Envelope Library\" },   { \"envelopes.lib/version\": \"0.0\" },   { \"filters.lib/name\": \"Faust Filters Library\" },   { \"filters.lib/version\": \"0.0\" },   { \"hoa.lib/author\": \"Pierre Guillot\" },   { \"hoa.lib/copyright\": \"2012-2013 Guillot, Paris, Colafrancesco, CICM labex art H2H, U. Paris 8\" },   { \"hoa.lib/name\": \"High Order Ambisonics library\" },   { \"license\": \"STK-4.3\" },   { \"maths.lib/author\": \"GRAME\" },   { \"maths.lib/copyright\": \"GRAME\" },   { \"maths.lib/license\": \"LGPL with exception\" },   { \"maths.lib/name\": \"Faust Math Library\" },   { \"maths.lib/version\": \"2.0\" },   { \"misceffects.lib/name\": \"Faust Math Library\" },   { \"misceffects.lib/version\": \"2.0\" },   { \"name\": \"Zverb4\" },   { \"noises.lib/name\": \"Faust Noise Generator Library\" },   { \"noises.lib/version\": \"0.0\" },   { \"oscillators.lib/name\": \"Faust Oscillator Library\" },   { \"oscillators.lib/version\": \"0.0\" },   { \"phaflangers.lib/name\": \"Faust Phaser and Flanger Library\" },   { \"phaflangers.lib/version\": \"0.0\" },   { \"reverbs.lib/name\": \"Faust Reverb Library\" },   { \"reverbs.lib/version\": \"0.0\" },   { \"routes.lib/name\": \"Faust Signal Routing Library\" },   { \"routes.lib/version\": \"0.0\" },   { \"signals.lib/name\": \"Faust Signal Routing Library\" },   { \"signals.lib/version\": \"0.0\" },   { \"spats.lib/name\": \"Faust Spatialization Library\" },   { \"spats.lib/version\": \"0.0\" },   { \"synths.lib/name\": \"Faust Synthesizer Library\" },   { \"synths.lib/version\": \"0.0\" },   { \"vaeffects.lib/name\": \"Faust Virtual Analog Filter Effect Library\" },   { \"vaeffects.lib/version\": \"0.0\" },   { \"version\": \"1.33\" }  ],  \"ui\": [    {    \"type\": \"vgroup\",    \"label\": \"0x00\",    \"items\": [      {      \"type\": \"vgroup\",      \"label\": \"Zita_Rev1\",       \"meta\": [        { \"0\": \"\" },        { \"tooltip\": \"~ ZITA REV1 FEEDBACK DELAY NETWORK (FDN) & SCHROEDER ALLPASS-COMB REVERBERATOR (8x8). See Faust's effect.lib for documentation and references\" }       ],      \"items\": [        {        \"type\": \"hgroup\",        \"label\": \"In_out\",         \"meta\": [          { \"1\": \"\" }         ],        \"items\": [          {          \"type\": \"vslider\",          \"label\": \"Pre_Delay\",          \"address\": \"/0x00/Zita_Rev1/In_out/Pre_Delay\",          \"meta\": [           { \"1\": \"\" },           { \"style\": \"knob\" },           { \"tooltip\": \"Delay in ms before reverberation begins\" },           { \"unit\": \"ms\" }          ],          \"init\": \"20\",          \"min\": \"1\",          \"max\": \"100\",          \"step\": \"1\"         }        ]       },       {        \"type\": \"hgroup\",        \"label\": \"Decay Times in Bands (see tooltips)\",         \"meta\": [          { \"2\": \"\" }         ],        \"items\": [          {          \"type\": \"vslider\",          \"label\": \"Low RT60\",          \"address\": \"/0x00/Zita_Rev1/Decay_Times_in_Bands_(see_tooltips)/Low_RT60\",          \"meta\": [           { \"2\": \"\" },           { \"unit\": \"s\" }          ],          \"init\": \"3\",          \"min\": \"1\",          \"max\": \"20\",          \"step\": \"0.1\"         },         {          \"type\": \"vslider\",          \"label\": \"Mid RT60\",          \"address\": \"/0x00/Zita_Rev1/Decay_Times_in_Bands_(see_tooltips)/Mid_RT60\",          \"meta\": [           { \"3\": \"\" },           { \"unit\": \"s\" }          ],          \"init\": \"5\",          \"min\": \"1\",          \"max\": \"20\",          \"step\": \"0.1\"         }        ]       }      ]     },     {      \"type\": \"vslider\",      \"label\": \"izone\",      \"address\": \"/0x00/izone\",      \"init\": \"0\",      \"min\": \"0\",      \"max\": \"1\",      \"step\": \"0.001\"     }    ]   }  ] } ";
}

function metadatareverb(m) {
	m.declare("analyzers.lib/name", "Faust Analyzer Library");
	m.declare("analyzers.lib/version", "0.0");
	m.declare("basics.lib/name", "Faust Basic Element Library");
	m.declare("basics.lib/version", "0.0");
	m.declare("compressors.lib/name", "Faust Compressor Effect Library");
	m.declare("compressors.lib/version", "0.0");
	m.declare("copyright", "GRAME");
	m.declare("delays.lib/name", "Faust Delay Library");
	m.declare("delays.lib/version", "0.0");
	m.declare("envelopes.lib/author", "GRAME");
	m.declare("envelopes.lib/copyright", "GRAME");
	m.declare("envelopes.lib/license", "LGPL with exception");
	m.declare("envelopes.lib/name", "Faust Envelope Library");
	m.declare("envelopes.lib/version", "0.0");
	m.declare("filters.lib/name", "Faust Filters Library");
	m.declare("filters.lib/version", "0.0");
	m.declare("hoa.lib/author", "Pierre Guillot");
	m.declare("hoa.lib/copyright", "2012-2013 Guillot, Paris, Colafrancesco, CICM labex art H2H, U. Paris 8");
	m.declare("hoa.lib/name", "High Order Ambisonics library");
	m.declare("license", "STK-4.3");
	m.declare("maths.lib/author", "GRAME");
	m.declare("maths.lib/copyright", "GRAME");
	m.declare("maths.lib/license", "LGPL with exception");
	m.declare("maths.lib/name", "Faust Math Library");
	m.declare("maths.lib/version", "2.0");
	m.declare("misceffects.lib/name", "Faust Math Library");
	m.declare("misceffects.lib/version", "2.0");
	m.declare("name", "Zverb4");
	m.declare("noises.lib/name", "Faust Noise Generator Library");
	m.declare("noises.lib/version", "0.0");
	m.declare("oscillators.lib/name", "Faust Oscillator Library");
	m.declare("oscillators.lib/version", "0.0");
	m.declare("phaflangers.lib/name", "Faust Phaser and Flanger Library");
	m.declare("phaflangers.lib/version", "0.0");
	m.declare("reverbs.lib/name", "Faust Reverb Library");
	m.declare("reverbs.lib/version", "0.0");
	m.declare("routes.lib/name", "Faust Signal Routing Library");
	m.declare("routes.lib/version", "0.0");
	m.declare("signals.lib/name", "Faust Signal Routing Library");
	m.declare("signals.lib/version", "0.0");
	m.declare("spats.lib/name", "Faust Spatialization Library");
	m.declare("spats.lib/version", "0.0");
	m.declare("synths.lib/name", "Faust Synthesizer Library");
	m.declare("synths.lib/version", "0.0");
	m.declare("vaeffects.lib/name", "Faust Virtual Analog Filter Effect Library");
	m.declare("vaeffects.lib/version", "0.0");
	m.declare("version", "1.33");
}


// Standard Faust DSP

faust.reverb = function (context, buffer_size) {

    var handler = null;
    var ins, outs;
    var scriptProcessor;
    
    var dspInChannnels = [];
    var dspOutChannnels = [];
   
    // Keep JSON parsed object
    var jon_object = JSON.parse(getJSONreverb());
    
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
     
    var memory_size = pow2limit(getSizereverb() + (numIn + numOut) * (ptr_size + (buffer_size * sample_size)));
   
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
    var factory = reverbModule(window, null, HEAP);
    console.log(factory);
 
    var pathTable = getPathTablereverb();
    
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
            return getJSONreverb();
        },
        
        getProcessor : function ()
        {
            return scriptProcessor;
        }
    };
};

