/* ------------------------------------------------------------
author: "Christophe Lebreton"
copyright: "(c)GRAME 2015"
license: "BSD"
name: "fst_harmo_delayfb"
version: "1.02"
Code generated with Faust 2.0.a59 (http://faust.grame.fr)
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



function aigueModule(global, foreign, buffer) {
	
	'use asm';
	
	var HEAP32 = new global.Int32Array(buffer);
	var HEAPF = new global.Float32Array(buffer);
	
	var imul = foreign.imul;
	var log = foreign.log;
	var round = foreign.round;
	
	var floorf = foreign.floor;
	var max_f = foreign.max;
	var max_i = foreign.max;
	var min_f = foreign.min;
	var min_i = foreign.min;
	var powf = foreign.pow;
	var sinf = foreign.sin;
	var tanf = foreign.tan;
	function fmodf(x, y) { x = +x; y = +y; return +(x % y); }
	function log10f(a) { a = +a; return +(+log(a) / +log(10.)); }
	function remainderf(x, y) { x = +x; y = +y; return +(x - +round(x/y) * y); }

	function getNumInputsaigueSIG0(dsp) {
		dsp = dsp | 0;
		return 0;
	}
	
	function getNumOutputsaigueSIG0(dsp) {
		dsp = dsp | 0;
		return 1;
	}
	
	function instanceInitaigueSIG0(dsp, samplingFreq) {
		dsp = dsp | 0;
		samplingFreq = samplingFreq | 0;
		var l10 = 0;
		for (l10 = 0; (((l10 | 0) < 2) | 0); l10 = (((l10 | 0) + 1) | 0)) {
			HEAP32[dsp + 4737236 + ((l10 | 0) << 2) >> 2] = 0;
			
		}
		
	}
	
	function fillaigueSIG0(dsp, count, output) {
		dsp = dsp | 0;
		count = count | 0;
		output = output | 0;
		var i = 0;
		for (i = 0; (((i | 0) < (count | 0)) | 0); i = (((i | 0) + 1) | 0)) {
			HEAP32[dsp + 4737236 + (0 << 2) >> 2] = (((HEAP32[dsp + 4737236 + (1 << 2) >> 2] | 0) + 1) | 0);
			HEAPF[output + ((i | 0) << 2) >> 2] = +(sinf(+(0.00614793086 * +((((HEAP32[dsp + 4737236 + (0 << 2) >> 2] | 0) + -1) | 0)))));
			HEAP32[dsp + 4737236 + (1 << 2) >> 2] = (HEAP32[dsp + 4737236 + (0 << 2) >> 2] | 0);
			
		}
		
	}
	
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
		instanceInitaigueSIG0(dsp, (samplingFreq | 0));
		fillaigueSIG0(dsp, 512, (dsp + 0 | 0));
		
	}
	
	function instanceConstants(dsp, samplingFreq) {
		dsp = dsp | 0;
		samplingFreq = samplingFreq | 0;
		HEAP32[dsp + 2056 >> 2] = (samplingFreq | 0);
		HEAPF[dsp + 4737168 >> 2] = +(min_f(192000., +(max_f(1., +((HEAP32[dsp + 2056 >> 2] | 0))))));
		HEAPF[dsp + 4737172 >> 2] = +(1. / +(tanf(+(62831.8516 / +(HEAPF[dsp + 4737168 >> 2])))));
		HEAPF[dsp + 4737176 >> 2] = +(+(HEAPF[dsp + 4737172 >> 2]) + 1.);
		HEAPF[dsp + 4737180 >> 2] = +(0. - +(+(1. - +(HEAPF[dsp + 4737172 >> 2])) / +(HEAPF[dsp + 4737176 >> 2])));
		HEAPF[dsp + 4737184 >> 2] = +(1. / +(HEAPF[dsp + 4737176 >> 2]));
		HEAPF[dsp + 4737188 >> 2] = +(62.831852 / +(HEAPF[dsp + 4737168 >> 2]));
		HEAPF[dsp + 4737192 >> 2] = +(1. / +(+(HEAPF[dsp + 4737188 >> 2]) + 1.));
		HEAPF[dsp + 4737196 >> 2] = +(1.99999995e-05 * +(HEAPF[dsp + 4737168 >> 2]));
		HEAPF[dsp + 4737204 >> 2] = +(13.333333 / +(HEAPF[dsp + 4737168 >> 2]));
		HEAPF[dsp + 4737208 >> 2] = +(0. - +(HEAPF[dsp + 4737204 >> 2]));
		HEAP32[dsp + 2052 >> 2] = ((~~(+(0.00999999978 * +(HEAPF[dsp + 4737168 >> 2]))) + 1) | 0);
		HEAPF[dsp + 4737216 >> 2] = +(0.00100000005 * +(HEAPF[dsp + 4737168 >> 2]));
		HEAPF[dsp + 4737224 >> 2] = +(1. / +(HEAPF[dsp + 4737168 >> 2]));
		HEAPF[dsp + 4737232 >> 2] = +(1. - +(HEAPF[dsp + 4737188 >> 2]));
		
	}
	
	function instanceResetUserInterface(dsp) {
		dsp = dsp | 0;
		HEAPF[dsp + 4737164 >> 2] = 0.;
		HEAPF[dsp + 4737200 >> 2] = 1.;
		HEAPF[dsp + 4737212 >> 2] = 0.;
		HEAPF[dsp + 4737220 >> 2] = 75.;
		HEAPF[dsp + 4737228 >> 2] = 500.;
		
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
		for (l0 = 0; (((l0 | 0) < 2) | 0); l0 = (((l0 | 0) + 1) | 0)) {
			HEAPF[dsp + 4737036 + ((l0 | 0) << 2) >> 2] = 0.;
			
		}
		for (l1 = 0; (((l1 | 0) < 2) | 0); l1 = (((l1 | 0) + 1) | 0)) {
			HEAPF[dsp + 4737044 + ((l1 | 0) << 2) >> 2] = 0.;
			
		}
		for (l2 = 0; (((l2 | 0) < 2) | 0); l2 = (((l2 | 0) + 1) | 0)) {
			HEAPF[dsp + 4737052 + ((l2 | 0) << 2) >> 2] = 0.;
			
		}
		for (l3 = 0; (((l3 | 0) < 2) | 0); l3 = (((l3 | 0) + 1) | 0)) {
			HEAPF[dsp + 4737060 + ((l3 | 0) << 2) >> 2] = 0.;
			
		}
		for (l4 = 0; (((l4 | 0) < 2) | 0); l4 = (((l4 | 0) + 1) | 0)) {
			HEAPF[dsp + 4737068 + ((l4 | 0) << 2) >> 2] = 0.;
			
		}
		for (l5 = 0; (((l5 | 0) < 2) | 0); l5 = (((l5 | 0) + 1) | 0)) {
			HEAPF[dsp + 4737076 + ((l5 | 0) << 2) >> 2] = 0.;
			
		}
		for (l6 = 0; (((l6 | 0) < 2) | 0); l6 = (((l6 | 0) + 1) | 0)) {
			HEAPF[dsp + 4737084 + ((l6 | 0) << 2) >> 2] = 0.;
			
		}
		HEAP32[dsp + 2048 >> 2] = 0;
		for (l7 = 0; (((l7 | 0) < 65536) | 0); l7 = (((l7 | 0) + 1) | 0)) {
			HEAPF[dsp + 4196364 + ((l7 | 0) << 2) >> 2] = 0.;
			
		}
		for (l8 = 0; (((l8 | 0) < 2) | 0); l8 = (((l8 | 0) + 1) | 0)) {
			HEAPF[dsp + 4737092 + ((l8 | 0) << 2) >> 2] = 0.;
			
		}
		for (l9 = 0; (((l9 | 0) < 2) | 0); l9 = (((l9 | 0) + 1) | 0)) {
			HEAPF[dsp + 4737100 + ((l9 | 0) << 2) >> 2] = 0.;
			
		}
		for (l11 = 0; (((l11 | 0) < 524288) | 0); l11 = (((l11 | 0) + 1) | 0)) {
			HEAPF[dsp + 2060 + ((l11 | 0) << 2) >> 2] = 0.;
			
		}
		for (l12 = 0; (((l12 | 0) < 2) | 0); l12 = (((l12 | 0) + 1) | 0)) {
			HEAPF[dsp + 4737108 + ((l12 | 0) << 2) >> 2] = 0.;
			
		}
		for (l13 = 0; (((l13 | 0) < 2) | 0); l13 = (((l13 | 0) + 1) | 0)) {
			HEAPF[dsp + 4737116 + ((l13 | 0) << 2) >> 2] = 0.;
			
		}
		for (l14 = 0; (((l14 | 0) < 2) | 0); l14 = (((l14 | 0) + 1) | 0)) {
			HEAPF[dsp + 4737124 + ((l14 | 0) << 2) >> 2] = 0.;
			
		}
		for (l15 = 0; (((l15 | 0) < 2048) | 0); l15 = (((l15 | 0) + 1) | 0)) {
			HEAPF[dsp + 4720652 + ((l15 | 0) << 2) >> 2] = 0.;
			
		}
		for (l16 = 0; (((l16 | 0) < 2) | 0); l16 = (((l16 | 0) + 1) | 0)) {
			HEAPF[dsp + 4737132 + ((l16 | 0) << 2) >> 2] = 0.;
			
		}
		for (l17 = 0; (((l17 | 0) < 65536) | 0); l17 = (((l17 | 0) + 1) | 0)) {
			HEAPF[dsp + 4458508 + ((l17 | 0) << 2) >> 2] = 0.;
			
		}
		for (l18 = 0; (((l18 | 0) < 524288) | 0); l18 = (((l18 | 0) + 1) | 0)) {
			HEAPF[dsp + 2099212 + ((l18 | 0) << 2) >> 2] = 0.;
			
		}
		for (l19 = 0; (((l19 | 0) < 2) | 0); l19 = (((l19 | 0) + 1) | 0)) {
			HEAPF[dsp + 4737140 + ((l19 | 0) << 2) >> 2] = 0.;
			
		}
		for (l20 = 0; (((l20 | 0) < 2) | 0); l20 = (((l20 | 0) + 1) | 0)) {
			HEAPF[dsp + 4737148 + ((l20 | 0) << 2) >> 2] = 0.;
			
		}
		for (l21 = 0; (((l21 | 0) < 2) | 0); l21 = (((l21 | 0) + 1) | 0)) {
			HEAPF[dsp + 4737156 + ((l21 | 0) << 2) >> 2] = 0.;
			
		}
		for (l22 = 0; (((l22 | 0) < 2048) | 0); l22 = (((l22 | 0) + 1) | 0)) {
			HEAPF[dsp + 4728844 + ((l22 | 0) << 2) >> 2] = 0.;
			
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
		return HEAP32[dsp + 2056 >> 2] | 0;
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
		var fSlow2 = 0.;
		var fSlow3 = 0.;
		var fSlow4 = 0.;
		var fSlow5 = 0.;
		var fSlow6 = 0.;
		var fSlow7 = 0.;
		var fSlow8 = 0.;
		var i = 0;
		var fTemp0 = 0.;
		var fTemp1 = 0.;
		var fTemp2 = 0.;
		var fTemp3 = 0.;
		var fTemp4 = 0.;
		var fTemp5 = 0.;
		var iTemp6 = 0;
		var iTemp7 = 0;
		var fTemp8 = 0.;
		var fTemp9 = 0.;
		var fTemp10 = 0.;
		var iTemp11 = 0;
		var fTemp12 = 0.;
		var fTemp13 = 0.;
		var iTemp14 = 0;
		var iTemp15 = 0;
		var fTemp16 = 0.;
		var fTemp17 = 0.;
		var fTemp18 = 0.;
		var iTemp19 = 0;
		var fTemp20 = 0.;
		var iTemp21 = 0;
		var fTemp22 = 0.;
		var iTemp23 = 0;
		var fTemp24 = 0.;
		var fTemp25 = 0.;
		var fTemp26 = 0.;
		var fTemp27 = 0.;
		var fTemp28 = 0.;
		var fTemp29 = 0.;
		var fTemp30 = 0.;
		var fTemp31 = 0.;
		var fTemp32 = 0.;
		input0 = (HEAP32[inputs + (0 << 2) >> 2] | 0);
		input1 = (HEAP32[inputs + (1 << 2) >> 2] | 0);
		output0 = (HEAP32[outputs + (0 << 2) >> 2] | 0);
		output1 = (HEAP32[outputs + (1 << 2) >> 2] | 0);
		fSlow0 = +(+(HEAPF[dsp + 4737164 >> 2]));
		fSlow1 = +(0.00142857141 * +(max_f(0., +(+(fSlow0) + -0.200000003))));
		fSlow2 = +(+(HEAPF[dsp + 4737196 >> 2]) * +(+(HEAPF[dsp + 4737200 >> 2])));
		fSlow3 = +(0.0199999996 * +(+(HEAPF[dsp + 4737212 >> 2])));
		fSlow4 = +(+(HEAPF[dsp + 4737220 >> 2]));
		fSlow5 = +(max_f(1., +(+(HEAPF[dsp + 4737216 >> 2]) * +(fSlow4))));
		fSlow6 = +(0. - +(3.79500008 / +(fSlow4)));
		fSlow7 = +(0.0199999996 * +(+(HEAPF[dsp + 4737228 >> 2])));
		fSlow8 = +(0.100000001 * +(max_f(0., +(fSlow0))));
		for (i = 0; (((i | 0) < (count | 0)) | 0); i = (((i | 0) + 1) | 0)) {
			HEAPF[dsp + 4737036 + (0 << 2) >> 2] = +(+(fSlow1) + +(0.999000013 * +(HEAPF[dsp + 4737036 + (1 << 2) >> 2])));
			fTemp0 = +(min_f(1., +(HEAPF[dsp + 4737036 + (0 << 2) >> 2])));
			HEAPF[dsp + 4737044 + (0 << 2) >> 2] = +(+(fSlow2) + +(0.980000019 * +(HEAPF[dsp + 4737044 + (1 << 2) >> 2])));
			fTemp1 = +(((+(HEAPF[dsp + 4737052 + (1 << 2) >> 2]) != 0.) | 0)?+(((((+(HEAPF[dsp + 4737060 + (1 << 2) >> 2]) > 0.) | 0) & ((+(HEAPF[dsp + 4737060 + (1 << 2) >> 2]) < 1.) | 0)) | 0)?+(HEAPF[dsp + 4737052 + (1 << 2) >> 2]):0.):+(((((+(HEAPF[dsp + 4737060 + (1 << 2) >> 2]) == 0.) | 0) & ((+(HEAPF[dsp + 4737044 + (0 << 2) >> 2]) != +(HEAPF[dsp + 4737068 + (1 << 2) >> 2])) | 0)) | 0)?+(HEAPF[dsp + 4737204 >> 2]):+(((((+(HEAPF[dsp + 4737060 + (1 << 2) >> 2]) == 1.) | 0) & ((+(HEAPF[dsp + 4737044 + (0 << 2) >> 2]) != +(HEAPF[dsp + 4737076 + (1 << 2) >> 2])) | 0)) | 0)?+(HEAPF[dsp + 4737208 >> 2]):0.)));
			HEAPF[dsp + 4737052 + (0 << 2) >> 2] = +(fTemp1);
			HEAPF[dsp + 4737060 + (0 << 2) >> 2] = +(max_f(0., +(min_f(1., +(+(HEAPF[dsp + 4737060 + (1 << 2) >> 2]) + +(fTemp1))))));
			HEAPF[dsp + 4737068 + (0 << 2) >> 2] = +(((((+(HEAPF[dsp + 4737060 + (1 << 2) >> 2]) >= 1.) | 0) & ((+(HEAPF[dsp + 4737076 + (1 << 2) >> 2]) != +(HEAPF[dsp + 4737044 + (0 << 2) >> 2])) | 0)) | 0)?+(HEAPF[dsp + 4737044 + (0 << 2) >> 2]):+(HEAPF[dsp + 4737068 + (1 << 2) >> 2]));
			HEAPF[dsp + 4737076 + (0 << 2) >> 2] = +(((((+(HEAPF[dsp + 4737060 + (1 << 2) >> 2]) <= 0.) | 0) & ((+(HEAPF[dsp + 4737068 + (1 << 2) >> 2]) != +(HEAPF[dsp + 4737044 + (0 << 2) >> 2])) | 0)) | 0)?+(HEAPF[dsp + 4737044 + (0 << 2) >> 2]):+(HEAPF[dsp + 4737076 + (1 << 2) >> 2]));
			fTemp2 = +(+(HEAPF[input0 + ((i | 0) << 2) >> 2]));
			HEAPF[dsp + 4737084 + (0 << 2) >> 2] = +(+(fSlow3) + +(0.980000019 * +(HEAPF[dsp + 4737084 + (1 << 2) >> 2])));
			fTemp3 = +(+(fTemp2) + +(+(HEAPF[dsp + 4720652 + ((((((HEAP32[dsp + 2048 >> 2] | 0) - (HEAP32[dsp + 2052 >> 2] | 0)) | 0) & 2047) | 0) << 2) >> 2]) * +(HEAPF[dsp + 4737084 + (0 << 2) >> 2])));
			HEAPF[dsp + 4196364 + ((((HEAP32[dsp + 2048 >> 2] | 0) & 65535) | 0) << 2) >> 2] = +(fTemp3);
			HEAPF[dsp + 4737092 + (0 << 2) >> 2] = +(+(fSlow7) + +(0.980000019 * +(HEAPF[dsp + 4737092 + (1 << 2) >> 2])));
			HEAPF[dsp + 4737100 + (0 << 2) >> 2] = +(remainderf(+(+(HEAPF[dsp + 4737100 + (1 << 2) >> 2]) + +(+(HEAPF[dsp + 4737224 >> 2]) * +(min_f(60., +(max_f(-60., +(+(fSlow6) * +(+(440. * +(powf(2., +(0.0833333358 * +(+(0.00999999978 * +(+(min_f(3600., +(max_f(-3600., +(HEAPF[dsp + 4737092 + (0 << 2) >> 2]))))) + 6000.)) + -69.))))) + -261.625977)))))))), 1.));
			fTemp4 = +(+(HEAPF[dsp + 4737100 + (0 << 2) >> 2]) + 0.5);
			fTemp5 = +(+(fSlow5) * +(fTemp4));
			iTemp6 = ~~(+(fTemp5));
			iTemp7 = (((iTemp6 | 0) & 65535) | 0);
			fTemp8 = +(floorf(+(fTemp5)));
			fTemp9 = +(+(fTemp8) + +(1. - +(fTemp5)));
			fTemp10 = +(+(fTemp5) - +(fTemp8));
			iTemp11 = (((((iTemp6 | 0) + 1) | 0) & 65535) | 0);
			fTemp12 = +(max_f(0., +(min_f(1., +(fmodf(+(+(HEAPF[dsp + 4737100 + (0 << 2) >> 2]) + 1.), 1.))))));
			fTemp13 = +(+(fSlow5) * +(fTemp12));
			iTemp14 = ~~(+(fTemp13));
			iTemp15 = (((iTemp14 | 0) & 65535) | 0);
			fTemp16 = +(floorf(+(fTemp13)));
			fTemp17 = +(+(fTemp16) + +(1. - +(fTemp13)));
			fTemp18 = +(+(fTemp13) - +(fTemp16));
			iTemp19 = (((((iTemp14 | 0) + 1) | 0) & 65535) | 0);
			fTemp20 = +(+(+(+(+(HEAPF[dsp + 4196364 + ((((((HEAP32[dsp + 2048 >> 2] | 0) - (iTemp7 | 0)) | 0) & 65535) | 0) << 2) >> 2]) * +(fTemp9)) + +(+(fTemp10) * +(HEAPF[dsp + 4196364 + ((((((HEAP32[dsp + 2048 >> 2] | 0) - (iTemp11 | 0)) | 0) & 65535) | 0) << 2) >> 2]))) * +(HEAPF[dsp + 0 + (((max_i(0, ((min_i(511, ~~(+(512. * +(fTemp4))))) | 0))) | 0) << 2) >> 2])) + +(+(+(+(HEAPF[dsp + 4196364 + ((((((HEAP32[dsp + 2048 >> 2] | 0) - (iTemp15 | 0)) | 0) & 65535) | 0) << 2) >> 2]) * +(fTemp17)) + +(+(fTemp18) * +(HEAPF[dsp + 4196364 + ((((((HEAP32[dsp + 2048 >> 2] | 0) - (iTemp19 | 0)) | 0) & 65535) | 0) << 2) >> 2]))) * +(HEAPF[dsp + 0 + (((max_i(0, ((min_i(511, ~~(+(512. * +(fTemp12))))) | 0))) | 0) << 2) >> 2])));
			HEAPF[dsp + 2060 + ((((HEAP32[dsp + 2048 >> 2] | 0) & 524287) | 0) << 2) >> 2] = +(fTemp20);
			iTemp21 = ((~~(+(HEAPF[dsp + 4737076 + (0 << 2) >> 2])) & 524287) | 0);
			fTemp22 = +(+(HEAPF[dsp + 4737060 + (0 << 2) >> 2]) * +(HEAPF[dsp + 2060 + ((((((HEAP32[dsp + 2048 >> 2] | 0) - (iTemp21 | 0)) | 0) & 524287) | 0) << 2) >> 2]));
			iTemp23 = ((~~(+(HEAPF[dsp + 4737068 + (0 << 2) >> 2])) & 524287) | 0);
			fTemp24 = +(1. - +(HEAPF[dsp + 4737060 + (0 << 2) >> 2]));
			fTemp25 = +(+(HEAPF[dsp + 2060 + ((((((HEAP32[dsp + 2048 >> 2] | 0) - (iTemp23 | 0)) | 0) & 524287) | 0) << 2) >> 2]) * +(fTemp24));
			HEAPF[dsp + 4737108 + (0 << 2) >> 2] = +(+(fTemp25) + +(fTemp22));
			HEAPF[dsp + 4737116 + (0 << 2) >> 2] = +(+(HEAPF[dsp + 4737192 >> 2]) * +(+(+(fTemp22) + +(+(+(HEAPF[dsp + 4737232 >> 2]) * +(HEAPF[dsp + 4737116 + (1 << 2) >> 2])) + +(fTemp25))) - +(HEAPF[dsp + 4737108 + (1 << 2) >> 2])));
			HEAPF[dsp + 4737124 + (0 << 2) >> 2] = +(+(+(HEAPF[dsp + 4737180 >> 2]) * +(HEAPF[dsp + 4737124 + (1 << 2) >> 2])) + +(+(HEAPF[dsp + 4737184 >> 2]) * +(+(HEAPF[dsp + 4737116 + (1 << 2) >> 2]) + +(HEAPF[dsp + 4737116 + (0 << 2) >> 2]))));
			HEAPF[dsp + 4720652 + ((((HEAP32[dsp + 2048 >> 2] | 0) & 2047) | 0) << 2) >> 2] = +(HEAPF[dsp + 4737124 + (0 << 2) >> 2]);
			fTemp26 = +(1. - +(fTemp0));
			HEAPF[dsp + 4737132 + (0 << 2) >> 2] = +(+(fSlow8) + +(0.999000013 * +(HEAPF[dsp + 4737132 + (1 << 2) >> 2])));
			fTemp27 = +(min_f(1., +(HEAPF[dsp + 4737132 + (0 << 2) >> 2])));
			HEAPF[output0 + ((i | 0) << 2) >> 2] = +(+(+(+(+(fTemp0) * +(HEAPF[dsp + 4720652 + ((((((HEAP32[dsp + 2048 >> 2] | 0) - 0) | 0) & 2047) | 0) << 2) >> 2])) + +(+(fTemp2) * +(fTemp26))) * +(fTemp27)));
			fTemp28 = +(+(HEAPF[input1 + ((i | 0) << 2) >> 2]));
			fTemp29 = +(+(fTemp28) + +(+(HEAPF[dsp + 4737084 + (0 << 2) >> 2]) * +(HEAPF[dsp + 4728844 + ((((((HEAP32[dsp + 2048 >> 2] | 0) - (HEAP32[dsp + 2052 >> 2] | 0)) | 0) & 2047) | 0) << 2) >> 2])));
			HEAPF[dsp + 4458508 + ((((HEAP32[dsp + 2048 >> 2] | 0) & 65535) | 0) << 2) >> 2] = +(fTemp29);
			fTemp30 = +(+(+(HEAPF[dsp + 0 + (((max_i(0, ((min_i(511, ~~(+(512. * +(fTemp4))))) | 0))) | 0) << 2) >> 2]) * +(+(+(fTemp9) * +(HEAPF[dsp + 4458508 + ((((((HEAP32[dsp + 2048 >> 2] | 0) - (iTemp7 | 0)) | 0) & 65535) | 0) << 2) >> 2])) + +(+(fTemp10) * +(HEAPF[dsp + 4458508 + ((((((HEAP32[dsp + 2048 >> 2] | 0) - (iTemp11 | 0)) | 0) & 65535) | 0) << 2) >> 2])))) + +(+(HEAPF[dsp + 0 + (((max_i(0, ((min_i(511, ~~(+(512. * +(fTemp12))))) | 0))) | 0) << 2) >> 2]) * +(+(+(fTemp17) * +(HEAPF[dsp + 4458508 + ((((((HEAP32[dsp + 2048 >> 2] | 0) - (iTemp15 | 0)) | 0) & 65535) | 0) << 2) >> 2])) + +(+(fTemp18) * +(HEAPF[dsp + 4458508 + ((((((HEAP32[dsp + 2048 >> 2] | 0) - (iTemp19 | 0)) | 0) & 65535) | 0) << 2) >> 2])))));
			HEAPF[dsp + 2099212 + ((((HEAP32[dsp + 2048 >> 2] | 0) & 524287) | 0) << 2) >> 2] = +(fTemp30);
			fTemp31 = +(+(HEAPF[dsp + 4737060 + (0 << 2) >> 2]) * +(HEAPF[dsp + 2099212 + ((((((HEAP32[dsp + 2048 >> 2] | 0) - (iTemp21 | 0)) | 0) & 524287) | 0) << 2) >> 2]));
			fTemp32 = +(+(fTemp24) * +(HEAPF[dsp + 2099212 + ((((((HEAP32[dsp + 2048 >> 2] | 0) - (iTemp23 | 0)) | 0) & 524287) | 0) << 2) >> 2]));
			HEAPF[dsp + 4737140 + (0 << 2) >> 2] = +(+(fTemp32) + +(fTemp31));
			HEAPF[dsp + 4737148 + (0 << 2) >> 2] = +(+(HEAPF[dsp + 4737192 >> 2]) * +(+(+(fTemp31) + +(+(+(HEAPF[dsp + 4737232 >> 2]) * +(HEAPF[dsp + 4737148 + (1 << 2) >> 2])) + +(fTemp32))) - +(HEAPF[dsp + 4737140 + (1 << 2) >> 2])));
			HEAPF[dsp + 4737156 + (0 << 2) >> 2] = +(+(+(HEAPF[dsp + 4737180 >> 2]) * +(HEAPF[dsp + 4737156 + (1 << 2) >> 2])) + +(+(HEAPF[dsp + 4737184 >> 2]) * +(+(HEAPF[dsp + 4737148 + (1 << 2) >> 2]) + +(HEAPF[dsp + 4737148 + (0 << 2) >> 2]))));
			HEAPF[dsp + 4728844 + ((((HEAP32[dsp + 2048 >> 2] | 0) & 2047) | 0) << 2) >> 2] = +(HEAPF[dsp + 4737156 + (0 << 2) >> 2]);
			HEAPF[output1 + ((i | 0) << 2) >> 2] = +(+(+(fTemp27) * +(+(+(fTemp0) * +(HEAPF[dsp + 4728844 + ((((((HEAP32[dsp + 2048 >> 2] | 0) - 0) | 0) & 2047) | 0) << 2) >> 2])) + +(+(fTemp28) * +(fTemp26)))));
			HEAPF[dsp + 4737036 + (1 << 2) >> 2] = +(HEAPF[dsp + 4737036 + (0 << 2) >> 2]);
			HEAPF[dsp + 4737044 + (1 << 2) >> 2] = +(HEAPF[dsp + 4737044 + (0 << 2) >> 2]);
			HEAPF[dsp + 4737052 + (1 << 2) >> 2] = +(HEAPF[dsp + 4737052 + (0 << 2) >> 2]);
			HEAPF[dsp + 4737060 + (1 << 2) >> 2] = +(HEAPF[dsp + 4737060 + (0 << 2) >> 2]);
			HEAPF[dsp + 4737068 + (1 << 2) >> 2] = +(HEAPF[dsp + 4737068 + (0 << 2) >> 2]);
			HEAPF[dsp + 4737076 + (1 << 2) >> 2] = +(HEAPF[dsp + 4737076 + (0 << 2) >> 2]);
			HEAPF[dsp + 4737084 + (1 << 2) >> 2] = +(HEAPF[dsp + 4737084 + (0 << 2) >> 2]);
			HEAP32[dsp + 2048 >> 2] = (((HEAP32[dsp + 2048 >> 2] | 0) + 1) | 0);
			HEAPF[dsp + 4737092 + (1 << 2) >> 2] = +(HEAPF[dsp + 4737092 + (0 << 2) >> 2]);
			HEAPF[dsp + 4737100 + (1 << 2) >> 2] = +(HEAPF[dsp + 4737100 + (0 << 2) >> 2]);
			HEAPF[dsp + 4737108 + (1 << 2) >> 2] = +(HEAPF[dsp + 4737108 + (0 << 2) >> 2]);
			HEAPF[dsp + 4737116 + (1 << 2) >> 2] = +(HEAPF[dsp + 4737116 + (0 << 2) >> 2]);
			HEAPF[dsp + 4737124 + (1 << 2) >> 2] = +(HEAPF[dsp + 4737124 + (0 << 2) >> 2]);
			HEAPF[dsp + 4737132 + (1 << 2) >> 2] = +(HEAPF[dsp + 4737132 + (0 << 2) >> 2]);
			HEAPF[dsp + 4737140 + (1 << 2) >> 2] = +(HEAPF[dsp + 4737140 + (0 << 2) >> 2]);
			HEAPF[dsp + 4737148 + (1 << 2) >> 2] = +(HEAPF[dsp + 4737148 + (0 << 2) >> 2]);
			HEAPF[dsp + 4737156 + (1 << 2) >> 2] = +(HEAPF[dsp + 4737156 + (0 << 2) >> 2]);
			
		}
		
	}
	
	return { getNumInputs : getNumInputs, getNumOutputs : getNumOutputs, classInit : classInit, instanceInit : instanceInit, instanceConstants : instanceConstants, instanceResetUserInterface : instanceResetUserInterface, instanceClear : instanceClear, init : init, getSampleRate : getSampleRate, setParamValue : setParamValue, getParamValue : getParamValue, compute : compute };
}

function getSizeaigue() {
	return 4737244;
}

function getPathTableaigue() {
	var pathTable = [];
	pathTable["/0x00/izone"] = 4737164;
	pathTable["/0x00/delay0"] = 4737200;
	pathTable["/0x00/fback0"] = 4737212;
	pathTable["/0x00/window"] = 4737220;
	pathTable["/0x00/pitch0"] = 4737228;
	return pathTable;
}

function getJSONaigue() {
	return "{  \"name\": \"fst_harmo_delayfb\",  \"inputs\": \"2\",  \"outputs\": \"2\",  \"meta\": [    { \"author\": \"Christophe Lebreton\" },   { \"basics.lib/name\": \"Faust Basic Element Library\" },   { \"basics.lib/version\": \"0.0\" },   { \"copyright\": \"(c)GRAME 2015\" },   { \"delays.lib/name\": \"Faust Delay Library\" },   { \"delays.lib/version\": \"0.0\" },   { \"filters.lib/name\": \"Faust Filters Library\" },   { \"filters.lib/version\": \"0.0\" },   { \"license\": \"BSD\" },   { \"maths.lib/author\": \"GRAME\" },   { \"maths.lib/copyright\": \"GRAME\" },   { \"maths.lib/license\": \"LGPL with exception\" },   { \"maths.lib/name\": \"Faust Math Library\" },   { \"maths.lib/version\": \"2.0\" },   { \"name\": \"fst_harmo_delayfb\" },   { \"signals.lib/name\": \"Faust Signal Routing Library\" },   { \"signals.lib/version\": \"0.0\" },   { \"version\": \"1.02\" }  ],  \"ui\": [    {    \"type\": \"vgroup\",    \"label\": \"0x00\",    \"items\": [      {      \"type\": \"vslider\",      \"label\": \"delay0\",      \"address\": \"/0x00/delay0\",      \"init\": \"1\",      \"min\": \"1\",      \"max\": \"10000\",      \"step\": \"1\"     },     {      \"type\": \"vslider\",      \"label\": \"fback0\",      \"address\": \"/0x00/fback0\",      \"init\": \"0\",      \"min\": \"0\",      \"max\": \"0.99\",      \"step\": \"0.01\"     },     {      \"type\": \"vslider\",      \"label\": \"izone\",      \"address\": \"/0x00/izone\",      \"init\": \"0\",      \"min\": \"0\",      \"max\": \"1\",      \"step\": \"0.001\"     },     {      \"type\": \"vslider\",      \"label\": \"pitch0\",      \"address\": \"/0x00/pitch0\",      \"init\": \"500\",      \"min\": \"-3600\",      \"max\": \"3600\",      \"step\": \"1\"     },     {      \"type\": \"vslider\",      \"label\": \"window\",      \"address\": \"/0x00/window\",      \"init\": \"75\",      \"min\": \"1\",      \"max\": \"500\",      \"step\": \"1\"     }    ]   }  ] } ";
}

function metadataaigue(m) {
	m.declare("author", "Christophe Lebreton");
	m.declare("basics.lib/name", "Faust Basic Element Library");
	m.declare("basics.lib/version", "0.0");
	m.declare("copyright", "(c)GRAME 2015");
	m.declare("delays.lib/name", "Faust Delay Library");
	m.declare("delays.lib/version", "0.0");
	m.declare("filters.lib/name", "Faust Filters Library");
	m.declare("filters.lib/version", "0.0");
	m.declare("license", "BSD");
	m.declare("maths.lib/author", "GRAME");
	m.declare("maths.lib/copyright", "GRAME");
	m.declare("maths.lib/license", "LGPL with exception");
	m.declare("maths.lib/name", "Faust Math Library");
	m.declare("maths.lib/version", "2.0");
	m.declare("name", "fst_harmo_delayfb");
	m.declare("signals.lib/name", "Faust Signal Routing Library");
	m.declare("signals.lib/version", "0.0");
	m.declare("version", "1.02");
}


// Standard Faust DSP

faust.aigue = function (context, buffer_size) {

    var handler = null;
    var ins, outs;
    var scriptProcessor;
    
    var dspInChannnels = [];
    var dspOutChannnels = [];
   
    // Keep JSON parsed object
    var jon_object = JSON.parse(getJSONaigue());
    
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
     
    var memory_size = pow2limit(getSizeaigue() + (numIn + numOut) * (ptr_size + (buffer_size * sample_size)));
   
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
    var factory = aigueModule(window, window.Math, HEAP);
    console.log(factory);
 
    var pathTable = getPathTableaigue();
    
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
            return getJSONaigue();
        },
        
        getProcessor : function ()
        {
            return scriptProcessor;
        }
    };
};

