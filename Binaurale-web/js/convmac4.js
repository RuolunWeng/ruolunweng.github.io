console.log("Hello in JavaScript!");
var stream;
var source;
var convSelect = document.getElementById("conv");
var mute = document.getElementById("mute");

// create FAUST web audio api context
	var AudioContext = window.AudioContext || window.webkitAudioContext;
	var audioCtx = new AudioContext();
  var dsp = faust.binaural_noise_test(audioCtx, 256);
  console.log(dsp.getProcessor());
  console.log(dsp.json());
  var convolverL1 = audioCtx.createConvolver();
  var convolverR1 = audioCtx.createConvolver();
  var convolverL2 = audioCtx.createConvolver();
  var convolverR2 = audioCtx.createConvolver();
  var convolverL3 = audioCtx.createConvolver();
  var convolverR3 = audioCtx.createConvolver();
  var convolverL4 = audioCtx.createConvolver();
  var convolverR4 = audioCtx.createConvolver();
  var convolverL5 = audioCtx.createConvolver();
  var convolverR5 = audioCtx.createConvolver();
  var convolverL6 = audioCtx.createConvolver();
  var convolverR6 = audioCtx.createConvolver();
  var convolverL7 = audioCtx.createConvolver();
  var convolverR7 = audioCtx.createConvolver();
  var convolverL8 = audioCtx.createConvolver();
  var convolverR8 = audioCtx.createConvolver();
  var gainNodeL = audioCtx.createGain();
  var gainNodeR = audioCtx.createGain();
  var merger = audioCtx.createChannelMerger(2);
  var spilter = audioCtx.createChannelSplitter(8);
  //dsp.connect(spilter);
  //console.log(spilter);
  //spilter.connect(gainNodeL,0);
    /*
  var gainNode = audioCtx.createGain();
  var dsp = faust.saw(audioCtx, 256);
  console.log(dsp.getProcessor());
  gainNode.gain.value=0.05;
  dsp.connect(gainNode);
  var merger = audioCtx.createChannelMerger(2);
  gainNode.connect(merger,0,1);
  merger.connect(audioCtx.destination);
  */

  // grab HRIR for convolver node
  // order 0 LR
  var soundSourceL1, hrir_1_L, soundSourceR1, hrir_1_R;

  ajaxRequestL1 = new XMLHttpRequest();
  ajaxRequestL1.open('GET', '../hrir/IRC_1002_R_R0195_T000_P000_L.wav', true);
  ajaxRequestL1.responseType = 'arraybuffer';

  ajaxRequestL1.onload = function() {
    var audioData = ajaxRequestL1.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        hrir_1_L = buffer;
        soundSourceL1 = audioCtx.createBufferSource();
        soundSourceL1.buffer = hrir_1_L;
      }, function(e){"Error with decoding audio data" + e.err});
  }

  ajaxRequestL1.send();


  ajaxRequestR1 = new XMLHttpRequest();
  ajaxRequestR1.open('GET', '../hrir/IRC_1002_R_R0195_T000_P000_R.wav', true);
  ajaxRequestR1.responseType = 'arraybuffer';

  ajaxRequestR1.onload = function() {
    var audioData = ajaxRequestR1.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        hrir_1_R = buffer;
        soundSourceR1 = audioCtx.createBufferSource();
        soundSourceR1.buffer = hrir_1_R;
      }, function(e){"Error with decoding audio data" + e.err});
  }

  ajaxRequestR1.send();

  
  var soundSourceL2, hrir_2_L, soundSourceR2, hrir_2_R;

  ajaxRequestL2 = new XMLHttpRequest();
  ajaxRequestL2.open('GET', '../hrir/IRC_1002_R_R0195_T315_P000_L.wav', true);
  ajaxRequestL2.responseType = 'arraybuffer';

  ajaxRequestL2.onload = function() {
    var audioData = ajaxRequestL2.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        hrir_2_L = buffer;
        soundSourceL2 = audioCtx.createBufferSource();
        soundSourceL2.buffer = hrir_2_L;
      }, function(e){"Error with decoding audio data" + e.err});
  }

  ajaxRequestL2.send();


  ajaxRequestR2 = new XMLHttpRequest();
  ajaxRequestR2.open('GET', '../hrir/IRC_1002_R_R0195_T315_P000_R.wav', true);
  ajaxRequestR2.responseType = 'arraybuffer';

  ajaxRequestR2.onload = function() {
    var audioData = ajaxRequestR2.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        hrir_2_R = buffer;
        soundSourceR2 = audioCtx.createBufferSource();
        soundSourceR2.buffer = hrir_2_R;
      }, function(e){"Error with decoding audio data" + e.err});
  }

  ajaxRequestR2.send();

   
   // Order 1 LR
  var soundSourceL3, hrir_3_L, soundSourceR1, hrir_3_R;

  ajaxRequestL3 = new XMLHttpRequest();
  ajaxRequestL3.open('GET', '../hrir/IRC_1002_R_R0195_T270_P000_L.wav', true);
  ajaxRequestL3.responseType = 'arraybuffer';

  ajaxRequestL3.onload = function() {
    var audioData = ajaxRequestL3.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        hrir_3_L = buffer;
        soundSourceL3 = audioCtx.createBufferSource();
        soundSourceL3.buffer = hrir_3_L;
      }, function(e){"Error with decoding audio data" + e.err});
  }

  ajaxRequestL3.send();


  ajaxRequestR3 = new XMLHttpRequest();
  ajaxRequestR3.open('GET', '../hrir/IRC_1002_R_R0195_T270_P000_R.wav', true);
  ajaxRequestR3.responseType = 'arraybuffer';

  ajaxRequestR3.onload = function() {
    var audioData = ajaxRequestR3.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        hrir_3_R = buffer;
        soundSourceR3 = audioCtx.createBufferSource();
        soundSourceR3.buffer = hrir_3_R;
      }, function(e){"Error with decoding audio data" + e.err});
  }

  ajaxRequestR3.send();



  var soundSourceL4, hrir_4_L, soundSourceR4, hrir_4_R;

  ajaxRequestL4 = new XMLHttpRequest();
  ajaxRequestL4.open('GET', '../hrir/IRC_1002_R_R0195_T225_P000_L.wav', true);
  ajaxRequestL4.responseType = 'arraybuffer';

  ajaxRequestL4.onload = function() {
    var audioData = ajaxRequestL4.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        hrir_4_L = buffer;
        soundSourceL4 = audioCtx.createBufferSource();
        soundSourceL4.buffer = hrir_4_L;
      }, function(e){"Error with decoding audio data" + e.err});
  }

  ajaxRequestL4.send();


  ajaxRequestR4 = new XMLHttpRequest();
  ajaxRequestR4.open('GET', '../hrir/IRC_1002_R_R0195_T225_P000_R.wav', true);
  ajaxRequestR4.responseType = 'arraybuffer';

  ajaxRequestR4.onload = function() {
    var audioData = ajaxRequestR4.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        hrir_4_R = buffer;
        soundSourceR4 = audioCtx.createBufferSource();
        soundSourceR4.buffer = hrir_4_R;
      }, function(e){"Error with decoding audio data" + e.err});
  }

  ajaxRequestR4.send();


  var soundSourceL5, hrir_5_L, soundSourceR5, hrir_5_R;

  ajaxRequestL5 = new XMLHttpRequest();
  ajaxRequestL5.open('GET', '../hrir/IRC_1002_R_R0195_T180_P000_L.wav', true);
  ajaxRequestL5.responseType = 'arraybuffer';

  ajaxRequestL5.onload = function() {
    var audioData = ajaxRequestL5.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        hrir_5_L = buffer;
        soundSourceL5 = audioCtx.createBufferSource();
        soundSourceL5.buffer = hrir_5_L;
      }, function(e){"Error with decoding audio data" + e.err});
  }

  ajaxRequestL5.send();


  ajaxRequestR5= new XMLHttpRequest();
  ajaxRequestR5.open('GET', '../hrir/IRC_1002_R_R0195_T180_P000_R.wav', true);
  ajaxRequestR5.responseType = 'arraybuffer';

  ajaxRequestR5.onload = function() {
    var audioData = ajaxRequestR5.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        hrir_5_R = buffer;
        soundSourceR5 = audioCtx.createBufferSource();
        soundSourceR5.buffer = hrir_5_R;
      }, function(e){"Error with decoding audio data" + e.err});
  }

  ajaxRequestR5.send();


  var soundSourceL6, hrir_6_L, soundSourceR6, hrir_6_R;

  ajaxRequestL6 = new XMLHttpRequest();
  ajaxRequestL6.open('GET', '../hrir/IRC_1002_R_R0195_T135_P000_L.wav', true);
  ajaxRequestL6.responseType = 'arraybuffer';

  ajaxRequestL6.onload = function() {
    var audioData = ajaxRequestL6.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        hrir_6_L = buffer;
        soundSourceL6 = audioCtx.createBufferSource();
        soundSourceL6.buffer = hrir_6_L;
      }, function(e){"Error with decoding audio data" + e.err});
  }

  ajaxRequestL6.send();


  ajaxRequestR6 = new XMLHttpRequest();
  ajaxRequestR6.open('GET', '../hrir/IRC_1002_R_R0195_T135_P000_R.wav', true);
  ajaxRequestR6.responseType = 'arraybuffer';

  ajaxRequestR6.onload = function() {
    var audioData = ajaxRequestR6.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        hrir_6_R = buffer;
        soundSourceR6 = audioCtx.createBufferSource();
        soundSourceR6.buffer = hrir_6_R;
      }, function(e){"Error with decoding audio data" + e.err});
  }

  ajaxRequestR6.send();

  var soundSourceL7, hrir_7_L, soundSourceR7, hrir_7_R;

  ajaxRequestL7 = new XMLHttpRequest();
  ajaxRequestL7.open('GET', '../hrir/IRC_1002_R_R0195_T090_P000_L.wav', true);
  ajaxRequestL7.responseType = 'arraybuffer';

  ajaxRequestL7.onload = function() {
    var audioData = ajaxRequestL7.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        hrir_7_L = buffer;
        soundSourceL7 = audioCtx.createBufferSource();
        soundSourceL7.buffer = hrir_7_L;
      }, function(e){"Error with decoding audio data" + e.err});
  }

  ajaxRequestL7.send();


  ajaxRequestR7 = new XMLHttpRequest();
  ajaxRequestR7.open('GET', '../hrir/IRC_1002_R_R0195_T090_P000_R.wav', true);
  ajaxRequestR7.responseType = 'arraybuffer';

  ajaxRequestR7.onload = function() {
    var audioData = ajaxRequestR7.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        hrir_7_R = buffer;
        soundSourceR7 = audioCtx.createBufferSource();
        soundSourceR7.buffer = hrir_7_R;
      }, function(e){"Error with decoding audio data" + e.err});
  }

  ajaxRequestR7.send();

  var soundSourceL8, hrir_8_L, soundSourceR8, hrir_8_R;

  ajaxRequestL8 = new XMLHttpRequest();
  ajaxRequestL8.open('GET', '../hrir/IRC_1002_R_R0195_T045_P000_L.wav', true);
  ajaxRequestL8.responseType = 'arraybuffer';

  ajaxRequestL8.onload = function() {
    var audioData = ajaxRequestL8.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        hrir_8_L = buffer;
        soundSourceL8 = audioCtx.createBufferSource();
        soundSourceL8.buffer = hrir_8_L;
      }, function(e){"Error with decoding audio data" + e.err});
  }

  ajaxRequestL8.send();


  ajaxRequestR8 = new XMLHttpRequest();
  ajaxRequestR8.open('GET', '../hrir/IRC_1002_R_R0195_T045_P000_R.wav', true);
  ajaxRequestR8.responseType = 'arraybuffer';

  ajaxRequestR8.onload = function() {
    var audioData = ajaxRequestR8.response;
    audioCtx.decodeAudioData(audioData, function(buffer) {
        hrir_8_R = buffer;
        soundSourceR8 = audioCtx.createBufferSource();
        soundSourceR8.buffer = hrir_8_R;
      }, function(e){"Error with decoding audio data" + e.err});
  }

  ajaxRequestR8.send();


