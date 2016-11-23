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

window.onload = init;

  function init() {
  // Fix up prefixing

  bufferLoader = new BufferLoader(
    audioCtx,
    [
      '../hrir/IRC_1002_R_R0195_T000_P000_L.wav',
      '../hrir/IRC_1002_R_R0195_T000_P000_R.wav',
    ],
    finishedLoading
    );

  bufferLoader.load();
}

function finishedLoading(bufferList) {
  // Create two sources and play them both together.
  var source1 = audioCtx.createBufferSource();
  var source2 = audioCtx.createBufferSource();
  source1.buffer = bufferList[0];
  source2.buffer = bufferList[1];

  console.log(source1.buffer,source2.buffer);
  //source1.connect(context.destination);
  //source2.connect(context.destination);
  //source1.start(0);
  //source2.start(0);
}


  for (var i = 1; i <= 8; i++) {
    var convolverL = [], convolverR = [];
    convolverL[i] = audioCtx.createConvolver();
    convolverR[i] = audioCtx.createConvolver();
    console.log(convolverL,i-1);
  };

  for (var i = 1; i <= 1; i++) {
    var gainNodeL = [], gainNodeR = [];
    gainNodeL[i] = audioCtx.createGain();
    gainNodeR[i] = audioCtx.createGain();
    console.log(gainNodeL,gainNodeR);
  };

  //create a sinus from web audio api
    var oscillator = audioCtx.createOscillator();
    oscillator.frequency.value = 400;
    var gainNode = audioCtx.createGain();
    oscillator.connect(gainNodeL[1]);
    //gainNode.connect(merger,0,1);
    gainNodeL[1].connect(audioCtx.destination);
    oscillator.start(0);
    gainNodeL[1].gain.value = 0;