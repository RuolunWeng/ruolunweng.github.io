console.log("Hello!!!!! Shanghai!!!!");

var themeSelect = document.getElementById("theme");


// create web audio api context
	var AudioContext = window.AudioContext || window.webkitAudioContext;
	var audioContext = new AudioContext();

// create player

        var player1 = createPlayer();
        var bufferLoader1 = createBufferLoader();
				var liste1 = [];

				var player2 = createPlayer();
        var bufferLoader2 = createBufferLoader();
				var liste2 = [];


        var stopButton = document.getElementById("stop");
        stopButton.addEventListener('click', function(){
            player1.stop();
						player2.stop();
        })
        var pauseButton = document.getElementById("pause");
        pauseButton.addEventListener('click', function(){
            player1.pause();
						player2.pause();
        })



  var dsp1 = faust.aigue(audioContext, 256);
	dsp1.connect(audioContext.destination);
	//dsp1.setParamValue("/0x00/izone",1);
  //console.log(dsp1.getProcessor());
  console.log(dsp1.json());

	var dsp2 = faust.crescendo(audioContext, 256);
	dsp2.connect(audioContext.destination);
  //console.log(dsp2.getProcessor());
  console.log(dsp2.json());

	var dsp3 = faust.echo(audioContext, 256);
	dsp3.connect(audioContext.destination);
  //console.log(dsp3.getProcessor());
  console.log(dsp3.json());

	var dsp4 = faust.grave(audioContext, 256);
	dsp4.connect(audioContext.destination);
  //console.log(dsp4.getProcessor());
  console.log(dsp4.json());

	var dsp5 = faust.reverb(audioContext, 256);
	dsp5.connect(audioContext.destination);
  //console.log(dsp5.getProcessor());
  console.log(dsp5.json());

	var dsp6 = faust.thru(audioContext, 256);
	dsp6.connect(audioContext.destination);
  //console.log(dsp6.getProcessor());
  console.log(dsp6.json());

	//var listeDSP = [dsp6,dsp5,dsp3,dsp4,dsp2,dsp1];
  //var selectDSP1,selectDSP2;



	//player1.connect(audioContext.destination);
	//player2.connect(audioContext.destination);

window.onload = init;

    function init() {

			bufferLoader1.load('sons/000_silence.wav').then(function(buffer){
				player1.setBuffer(buffer);
				player1.enableLoop(false);
			})

			//Load player file 2
			bufferLoader2.load('sons/000_silence.wav').then(function(buffer){
				player2.setBuffer(buffer);
				player2.enableLoop(false);
			})

}

function getNumber() {
    var minNumber = 0; // The minimum number you want
    var maxNumber = 3; // The maximum number you want
    var randomnumber = Math.floor(Math.random() * (maxNumber + 1) + minNumber); // Generates random number
		console.log(randomnumber);
		return randomnumber;
}


var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var CurX;
var CurY;
var normalX;
var normalY;

// Get new mouse pointer coordinates when mouse is moved
document.onmousemove = updatePage;

function updatePage(e) {
    KeyFlag = false;

    CurX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
    CurY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

    normalX=CurX/WIDTH;
    normalY=CurY/HEIGHT;


		dsp1.setParamValue("/0x00/izone",normalY);
		dsp2.setParamValue("/0x00/izone",normalY);
		dsp3.setParamValue("/0x00/izone",normalY);
		dsp4.setParamValue("/0x00/izone",normalY);
		dsp5.setParamValue("/0x00/izone",normalY);
		dsp6.setParamValue("/0x00/izone",normalY);

}


function themeChange() {

  var themeSetting = themeSelect.value;
  console.log(themeSetting);

  if(themeSetting == "A") {

		player1.stop();
		player2.stop();

		// liste bank 1
		liste1 = ['sons/001_Piano.wav','sons/002_AcousticGuitar.wav',
		          'sons/003_ElectricGuitar.wav','sons/004_BassGuitar.wav'];


		// liste bank 2
		liste2 = ['sons/005_Flute.wav','sons/006_Saxophone.wav',
		          'sons/014_Cordes.wav','sons/008_Toccata.wav'];


		//selectDSP1 = listeDSP[getNumber()];
		//selectDSP2 = listeDSP[getNumber()];
		player1.connect(dsp6.getProcessor());
		player2.connect(dsp5.getProcessor());


  } else if(themeSetting == "B") {

		player1.stop();
		player2.stop();

		// liste bank 1
		liste1 = ['sons/007_SpokenWord.wav','sons/009_Guns.wav',
		          'sons/010_Orage.wav','sons/012_Train.wav'];


		// liste bank 2
		liste2 = ['sons/01_Farmstead__Late_Spring_Early_Mor.wav','sons/02_Village__Late_Spring_Evening.wav',
		          'sons/03_Farmstead__Summer_Early_Morning.wav','sons/04_Cultivated_Land_Warm_Temperate_.wav'];

		player1.connect(dsp4.getProcessor());
		player2.connect(dsp3.getProcessor());
  } else if(themeSetting == "C") {

		player1.stop();
		player2.stop();

		// liste bank 1
		liste1 = ['sons/01_SCHOOLS_General_Atmosphere_Schoo.wav','sons/02_SCHOOLS_General_Atmosphere_Class.wav',
		          'sons/03_SCHOOLS_General_Atmosphere_In_Cl.wav','sons/04_SCHOOLS_General_Atmosphere_In_Ju.wav'];


		// liste bank 2
		liste2 = ['sons/1101_Rivers_And_Streams_Brook.wav','sons/1103_Rivers_And_Streams_Stream__Sm.wav',
		          'sons/1106_Rivers_And_Streams_Stream_Flo.wav','sons/1109_Seawash_Rising_Tide_On_Rocks.wav'];

		player1.connect(dsp2.getProcessor());
		player2.connect(dsp1.getProcessor());
  } else if(themeSetting == "off") {
		player1.stop();
		player2.stop();

		bufferLoader1.load('sons/000_silence.wav').then(function(buffer){
			player1.setBuffer(buffer);
			player1.enableLoop(false);
		})

		//Load player file 2
		bufferLoader2.load('sons/000_silence.wav').then(function(buffer){
			player2.setBuffer(buffer);
			player2.enableLoop(false);
		})

  }

}

themeSelect.onchange = function() {
  themeChange();
}



function soundPlayer1() {

	player1.stop();
	//Load player file 1 randomly
	bufferLoader1.load(liste1[getNumber()]).then(function(buffer){
		player1.setBuffer(buffer);
		player1.enableLoop(false);
	})

	player1.start();

}


function soundPlayer2() {

	player2.stop();
	//Load player file 2 randomly
	bufferLoader2.load(liste2[getNumber()]).then(function(buffer){
		player2.setBuffer(buffer);
		player2.enableLoop(false);
	})

	player2.start();

}