//create a sinus from web audio api
    var oscillator = audioCtx.createOscillator();
    oscillator.frequency.value = 400;
    var gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    //gainNode.connect(merger,0,1);
    //oscillator.connect(context.destination);
    oscillator.start(0);
    gainNode.gain.value = 0.1;


if (navigator.getUserMedia) {
   console.log('getUserMedia supported.');
   navigator.getUserMedia (
      // constraints - only audio needed for this app
      {
         audio: true
      },

      // Success callback
      function(stream) {
         source = audioCtx.createMediaStreamSource(stream);
          source.connect(dsp.getProcessor());
          //source.connect(convolverL1);
         //source.connect(convolverR1);

         // Set faust decoder signals to convolters
          dsp.connect(spilter);
          console.log(spilter);

          spilter.connect(convolverL1,0);
          spilter.connect(convolverR1,0);

          spilter.connect(convolverL2,1);
          spilter.connect(convolverR2,1);

          spilter.connect(convolverL3,2);
          spilter.connect(convolverR3,2);
 
          spilter.connect(convolverL4,3);
          spilter.connect(convolverR4,3);

          spilter.connect(convolverL5,4);
          spilter.connect(convolverR5,4);

          spilter.connect(convolverL6,5);
          spilter.connect(convolverR6,5);

          spilter.connect(convolverL7,6);
          spilter.connect(convolverR7,6);

          spilter.connect(convolverL8,7);
          spilter.connect(convolverR8,7);

         convolverL1.connect(gainNodeL);
         convolverR1.connect(gainNodeR);
         convolverL2.connect(gainNodeL);
         convolverR2.connect(gainNodeR);
         convolverL3.connect(gainNodeL);
         convolverR3.connect(gainNodeR);
         convolverL4.connect(gainNodeL);
         convolverR4.connect(gainNodeR);
         convolverL5.connect(gainNodeL);
         convolverR5.connect(gainNodeR);
         convolverL6.connect(gainNodeL);
         convolverR6.connect(gainNodeR);
         convolverL7.connect(gainNodeL);
         convolverR7.connect(gainNodeR);
         convolverL8.connect(gainNodeL);
         convolverR8.connect(gainNodeR);

         console.log(gainNodeL);
         gainNodeL.connect(merger,0,0);
         gainNodeR.connect(merger,0,1);
         merger.connect(audioCtx.destination);
         console.log(merger);
         console.log(audioCtx.destination);
      },

      // Error callback
      function(err) {
         console.log('The following gUM error occured: ' + err);
      }
   );
} else {
   console.log('getUserMedia not supported on your browser!');
}


