console.log("Hello!");
var stream;
var source;
var convSelect = document.getElementById("conv");
var mute = document.getElementById("mute");

// create FAUST web audio api context
	//var AudioContext = window.AudioContext || window.webkitAudioContext;
	//var audioContext = new AudioContext();


// create player

        var player = createPlayer();
        var bufferLoader = createBufferLoader();
        
        //Load player file
        bufferLoader.load('../sons/breakbeat.wav').then(function(buffer){
          player.setBuffer(buffer);
          player.enableLoop(true);
          console.log(player,buffer);
        })

        var playButton = document.getElementById("play");       
        playButton.addEventListener('click', function(){
            player.start();
        });
        var stopButton = document.getElementById("stop");
        stopButton.addEventListener('click', function(){
            player.stop();
        })
        var pauseButton = document.getElementById("pause");
        pauseButton.addEventListener('click', function(){
            player.pause();
        })


  var dsp = faust.binaural(audioContext, 256);
  console.log(dsp.getProcessor());
  console.log(dsp.json());
  var convolverL = [], convolverR = [];
  for (var i = 1; i <= 18; i++) {    
    convolverL[i] = audioContext.createConvolver();
    convolverR[i] = audioContext.createConvolver();
  };
  console.log(convolverL,convolverR);
  var gainNodeL = audioContext.createGain();
  var gainNodeR = audioContext.createGain();
  var merger = audioContext.createChannelMerger(2);
  var spilter = audioContext.createChannelSplitter(18);


  // grab HRIR for convolver node
  var hrirL = [], hrirR = [],soundSourceL = [],soundSourceR = [];

  window.onload = init;

  function init() {

  bufferLoader = new BufferLoader(
    audioContext,
    [
      '../hrir/IRC_1002_R_R0195_T000_P000_L.wav', // 8 HPs L
      '../hrir/IRC_1002_R_R0195_T315_P000_L.wav',
      '../hrir/IRC_1002_R_R0195_T270_P000_L.wav',
      '../hrir/IRC_1002_R_R0195_T225_P000_L.wav',
      '../hrir/IRC_1002_R_R0195_T180_P000_L.wav',
      '../hrir/IRC_1002_R_R0195_T135_P000_L.wav',
      '../hrir/IRC_1002_R_R0195_T090_P000_L.wav',
      '../hrir/IRC_1002_R_R0195_T045_P000_L.wav',
      
      '../hrir/IRC_1002_R_R0195_T000_P045_L.wav', // 4 HPs L
      '../hrir/IRC_1002_R_R0195_T270_P045_L.wav',
      '../hrir/IRC_1002_R_R0195_T180_P045_L.wav',
      '../hrir/IRC_1002_R_R0195_T090_P045_L.wav',

      '../hrir/IRC_1002_R_R0195_T000_P315_L.wav',// 4 HPs L
      '../hrir/IRC_1002_R_R0195_T270_P315_L.wav',
      '../hrir/IRC_1002_R_R0195_T180_P315_L.wav',
      '../hrir/IRC_1002_R_R0195_T090_P315_L.wav',

      '../hrir/IRC_1002_R_R0195_T000_P090_L.wav', // 2 Hps L
      '../hrir/IRC_1002_R_R0195_T000_P345_L.wav',

      '../hrir/IRC_1002_R_R0195_T000_P000_R.wav', //8 Hps R
      '../hrir/IRC_1002_R_R0195_T315_P000_R.wav',
      '../hrir/IRC_1002_R_R0195_T270_P000_R.wav',
      '../hrir/IRC_1002_R_R0195_T225_P000_R.wav',
      '../hrir/IRC_1002_R_R0195_T180_P000_R.wav',
      '../hrir/IRC_1002_R_R0195_T135_P000_R.wav',
      '../hrir/IRC_1002_R_R0195_T090_P000_R.wav',
      '../hrir/IRC_1002_R_R0195_T045_P000_R.wav',

      '../hrir/IRC_1002_R_R0195_T000_P045_R.wav', // 4 HPs R
      '../hrir/IRC_1002_R_R0195_T270_P045_R.wav',
      '../hrir/IRC_1002_R_R0195_T180_P045_R.wav',
      '../hrir/IRC_1002_R_R0195_T090_P045_R.wav',

      '../hrir/IRC_1002_R_R0195_T000_P315_R.wav',// 4 HPs R
      '../hrir/IRC_1002_R_R0195_T270_P315_R.wav',
      '../hrir/IRC_1002_R_R0195_T180_P315_R.wav',
      '../hrir/IRC_1002_R_R0195_T090_P315_R.wav',
      
      '../hrir/IRC_1002_R_R0195_T000_P345_R.wav',// 2 Hps R
      '../hrir/IRC_1002_R_R0195_T000_P090_R.wav',
    ],
    finishedLoading
    );

  bufferLoader.load();
}

