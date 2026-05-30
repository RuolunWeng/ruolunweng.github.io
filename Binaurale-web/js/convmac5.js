console.log("Hello in JavaScript!");
var stream;
var source;
var convSelect = document.getElementById("conv");
var mute = document.getElementById("mute");

// create FAUST web audio api context
	
  var dsp = faust.binaural_noise_test(audioCtx, 4096);
  console.log(dsp.getProcessor());
  console.log(dsp.json());
  var convolverL = [], convolverR = [];
  for (var i = 1; i <= 8; i++) {    
    convolverL[i] = audioCtx.createConvolver();
    convolverR[i] = audioCtx.createConvolver();
  };
  console.log(convolverL,convolverR);
  var gainNodeL = audioCtx.createGain();
  var gainNodeR = audioCtx.createGain();
  var merger = audioCtx.createChannelMerger(2);
  var spilter = audioCtx.createChannelSplitter(8);


  // grab HRIR for convolver node
  var hrirL = [], hrirR = [],soundSourceL = [],soundSourceR = [];

  window.onload = init;

  function init() {
  // Fix up prefixing

  bufferLoader = new BufferLoader(
    audioCtx,
    [
      '../hrir/IRC_1002_R_R0195_T000_P000_L.wav',
      '../hrir/IRC_1002_R_R0195_T315_P000_L.wav',
      '../hrir/IRC_1002_R_R0195_T270_P000_L.wav',
      '../hrir/IRC_1002_R_R0195_T225_P000_L.wav',
      '../hrir/IRC_1002_R_R0195_T180_P000_L.wav',
      '../hrir/IRC_1002_R_R0195_T135_P000_L.wav',
      '../hrir/IRC_1002_R_R0195_T090_P000_L.wav',
      '../hrir/IRC_1002_R_R0195_T045_P000_L.wav',
      '../hrir/IRC_1002_R_R0195_T000_P000_R.wav',
      '../hrir/IRC_1002_R_R0195_T315_P000_R.wav',
      '../hrir/IRC_1002_R_R0195_T270_P000_R.wav',
      '../hrir/IRC_1002_R_R0195_T225_P000_R.wav',
      '../hrir/IRC_1002_R_R0195_T180_P000_R.wav',
      '../hrir/IRC_1002_R_R0195_T135_P000_R.wav',
      '../hrir/IRC_1002_R_R0195_T090_P000_R.wav',
      '../hrir/IRC_1002_R_R0195_T045_P000_R.wav',
    ],
    finishedLoading
    );

  bufferLoader.load();
}

function finishedLoading(bufferList) {
  // Create two sources and play them both together.
  for (var i = 1; i <= 8; i++) { 
    hrirL[i] = bufferList[i-1];
    soundSourceL[i] = audioCtx.createBufferSource();
    soundSourceL[i].buffer = hrirL[i];
  };
  for (var i = 9; i <= 16; i++) { 
    hrirR[i-8] = bufferList[i-1];
    soundSourceR[i-8] = audioCtx.createBufferSource();
    soundSourceR[i-8].buffer = hrirR[i-8];
  };

  console.log(hrirL,soundSourceR);

}

// Set faust decoder signals to convolters
          dsp.connect(spilter);
          console.log(spilter);
        
          for (var i = 1; i <= 8; i++) {
              spilter.connect(convolverL[i],i-1);
              spilter.connect(convolverR[i],i-1);
              convolverL[i].connect(gainNodeL);
              convolverR[i].connect(gainNodeR);
              };


         console.log(gainNodeL);
         gainNodeL.connect(merger,0,0);
         gainNodeR.connect(merger,0,1);
         merger.connect(audioCtx.destination);
         alert(spilter);
         console.log(audioCtx.destination);

//create a sinus from web audio api
    var oscillator = audioCtx.createOscillator();
    oscillator.frequency.value = 400;
    var gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    //gainNode.connect(merger,0,1);
    //oscillator.connect(context.destination);
    oscillator.start(0);
    gainNode.gain.value = 0.5;



function convChange() {
  

  var convSetting = convSelect.value;
  alert(convSetting);

  if(convSetting == "convolver") {
    for (var i = 1; i <= 8; i++) {
      convolverL[i].buffer = hrirL[i];
      convolverR[i].buffer = hrirR[i];
    };
    //alert(convolverL);
    dsp.setParamValue("/0x00/gate",1);
    dsp.setParamValue("/0x00/Probability",100);
    dsp.setParamValue("/0x00/GrainSize",2200);
    dsp.setParamValue("/0x00/lfo",0.1);
    //console.log(convolverL1+convolverR1);
  } else if(convSetting == "off") {
    alert("Conv settings turned off");
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

  faustParametre.elevation = function(element){
    var elevation = element.value;
    dsp.setParamValue("/0x00/decoder/Parameters/Source__0/Elevation__0", elevation);
    var elevationOut = document.getElementById("elevationOut")
    elevationOut.innerHTML = "Elevation=" + elevation;
    //console.log(element);  
  };