function convChange() {
  
  convolverL1.buffer = null;
  convolverR1.buffer = null;
  convolverL2.buffer = null;
  convolverR2.buffer = null;
  convolverL3.buffer = null;
  convolverR3.buffer = null;
  convolverL4.buffer = null;
  convolverR4.buffer = null;
  convolverL5.buffer = null;
  convolverR5.buffer = null;
  convolverL6.buffer = null;
  convolverR6.buffer = null;
  convolverL7.buffer = null;
  convolverR7.buffer = null;
  convolverL8.buffer = null;
  convolverR8.buffer = null;

  var convSetting = convSelect.value;
  console.log(convSetting);

  if(convSetting == "convolver") {
    convolverL1.buffer = hrir_1_L;
    convolverR1.buffer = hrir_1_R;
    convolverL2.buffer = hrir_2_L;
    convolverR2.buffer = hrir_2_R;
    convolverL3.buffer = hrir_3_L;
    convolverR3.buffer = hrir_3_R;
    convolverL4.buffer = hrir_4_L;
    convolverR4.buffer = hrir_4_R;
    convolverL5.buffer = hrir_5_L;
    convolverR5.buffer = hrir_5_R;
    convolverL6.buffer = hrir_6_L;
    convolverR6.buffer = hrir_6_R;
    convolverL7.buffer = hrir_7_L;
    convolverR7.buffer = hrir_7_R;
    convolverL8.buffer = hrir_8_L;
    convolverR8.buffer = hrir_8_R;

    dsp.setParamValue("/0x00/gate",1);
    //dsp.setParamValue("/0x00/Probability",20);
    //dsp.setParamValue("/0x00/GrainSize",200);
    dsp.setParamValue("/0x00/lfo",1);
    dsp.setParamValue("/0x00/azimuth_range", 6.28);
    console.log(convolverL1+convolverR1);
  } else if(convSetting == "off") {
    console.log("Conv settings turned off");
    dsp.setParamValue("/0x00/gate",0);
  }

}