function finishedLoading(bufferList) {
  // Create buffers
  for (var i = 1; i <= 18; i++) { 
    hrirL[i] = bufferList[i-1];
    soundSourceL[i] = audioContext.createBufferSource();
    soundSourceL[i].buffer = hrirL[i];
  };
  for (var i = 19; i <= 36; i++) { 
    hrirR[i-18] = bufferList[i-1];
    soundSourceR[i-18] = audioContext.createBufferSource();
    soundSourceR[i-18].buffer = hrirR[i-18];
  };

  console.log(hrirL,soundSourceR);

}


//create a sinus from web audio api to test
    var oscillator = audioContext.createOscillator();
    oscillator.frequency.value = 400;
    var gainNode = audioContext.createGain();
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
         source = audioContext.createMediaStreamSource(stream);
         //source.connect(dsp.getProcessor());
          //source.connect(convolverL1);
         //source.connect(convolverR1);

         // Set faust decoder signals to convolters
          player.connect(dsp.getProcessor());
          dsp.connect(spilter);
          console.log(spilter);
        
          for (var i = 1; i <= 18; i++) {
              spilter.connect(convolverL[i],i-1);
              spilter.connect(convolverR[i],i-1);
              convolverL[i].connect(gainNodeL);
              convolverR[i].connect(gainNodeR);
              };


         console.log(gainNodeL);
         gainNodeL.connect(merger,0,0);
         gainNodeR.connect(merger,0,1);
         merger.connect(audioContext.destination);
         console.log(merger);
         console.log(audioContext.destination);
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
  

  var convSetting = convSelect.value;
  console.log(convSetting);

  if(convSetting == "convolver") {
    for (var i = 1; i <= 18; i++) {
      convolverL[i].buffer = hrirL[i];
      convolverR[i].buffer = hrirR[i];
    };

    dsp.setParamValue("/0x00/Gate",1);  
    dsp.setParamValue("/0x00/elevation0",0);
    //dsp.setParamValue("/0x00/distance",5);
    //console.log(convolverL1+convolverR1);
  } else if(convSetting == "off") {
    console.log("Conv settings turned off");
    dsp.setParamValue("/0x00/Gate",0);
    
  }

}


convSelect.onchange = function() {
  convChange();
}

mute.onclick = voiceMute;

function voiceMute() {
  if(mute.id == "mute") {
    gainNodeL.gain.value = 0;
    gainNodeR.gain.value = 0;
    mute.id = "activated";
    mute.innerHTML = "Unmute";
  } else {
    gainNodeL.gain.value = 1;
    gainNodeR.gain.value = 1;
    mute.id = "mute";    
    mute.innerHTML = "Mute";
  }
}

// FAUST PARAMETRE
var faustParametre ={};
  
  faustParametre.azimuth = function(element){
    var azimuth = element.value;
    dsp.setParamValue("/0x00/azimuth0", azimuth);
    var azimuthOut = document.getElementById("azimuthOut")
    azimuthOut.innerHTML = "Azimuth=" + azimuth;
  };

  faustParametre.elevation = function(element){
    var elevation = element.value;
    dsp.setParamValue("/0x00/elevation0", elevation);
    var elevationOut = document.getElementById("elevationOut")
    elevationOut.innerHTML = "Elevation=" + elevation;
    //console.log(element);  
  };

  faustParametre.distance = function(element){
    var distance = element.value;
    dsp.setParamValue("/0x00/distance0", distance);
    var distanceOut = document.getElementById("distanceOut")
    distanceOut.innerHTML = "Distance=" + distance;
    //console.log(element);  
  };
