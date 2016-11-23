console.log("Hello in JavaScript!");
var stream;
var source;



// create FAUST web audio api context
	var AudioContext = window.AudioContext || window.webkitAudioContext;
	var audioCtx = new AudioContext();
  var dsp = faust.saw(audioCtx, 256);


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
         console.log(source.connect);
         source.connect(dsp.getProcessor());
      },

      // Error callback
      function(err) {
         console.log('The following gUM error occured: ' + err);
      }
   );
} else {
   console.log('getUserMedia not supported on your browser!');
}

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

var maxFreq = 5000;
var maxVol = 1;

// Get new mouse pointer coordinates when mouse is moved
// then set new gain and pitch values

document.onmousemove = updatePage;

function updatePage(e) {
    KeyFlag = false;

    CurX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
    CurY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    
    console.log(CurX/WIDTH);
    console.log(CurY/HEIGHT);
    dsp.setParamValue("/saw/freq",(CurX/WIDTH) * maxFreq);
    dsp.setParamValue("/saw/gain",(CurY/HEIGHT) * maxVol);

}