convSelect.onchange = function() {
  convChange();
}

mute.onclick = voiceMute;

function voiceMute() {
  if(mute.id == "") {
    gainNodeL.gain.value = 0;
    gainNodeR.gain.value = 0;
    mute.id = "activated";
    mute.innerHTML = "Unmute";
  } else {
    gainNodeL.gain.value = 1;
    gainNodeR.gain.value = 1;
    mute.id = "";    
    mute.innerHTML = "Mute";
  }
}

// FAUST PARAMETRE
var faustParametre ={};
  
  faustParametre.azimuth = function(element){
    var azimuth = element.value;
    dsp.setParamValue("/0x00/azimuth_range", azimuth);
    var azimuthOut = document.getElementById("azimuthOut")
    azimuthOut.innerHTML = "Azimuth=" + azimuth;
  };

  faustParametre.lfo = function(element){
    var lfo = element.value;
    dsp.setParamValue("/0x00/lfo", lfo);
    var lfoOut = document.getElementById("lfoOut")
    lfoOut.innerHTML = "LFO=" + lfo;
    //console.log(element);  
  };

/*
      dsp.start();
      var control_list = dsp.controls();
     console.log(control_list);
     dsp.setParamValue("/saw/gate", 1);
     dsp.setParamValue("/saw/gain", 0.1);
     //var value = dsp.getProcessor();
     //var value = dsp.getParamValue("/saw/gate");
     //console.log(value);


// create initial theremin frequency and volumn values

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

// Mouse pointer coordinates

var CurX;
var CurY;

//var maxFreq = 5000;
//var maxVol = 1;

// Get new mouse pointer coordinates when mouse is moved
// then set new gain and pitch values

document.onmousemove = updatePage;

function updatePage(e) {
    KeyFlag = false;

    CurX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
    CurY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    
    console.log(CurX/WIDTH);
    console.log(CurY/HEIGHT);
    dsp.setParamValue("/0x00/decoder/Parameters/Source__0/Azimuth__0",(CurX/WIDTH) * 360);
    //dsp.setParamValue("/saw/gain",(CurY/HEIGHT) * maxVol);

}
*/
